const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

/**
 * order controller
 */

import { factories } from "@strapi/strapi";

type OrderProduct = {
  id: string;
  documentId: string;
  quantity: number;
};

type ItemData = {
  name: string;
  price: number;
  image: Image[];
  quantity: number;
};

type Image = {
  url: string;
};

export default factories.createCoreController(
  "api::order.order",
  ({ strapi }) => ({
    async create(ctx) {
      const { order_product, amount_shipping, discount } = ctx.request.body;
      if (!order_product || !Array.isArray(order_product)) {
        ctx.response.status = 400;
        return { error: "Invalid order_product format" };
      }

      const lineItems = await Promise.all(
        order_product.map(async (product: OrderProduct) => {
          const item: ItemData = await strapi
            .service("api::product.product")
            .findOne(product.documentId, {
              populate: {
                image: { fields: ["url"] },
              },
            });
          if (!item) {
            console.error("Item not found for ID:", product.documentId);
            throw new Error(`Item not found for ID: ${product.documentId}`);
          }
          // const image = `${process.env.SELF_URL}${item.image[0].url}`;
          return {
            price_data: {
              currency: "THB",
              product_data: {
                name: item.name,
                // images: [image],
              },
              unit_amount: item.price * 100,
            },
            quantity: product.quantity,
          };
        })
      );

      try {
        const session = await stripe.checkout.sessions.create({
          line_items: lineItems,
          mode: "payment",
          // TODOs: Update url for handle payment result
          success_url: `${process.env.STAGE == "production" ? process.env.DEPLOY_URL : process.env.CLIENT_URL}/payment?success=true`,
          cancel_url: `${process.env.STAGE == "production" ? process.env.DEPLOY_URL : process.env.CLIENT_URL}/payment?success=false`,
          shipping_address_collection: { allowed_countries: ["TH"] },
          shipping_options: [
            {
              shipping_rate_data: {
                display_name: "Standard Shipping",
                type: "fixed_amount",
                fixed_amount: {
                  amount: amount_shipping * 100, // Convert to cents
                  currency: "thb",
                },
              },
            },
          ],
          discounts: [
            {
              coupon: discount, // Use the coupon ID from Stripe Dashboard
            },
          ],
        });
        await strapi.service("api::order.order").create({
          data: { order_product, stripeId: session.id, orderStatus: "Pending" },
        });

        return { stripeSession: session };
      } catch (error) {
        console.error("Stripe Error:", error);
        ctx.response.status = 500;
        return { error: "Internal Server Error" };
      }
    },
  })
);

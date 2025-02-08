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
  quantity: number;
};

export default factories.createCoreController(
  "api::order.order",
  ({ strapi }) => ({
    async create(ctx) {
      const { order_product } = ctx.request.body;

      if (!order_product || !Array.isArray(order_product)) {
        ctx.response.status = 400;
        return { error: "Invalid order_product format" };
      }

      const lineItems = await Promise.all(
        order_product.map(async (product: OrderProduct) => {
          const item: ItemData = await strapi
            .service("api::product.product")
            .findOne(product.documentId);
          if (!item) {
            console.error("Item not found for ID:", product.documentId);
            throw new Error(`Item not found for ID: ${product.documentId}`);
          }
          return {
            price_data: {
              currency: "THB",
              product_data: { name: item.name },
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
          success_url: `${process.env.CLIENT_URL}/payment?success=true`,
          cancel_url: `${process.env.CLIENT_URL}/payment?success=false`,
          shipping_address_collection: { allowed_countries: ["TH"] },
        });
        await strapi
          .service("api::order.order")
          .create({ data: { order_product, stripeId: session.id } });

        return { stripeSession: session };
      } catch (error) {
        console.error("Stripe Error:", error);
        ctx.response.status = 500;
        return { error: "Internal Server Error" };
      }
    },
  })
);

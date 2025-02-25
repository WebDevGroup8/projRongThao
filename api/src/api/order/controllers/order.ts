const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

/**
 * order controller
 */

import { factories } from "@strapi/strapi";

type OrderProduct = {
  id: string;
  documentId: string;
  quantity: number;
  selectedSize: string;
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
      const { userId, order_product, amount_shipping, discount } =
        ctx.request.body;

      const orderedProduct = order_product.map((product) => ({
        documentId: product.documentId,
        quantity: product.quantity,
        sizeIndex: product.sizeIndex,
      }));

      if (!order_product || !Array.isArray(order_product)) {
        ctx.response.status = 400;
        return { error: "Invalid order_product format" };
      }

      const now = new Date();
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

          const image = `${process.env.SELF_URL}${item.image[0].url}`;

          const isPromotionValid = (product) => {
            if (product.promotion?.name) {
              const startDate = new Date(product.promotion.start);
              const endDate = new Date(product.promotion.end);

              return now >= startDate && now <= endDate;
            }
            return false;
          };

          const promotionPrice = (product) => {
            if (isPromotionValid(product)) {
              if (product.promotion.discountType === "percentage") {
                return (
                  product.price *
                  (1 - product.promotion.percentage / 100)
                ).toFixed(2);
              } else {
                return product.promotion.promotionPrice;
              }
            } else {
              return product.price;
            }
          };
          return {
            price_data: {
              currency: "THB",
              product_data: {
                name: `${item.name} (Size: ${product.selectedSize})`,
                images: [image],
              },
              unit_amount: promotionPrice(item) * 100,
            },
            quantity: product.quantity,
          };
        })
      );
      const stripePayload = {
        line_items: lineItems,
        mode: "payment",
        // TODOs: Update url for handle payment result
        expires_at: Math.floor(Date.now() / 1000) + 1800, // 30 minutes (1800 seconds)
        success_url: `${process.env.STAGE == "production" ? process.env.DEPLOY_URL : process.env.CLIENT_URL}/order?success=true`,
        cancel_url: `${process.env.STAGE == "production" ? process.env.DEPLOY_URL : process.env.CLIENT_URL}/order?success=false`,
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
        metadata: { orderedProduct: JSON.stringify(orderedProduct) },
      };

      try {
        let session;
        if (discount !== "") {
          session = await stripe.checkout.sessions.create({
            ...stripePayload,
            discounts: [
              {
                coupon: discount, // Use the coupon ID from Stripe Dashboard
              },
            ],
          });
        } else {
          session = await stripe.checkout.sessions.create({
            ...stripePayload,
          });
        }
        await strapi.service("api::order.order").create({
          data: {
            order_product,
            stripeId: session.id,
            orderStatus: "Pending",
            owner: userId,
          },
        });

        return { stripeSession: session };
      } catch (error) {
        if (error.param === "discounts[0][coupon]") {
          ctx.response.status = 400;
          return { error: { type: "coupon", message: "Invalid Coupon" } };
        }
        console.error("Stripe Error:", error);
        ctx.response.status = 500;
        return { error: "Internal Server Error" };
      }
    },
  })
);

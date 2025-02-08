const stripe = require("stripe")(process.env.STRIPE_KEY);

/**
 * order controller
 */

import { factories } from "@strapi/strapi";
import { ApiProductProduct } from "../../../../types/generated/contentTypes";

export default factories.createCoreController(
  "api::order.order",
  ({ strapi }) => ({
    async create(ctx) {
      const { email, order_product } = ctx.request.body;

      const lineItems = await Promise.all(
        order_product.map(async (product: ApiProductProduct) => {
          const item = await strapi
            .service("api::product.product")
            .findOne({ id: product.uid });

          return {
            price_data: {
              currency: "THB",
              product_data: { name: item.title },
              unit_amount: item.price * 100,
            },
            quantity: item.quantity,
          };
        })
      );
      try {
        const session = stripe.checkout.create({
          lineItems: lineItems,
          mode: "payment",
          success_url: `${process.env.CLIENT_URL}?success=true`,
          cancel_url: `${process.env.CLIENT_URL}?success=false`,
          shipping_address_collection: { allowed_countries: ["TH"] },
        });
        await strapi
          .service("api::order.order")
          .create({ data: { order_product, email, stripeId: session.id } });

        return { stipeSession: session };
      } catch (error) {
        ctx.response.status = 500;
        return error;
      }
    },
  })
);

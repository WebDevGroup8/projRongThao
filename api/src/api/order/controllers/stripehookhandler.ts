import { Context } from "koa";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const stripeWebhookHandler = async (ctx: Context) => {
  const sig = ctx.request.headers["stripe-signature"];
  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      ctx.request.body,
      sig as string,
      process.env.STRIPE_WEBHOOK_SECRET as string
    );
  } catch (err) {
    console.error("❌ Webhook signature verification failed:", err);
    ctx.status = 400;
    ctx.body = { error: "Webhook signature verification failed." };
    return;
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;

    try {
      // Update order status in Strapi v5
      await strapi.service("api::order.order").update(
        {
          data: { orderStatus: "Paid" },
        },
        { where: { stripeId: session.id } }
      );

      console.log("✅ Order updated successfully in Strapi v5.");
    } catch (error) {
      console.error("❌ Error updating order:", error);
      ctx.status = 500;
      ctx.body = { error: "Failed to update order status." };
      return;
    }
  }

  ctx.status = 200;
  ctx.body = { received: true };
};

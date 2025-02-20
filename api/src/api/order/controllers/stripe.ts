import { Context } from "koa";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default {
  async stripeWebhookHandler(ctx: Context) {
    const sig = ctx.request.headers["stripe-signature"];

    let event: Stripe.Event;

    try {
      const unparsedBody = ctx.request.body[Symbol.for("unparsedBody")];
      event = stripe.webhooks.constructEvent(
        unparsedBody as string,
        sig as string,
        process.env.STRIPE_WEBHOOK_SECRET as string
      );

      console.log("✅ Webhook verified Type:", event.type);
    } catch (err) {
      console.error("❌[stripeWebhookHandler]: Webhook signature verification failed:", err);
      ctx.status = 400;
      ctx.body = { error: "Webhook signature verification failed." };
      return;
    }

    let address = "";
    if (event.type === "checkout.session.completed" && event.data.object.shipping_details) {
      address = formatAddress(event.data.object.shipping_details);
    }

    switch (event.type) {
      case "checkout.session.completed":
        console.log("✅ User completed checkout.");
        await updateOrderStatus(event.data.object.id, "Paid", address);
        break;
      case "checkout.session.expired":
        console.log("⚠️ User abandoned checkout.");
        await updateOrderStatus(event.data.object.id, "Abandoned", "");
        break;
      case "payment_intent.canceled":
        console.log("❌ Payment was canceled.");
        await updateOrderStatus(event.data.object.id, "Canceled", "");
        break;
      default:
        console.log(`ℹ️ Unhandled event: ${event.type}`);
    }

    ctx.status = 200;
    ctx.body = { received: true };
  },
};

async function updateOrderStatus(orderId: string, status: string, address: string) {
  try {
    await strapi.db.query("api::order.order").update({
      where: { stripeId: orderId },
      data: { orderStatus: status, address },
    });
    console.log(`✅ Order ${orderId} status updated to: ${status}`);
  } catch (error) {
    console.error("❌ Error updating order status:", error);
  }
}

function formatAddress(shippingDetails: Stripe.Checkout.Session.ShippingDetails) {
  return `${shippingDetails.address.line1 || ""}, ${shippingDetails.address.line2 || ""}, ${shippingDetails.address.city || ""}, ${shippingDetails.address.state || ""}, ${shippingDetails.address.postal_code || ""}, ${shippingDetails.address.country || ""}`.trim();
}

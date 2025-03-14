import { Context } from "koa";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
type Stock = {
  size: String;
  stock: number;
};
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
      console.error(
        "❌[stripeWebhookHandler]: Webhook signature verification failed:",
        err
      );
      ctx.status = 400;
      ctx.body = { error: "Webhook signature verification failed." };
      return;
    }

    let address = "";
    let total_price = 0;
    const { metadata } = event.data.object as
      | Stripe.PaymentIntent
      | Stripe.Charge;
    const OrderedProduct = JSON.parse(metadata.orderedProduct);
    console.log(OrderedProduct);

    switch (event.type) {
      case "checkout.session.completed":
        if (event.data.object.shipping_details) {
          address = formatAddress(event.data.object.shipping_details);
        }
        if (event.data.object.amount_total) {
          total_price = event.data.object.amount_total / 100;
        }
        await Promise.all(
          OrderedProduct.map(({ documentId, quantity, sizeIndex }) =>
            updateProductStock(documentId, quantity, sizeIndex)
          )
        );
        console.log("✅ User completed checkout.");
        await updateOrderStatus(
          event.data.object.id,
          "Paid",
          address,
          total_price
        );
        break;
      case "checkout.session.expired":
        console.log("⚠️ User abandoned checkout.");
        await updateOrderStatus(
          event.data.object.id,
          "Abandoned",
          "",
          total_price
        );
        break;
      case "payment_intent.canceled":
        console.log("❌ Payment was canceled.");
        await updateOrderStatus(
          event.data.object.id,
          "Canceled",
          "",
          total_price
        );
        break;
      default:
        console.log(`ℹ️ Unhandled event: ${event.type}`);
    }

    ctx.status = 200;
    ctx.body = { received: true };
  },
};

async function updateOrderStatus(
  orderId: string,
  status: string,
  address: string,
  total_price: number
) {
  try {
    await strapi.db.query("api::order.order").update({
      where: { stripeId: orderId },
      data: { orderStatus: status, address, total_price },
    });
    console.log(`✅ Order ${orderId} status updated to: ${status}`);
  } catch (error) {
    console.error("❌ Error updating order status:", error);
  }
}

async function updateProductStock(
  documentId: string,
  quantity: number,
  sizeIndex: number
) {
  try {
    // ค้นหาข้อมูลสินค้าเดิมก่อน
    const product = await strapi.db.query("api::product.product").findOne({
      where: { documentId },
    });

    if (!product) {
      console.log(`❌ Product with documentId ${documentId} not found.`);
      return null;
    }

    // อัปเดต stock และ soldCount โดยอ้างอิงจากค่าปัจจุบัน
    const updatedProduct = await strapi.db
      .query("api::product.product")
      .update({
        where: { documentId },
        data: {
          stock: product.stock.map((item: Stock, index: number) =>
            index === sizeIndex
              ? { ...item, stock: item.stock - quantity }
              : item
          ),
          soldCount: product.soldCount + quantity,
        },
      });

    return updatedProduct;
  } catch (error) {
    console.error("❌ Error updating product stock:", error);
    throw error;
  }
}

function formatAddress(
  shippingDetails: Stripe.Checkout.Session.ShippingDetails
) {
  return `${shippingDetails.address.line1 || ""}, ${shippingDetails.address.line2 || ""}, ${shippingDetails.address.city || ""}, ${shippingDetails.address.state || ""}, ${shippingDetails.address.postal_code || ""}, ${shippingDetails.address.country || ""}`.trim();
}

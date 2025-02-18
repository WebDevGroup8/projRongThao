import { Context } from "koa";
import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default {
  async createPromotion(ctx: Context) {
    const { name, duration, percent_off } = ctx.request.body;
    try {
      const coupon = await stripe.coupons.create({
        name: name,
        duration: duration,
        percent_off: percent_off,
      });
      ctx.status = 200;
      ctx.body = coupon;
    } catch (e) {
      console.log("Create Promotion Coupon ", e);
      ctx.status = 500;
      ctx.body = { error: `Create Promotion Coupon ${e}` };
    }
  },
};

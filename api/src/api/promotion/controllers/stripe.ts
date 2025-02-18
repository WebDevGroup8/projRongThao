import { Context } from "koa";
import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default {
  async queryAllPromotion(ctx: Context) {
    try {
      const coupons = await stripe.coupons.list();
      ctx.status = 200;
      ctx.body = coupons;
    } catch (e) {
      console.log("Create Promotion Coupon ", e);
      ctx.status = 500;
      ctx.body = { error: `Create Promotion Coupon ${e}` };
    }
  },
  async queryOnePromotion(ctx: Context) {
    const { id } = ctx.request.body;
    try {
      const coupon = await stripe.coupons.retrieve(id);
      ctx.status = 200;
      ctx.body = coupon;
    } catch (e) {
      console.log("Create Promotion Coupon ", e);
      ctx.status = 500;
      ctx.body = { error: `Create Promotion Coupon ${e}` };
    }
  },
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
  async updatePromotion(ctx: Context) {
    const { id, order_id } = ctx.request.body;
    try {
      const coupon = await stripe.coupons.update(id, {
        metadata: {
          order_id: order_id,
        },
      });
      ctx.status = 200;
      ctx.body = coupon;
    } catch (e) {
      console.log("Create Promotion Coupon ", e);
      ctx.status = 500;
      ctx.body = { error: `Create Promotion Coupon ${e}` };
    }
  },
  async deletePromotion(ctx: Context) {
    const { id } = ctx.request.body;
    try {
      const deleted = await stripe.coupons.del(id);
      ctx.status = 200;
      ctx.body = deleted;
    } catch (e) {
      console.log("Create Promotion Coupon ", e);
      ctx.status = 500;
      ctx.body = { error: `Create Promotion Coupon ${e}` };
    }
  },
};

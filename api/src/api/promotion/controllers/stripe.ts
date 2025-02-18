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
      console.log("Unable to query all promotions with", e);
      ctx.status = 500;
      ctx.body = { error: `Unable to query all promotions with ${e}` };
    }
  },
  async queryOnePromotion(ctx: Context) {
    const { id } = ctx.params;
    console.log("id for findOne", id);
    try {
      const coupon = await stripe.coupons.retrieve(String(id));
      ctx.status = 200;
      ctx.body = coupon;
    } catch (e) {
      console.log(`Unable to query ${id} promotions with`, e);
      ctx.status = 500;
      ctx.body = { error: `Unable to query ${id} promotions with ${e}` };
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
      console.log("Unable to create coupon with ", e);
      ctx.status = 500;
      ctx.body = { error: `Unable to create coupon with ${e}` };
    }
  },
  async updatePromotion(ctx: Context) {
    const { id } = ctx.params;
    const { order_id } = ctx.request.body;
    try {
      const coupon = await stripe.coupons.update(String(id), {
        metadata: {
          order_id: order_id,
        },
      });
      ctx.status = 200;
      ctx.body = coupon;
    } catch (e) {
      console.log(`Unable to update ${id} coupon with `, e);
      ctx.status = 500;
      ctx.body = { error: `Unable to update ${id} coupon with ${e}` };
    }
  },
  async deletePromotion(ctx: Context) {
    const { id } = ctx.params;
    try {
      const deleted = await stripe.coupons.del(String(id));
      ctx.status = 200;
      ctx.body = deleted;
    } catch (e) {
      console.log(`Unable to delete ${id} coupon with `, e);
      ctx.status = 500;
      ctx.body = { error: `Unable to update ${id} coupon wiith ${e}` };
    }
  },
};

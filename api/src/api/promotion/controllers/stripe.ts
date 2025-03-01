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
        id: name,
        name: name,
        duration: duration,
        percent_off: percent_off,
      });
      const promotionCode = await stripe.promotionCodes.create({
        coupon: name,
        code: name,
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
    // INFO: Stripe not providing update exists coupon so we delete then create
    const { name, duration, percent_off } = ctx.request.body;
    try {
      await stripe.coupons.del(String(id));
      const coupon = await stripe.coupons.create({
        id: name,
        name: name,
        duration: duration,
        percent_off: percent_off,
      });
      const promotionCode = await stripe.promotionCodes.create({
        coupon: name,
        code: name,
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

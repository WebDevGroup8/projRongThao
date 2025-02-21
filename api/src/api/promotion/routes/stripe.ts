export default {
  routes: [
    {
      // Query All Coupon
      method: "GET",
      path: "/stripe/promotions",
      handler: "stripe.queryAllPromotion",
      config: {
        policies: [],
      },
    },
    {
      // Query One Coupon
      method: "GET",
      path: "/stripe/promotion/:id",
      handler: "stripe.queryOnePromotion",
      config: {
        policies: [],
      },
    },
    {
      // Create Coupon
      method: "POST",
      path: "/stripe/promotion",
      handler: "stripe.createPromotion",
      config: {
        policies: [],
      },
    },
    {
      // Update Coupon
      method: "POST",
      path: "/stripe/promotion/:id",
      handler: "stripe.updatePromotion",
      config: {
        policies: [],
      },
    },
    {
      // Delete Coupon
      method: "DELETE",
      path: "/stripe/promotion/:id",
      handler: "stripe.deletePromotion",
      config: {
        policies: [],
      },
    },
  ],
};

export default {
  routes: [
    {
      method: "POST",
      path: "/promotion/create",
      handler: "stripe.createPromotion",
      config: {
        policies: [],
      },
    },
  ],
};

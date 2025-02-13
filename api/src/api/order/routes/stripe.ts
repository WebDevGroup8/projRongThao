export default {
  routes: [
    {
      method: "POST",
      path: "/webhook/stripe",
      handler: "stripe.stripeWebhookHandler",
      config: {
        auth: false, // Allow Stripe to send requests without authentication
        policies: [],
      },
    },
  ],
};

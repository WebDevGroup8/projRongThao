import { stripeWebhookHandler } from "../controllers/stripehookhandler";

export default {
  routes: [
    {
      method: "POST",
      path: "/webhook/stripe",
      handler: stripeWebhookHandler,
      config: {
        auth: false, // Allow Stripe to send requests without authentication
        policies: [],
      },
    },
  ],
};

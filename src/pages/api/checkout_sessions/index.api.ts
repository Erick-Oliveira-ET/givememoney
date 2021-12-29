import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2020-08-27",
});

export default async function handler(req: any, res: any) {
  if (req.method === "POST") {
    try {
      // Create Checkout Sessions from body params.
      const session = await stripe.checkout.sessions.create({
        line_items: req?.body?.items ?? [],
        mode: "payment",
        payment_method_types: ["card"],
        success_url: `${req.headers.origin}/success?session_id={{CHECKOUT_SESSION_ID}}`,
        cancel_url: `${req.headers.origin}/cart`,
      });
      res.status(200).json(session);
    } catch (err: any) {
      res.status(err.statusCode || 500).json(err.message);
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
}

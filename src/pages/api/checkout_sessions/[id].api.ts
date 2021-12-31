import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2020-08-27",
});

export default async function handler(req: any, res: any) {
  const id = req.query.id;

  try {
    if (!id.startsWith("cs_")) {
      throw Error("Incorrect CheckoutSession ID.");
    }
    const checkout_session = await stripe.checkout.sessions.retrieve(id);

    res.status(200).json(checkout_session);
  } catch (err: any) {
    console.log(err);
    res.status(500).json({ statusCode: 500, message: err.message });
  }
}

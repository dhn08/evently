import { createOrder } from "@/lib/actions/order.actions";
import { error } from "console";
import { NextResponse } from "next/server";

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export async function POST(request: Request) {
  const body = await request.text();
  const sig = request.headers.get("stripe-signature") as string;
  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;
  let event;
  try {
    event = stripe.webhooks.constructEvent(body, sig, endpointSecret);
  } catch (err) {
    NextResponse.json({ message: "webhook error", error: error });
    return;
  }

  const eventType = event.type;
  // Handle the event
  if (eventType === "checkout.session.completed") {
    const { id, amount_total, metadata } = event.data.object;
    const order = {
      stripeId: id,
      eventId: metadata?.eventId || "",
      buyerId: metadata?.buyerId || "",
      totalAmount: amount_total ? (amount_total / 100).toString() : "0",
      createdAt: new Date(),
    };

    const newOrder = await createOrder(order);
    return NextResponse.json({ message: "OK", order: newOrder });
  }

  // Return a 200 response to acknowledge receipt of the event
  return new Response("", { status: 200 });
}

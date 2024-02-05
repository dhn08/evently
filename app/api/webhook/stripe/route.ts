import { createOrder } from "@/lib/actions/order.actions";
import { NextResponse } from "next/server";

const stripe = require("stripe")("sk_test_...");
const express = require("express");
const app = express();

export async function POST(request: Request) {
  const body = await request.text();
  const sig = request.headers.get("stripe-signature") as string;
  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;
  let event;
  try {
    event = stripe.webhooks.constructEvent(request.body, sig, endpointSecret);
  } catch (err) {
    NextResponse.json({ message: "webhook error" });
    return;
  }

  const eventType = event.type;
  // Handle the event
  if (eventType === "checkout.session.completed") {
    const { id, amount_total, metadata } = event.data.object;
    const order = {
      stripeId: id,
      eventId: metadata?.evendId || "",
      buyerId: metadata?.buyerId || "",
      totalAmount: amount_total ? (amount_total / 100).toString() : "0",
      createdAt: new Date(),
    };
    const newOrder = await createOrder(order);
    return NextResponse.json({ message: "OK", order: newOrder });
  }

  // Return a 200 response to acknowledge receipt of the event
  NextResponse.json("", { status: 200 });
}

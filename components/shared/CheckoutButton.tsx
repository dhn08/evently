"use client";
import { IEvent } from "@/lib/database/models/event.model";
import { SignedIn, SignedOut } from "@clerk/clerk-react";
import { useUser } from "@clerk/nextjs";
import { Button } from "../ui/button";
import Link from "next/link";
import Checkout from "./Checkout";

const CheckoutButton = ({ event }: { event: IEvent }) => {
  const { user } = useUser();
  console.log("user", user);
  const userId = user?.publicMetadata.userId as string;
  const hasEventFinshed = new Date(event.endDateTime) < new Date();
  console.log("UserId checkout button:", userId);
  return (
    <div className="flex items-center gap-3">
      {/* Cannot buy past event */}
      {hasEventFinshed ? (
        <p className="p-2 text-red-400">Sorry tickets are not available</p>
      ) : (
        <>
          {" "}
          <SignedOut>
            <Button asChild className="button rounded-full" size="lg">
              <Link href="/sign-in">Get Tickets</Link>
            </Button>
          </SignedOut>
          <SignedIn>
            <Checkout event={event} userId={userId} />
          </SignedIn>
        </>
      )}
    </div>
  );
};

export default CheckoutButton;

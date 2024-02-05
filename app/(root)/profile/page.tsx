import Collection from "@/components/shared/Collection";
import { Button } from "@/components/ui/button";
import { getEventsByUser } from "@/lib/actions/event.actions";
import { getOrdersByUser } from "@/lib/actions/order.actions";
import { IOrder } from "@/lib/database/models/order.model";
import { auth } from "@clerk/nextjs";
import Link from "next/link";
import React from "react";

const ProfilePage = async () => {
  const { sessionClaims } = auth();
  const userId = sessionClaims?.userId as string;
  const organizedEvents = await getEventsByUser({ userId, page: 1 });
  const orders = await getOrdersByUser({ userId, page: 1 });
  const orderedEvents = orders?.data.map((order: IOrder) => {
    order.event || [];
  });
  return (
    <>
      {/* My tickes */}
      <section className="bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10 ">
        <div className="wrapper flex items-center justify-center sm:justify-between ">
          <h3 className="h3-bold text-center sm:text-left">My Tickets</h3>
          <Button size="lg" className="button hidden sm:flex" asChild>
            <Link href="/#events">Explore More events</Link>
          </Button>
        </div>
      </section>
      <section className="wrapper my-8">
        <Collection
          data={orderedEvents}
          emptyStateSubtext="No worries - plenty of exciting events to explore"
          emptyTitle="No Events tickets purchased yet"
          collectionType="My_Tickets"
          limit={3}
          page={1}
          urlParamName="ordersPage"
          totalPages={2}
        />
      </section>
      {/* My events */}
      <section className="bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10 ">
        <div className="wrapper flex items-center justify-center sm:justify-between ">
          <h3 className="h3-bold text-center sm:text-left">
            Events Oraganized
          </h3>
          <Button size="lg" className="button hidden sm:flex" asChild>
            <Link href="/events/create">Create New Event</Link>
          </Button>
        </div>
      </section>
      <section className="wrapper my-8">
        <Collection
          data={organizedEvents?.data}
          emptyStateSubtext="Go create some now "
          emptyTitle="No Events have been created yet"
          collectionType="Events_Organized"
          limit={3}
          page={1}
          urlParamName="eventsPage"
          totalPages={2}
        />
      </section>
    </>
  );
};

export default ProfilePage;

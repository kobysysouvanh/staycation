"use client";

import { toast } from "react-hot-toast";
import axios from "axios";
import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import { SafeReservations, SafeUser } from "@/app/types";
import ListingCard from "./listings/ListingCard";

interface ReservationsClientProps {
  reservations: SafeReservations[];
  currentUser?: SafeUser | null;
}

const ReservationsClient: React.FC<ReservationsClientProps> = ({
  reservations,
  currentUser,
}) => {
    const router = useRouter()
    const [deletingId, setDeletingId] = useState("")

    const onCancel = useCallback((id: string) => {
        setDeletingId(id)

        axios.delete(`/api/reservations/${id}`)
        .then(() => {
            toast.success("Reservation cancelled!")
            router.refresh()
        })
        .catch(() => {
            toast.error("Something went wrong")
        })
        .finally(() => {
            setDeletingId('')
        })
    }, [router])

  return (
    <div className="-mt-40 px-5">
      <div className="ml-6 mt-6 flex-auto">
        <p className="font-semibold text-2xl">Reservations</p>
        <p>Bookings on your property</p>
      </div>
      <div className="px-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8 mt-10">
        {reservations.map((reservation) => (
            <ListingCard
            key={reservation.id}
            data={reservation.listing}
            reservation={reservation}
            actionId={reservation.id}
            onAction={onCancel}
            disabled={deletingId === reservation.id}
            actionLabel="Cancel guest reservation"
            currentUser={currentUser}
            />
        ))}
      </div>
    </div>
  );
};

export default ReservationsClient;

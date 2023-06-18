"use client";

import useCountries from "@/app/hooks/useCountries";
import { SafeUser, SafeListing } from "@/app/types";
import { Reservation } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";
import { format } from "date-fns";
import Image from "next/image";
import HeartButton from "./HeartButton";

interface ListingCardProps {
  data: SafeListing;
  reservation?: Reservation;
  onAction?: (id: string) => void;
  disabled?: boolean;
  actionLabel?: string;
  actionId?: string;
  currentUser?: SafeUser | null;
}

export default function ListingCard(props: ListingCardProps) {
  const router = useRouter();
  const { getByValue } = useCountries();

  const location = getByValue(props.data.locationValue);

  const handleCancel = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();

      if (props.disabled) {
        return;
      }
      props.actionId = "";
      props.onAction?.(props.actionId);
    },
    [props.onAction, props.actionId]
  );

  const price = useMemo(() => {
    if (props.reservation) {
      return props.reservation.totalPrice;
    }

    return props.data.price;
  }, [props.data.price, props.reservation]);

  const reservationDate = useMemo(() => {
    if (!props.reservation) {
      return null;
    }

    const start = new Date(props.reservation.startDate);
    const end = new Date(props.reservation.endDate);

    return `${format(start, "PP")} - ${format(end, "PP")}`;
  }, [props.reservation]);

  return (
    <div
      onClick={() => router.push(`/listings/${props.data.id}`)}
      className="col-span-1 cursor-pointer group"
    >
      <div className="flex flex-col gap-2 w-full">
        <div className="aspect-square w-full relative overflow-hidden rounded-xl">
          <Image
            alt="Listing"
            src={props.data.imageSrc}
            className="object-cover h-full w-full group-hover:scale-110 transition"
            fill
          />
          <div className="absolute top-3 right-3">
            <HeartButton
              listingId={props.data.id}
              currentUser={props.currentUser}
            />
          </div>
        </div>
        <div className="font-semibold text-md">
          {location?.region}, {location?.label}
        </div>
        <div className="font-light text-neutral-500">
          {reservationDate || props.data.category}
        </div>
        <div className="flex flex-row items-center gap-1">
          <div className="font-semibold">${price}</div>
          {!props.reservation && <div className="font-light">night</div>}
        </div>
        {props.onAction && props.actionLabel && (
          <button disabled={props.disabled} onClick={handleCancel}></button>
        )}
      </div>
    </div>
  );
}

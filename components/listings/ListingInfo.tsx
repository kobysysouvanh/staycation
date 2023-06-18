"use client";

import useCountries from "@/app/hooks/useCountries";
import { SafeUser } from "@/app/types";
import Image from "next/image";
import { IconType } from "react-icons";
import ListingCategory from "./ListingCategory";
import dynamic from "next/dynamic";

const Map = dynamic(() => import("../Map"), {
    ssr: false
})

interface ListingInfoProps {
  user: SafeUser;
  description: string;
  guestCount: number;
  roomCount: number;
  bathroomCount: number;
  category:
    | {
        icon: IconType;
        label: string;
        description: string;
      }
    | undefined;
  locationValue: string;
}

const ListingInfo: React.FC<ListingInfoProps> = ({
  user,
  description,
  guestCount,
  roomCount,
  bathroomCount,
  category,
  locationValue,
}) => {
  const { getByValue } = useCountries();
  const coordinates = getByValue(locationValue)?.latlng;

  return (
    <div className="col-span-4 flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <div className="text-lg font-semibold flex flex-row items-center gap-2">
          <div>Hosted by {user?.name}</div>
          <div className="hidden md:block">
            <Image
              src={user?.image as string}
              className="rounded-full"
              width={30}
              height={30}
              alt="profile"
            />
          </div>
        </div>
        <div className="flex flex-row items-center gap-4 font-light text-neutral-500">
          <div>{guestCount} guests</div>
          <div>{roomCount} rooms</div>
          <div>{bathroomCount} bathrooms</div>
        </div>
      </div>
      <hr />
      {category && (
        <ListingCategory
            icon={category.icon}
            label={category.label}
            description={category.description}
        />
      )}
      <hr />
      <div className="text-lg font-light text-neutral-500">
        {description}
      </div>
      <hr />
      <Map center={coordinates}/>
    </div>
  );
};

export default ListingInfo;

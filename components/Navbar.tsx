"use client";

import useCountries from "@/app/hooks/useCountries";
import { SafeUser } from "@/app/types";
import { differenceInDays } from "date-fns";
import { signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useCallback, useMemo, useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { BiSearch } from "react-icons/bi";
import Categories from "@/components/categories/Categories";
import LoginModal from "./modals/LoginModal";
import RegisterModal from "./modals/RegisterModal";
import RentModal from "./modals/RentModal";
import SearchModal from "./modals/SearchModal";

interface NavbarProps {
  currentUser?: SafeUser | null;
}

const Navbar: React.FC<NavbarProps> = ({ currentUser }) => {
  const router = useRouter();

  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRentOpen, setIsRentOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(String);

  const params = useSearchParams();
  const { getByValue } = useCountries();

  const locationValue = params?.get("locationValue");
  const startDate = params?.get("startDate");
  const endDate = params?.get("endDate");
  const guestCount = params?.get("guestCount");

  const locationLabel = useMemo(() => {
    if (locationValue) {
      return getByValue(locationValue as string)?.label;
    }

    return "Anywhere";
  }, [locationValue, getByValue]);

  const durationLabel = useMemo(() => {
    if (startDate && endDate) {
      const start = new Date(startDate as string);
      const end = new Date(endDate as string);
      let diff = differenceInDays(end, start);

      if (diff === 0) {
        diff = 1;
      }

      return `${diff} Days`;
    }

    return "Any Week";
  }, [startDate, endDate]);

  const guestLabel = useMemo(() => {
    if (guestCount) {
      return `${guestCount} Guests`;
    }

    return "Add Guests";
  }, [guestCount]);

  const handleSearchOpen = () => {
    setIsSearchOpen(true);
  };

  const handleRentOpen = () => {
    setIsRentOpen(true);
  };

  const handleRegisterOpen = () => {
    setIsRegisterOpen(true);
  };

  const handleLoginOpen = () => {
    setIsLoginOpen(true);
  };

  const handleClose = (value: string) => {
    setIsRegisterOpen(false);
    setIsLoginOpen(false);
    setIsRentOpen(false);
    setIsSearchOpen(false);
    setSelectedValue(value);
  };

  const handleMenuOpen = useCallback(() => {
    setIsMenuOpen((value) => !value);
  }, []);

  const onRent = useCallback(() => {
    if (!currentUser) {
      return handleLoginOpen();
    }

    handleRentOpen();
  }, [currentUser]);

  return (
    <div className="fixed w-full bg-white z-10">
      <div className="flex flex-row items-center justify-between gap-3 md:gap-0 max-w-[2520px] mx-auto px-4 sm:px-2 md:px-10 xl:px-20 border-b-[1px] py-4">
        <Link href="/">
          <Image
            src="/images/logo.png"
            className="cursor-pointer hidden md:block"
            width={100}
            height={100}
            alt="Airbnb"
          />
        </Link>

        {/* Search Bar */}
        <div
          onClick={handleSearchOpen}
          className="border-[1px] w-full md:w-auto py-2 rounded-full shadow-sm hover:shadow-md transition cursor-pointer"
        >
          <div className="flex flex-row items-center justify-between">
            <div className="text-sm font-semibold px-4">{locationLabel}</div>
            <div className="hidden sm:block text-sm font-semibold px-4 border-x-[1px] flex-1 text-center">
              {durationLabel}
            </div>
            <div className="text-sm pl-4 pr-2 text-gray-600 flex flex-row items-center gap-3">
              <div className="hidden sm:block">{guestLabel}</div>
              <div className="p-2 bg-rose-500 rounded-full text-white">
                <BiSearch size={18} />
              </div>
            </div>
          </div>
        </div>

        <div className="relative">
          <div className="flex flex-row items-center gap-1">
            <div
              onClick={onRent}
              className="hidden md:block text-sm font-medium py-3 px-4 rounded-full hover:bg-neutral-100 cursor-pointer"
            >
              Airbnb your home
            </div>
            <div
              onClick={handleMenuOpen}
              className="p-4 md:py-1 md:px-2 border-[1px] border-neutral-200 flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition "
            >
              <AiOutlineMenu className="md:ml-1" />
              <div className="hidden md:block">
                <Image
                  src={currentUser?.image || "/images/placeholder.jpg"}
                  className="rounded-full"
                  width={30}
                  height={30}
                  alt=""
                />
              </div>
            </div>
          </div>
          {isMenuOpen && (
            <div className="absolute rounded-xl border-[1px] shadow-lg w-[40vw] md:w-60 bg-white overflow-hidden right-0 top-12 text-sm z-4 ">
              <div className="flex flex-col cursor-pointer">
                {currentUser ? (
                  <>
                    <div className="py-2">
                      <div
                        onClick={() => router.push("/trips")}
                        className="px-4 py-3 transition hover:bg-neutral-100"
                      >
                        My trips
                      </div>
                      <div
                        onClick={() => router.push("/favorites")}
                        className="px-4 py-3 transition hover:bg-neutral-100"
                      >
                        My favorites
                      </div>
                      <div
                        onClick={() => router.push("/reservations")}
                        className="px-4 py-3 transition hover:bg-neutral-100"
                      >
                        My property reservations
                      </div>
                      <div
                        onClick={() => router.push("/properties")}
                        className="px-4 py-3 transition hover:bg-neutral-100"
                      >
                        My properties
                      </div>
                      <hr className="py-1" />
                      <div
                        onClick={() => signOut()}
                        className="px-4 py-3 transition hover:bg-neutral-100"
                      >
                        Logout
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="py-2 border-b-[1px]">
                      <div
                        onClick={handleRegisterOpen}
                        className="px-4 py-3 transition hover:bg-neutral-100"
                      >
                        Sign Up
                      </div>
                      <div
                        onClick={handleLoginOpen}
                        className="px-4 py-3 transition hover:bg-neutral-100"
                      >
                        Login
                      </div>
                    </div>
                    <div className="py-2">
                      <div 
                        onClick={handleLoginOpen}
                        className="px-4 py-3 transition hover:bg-neutral-100"
                        >
                        Airbnb your home
                      </div>
                      <div className="px-4 py-3 transition hover:bg-neutral-100">
                        Help
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
      <RegisterModal
        isOpen={isRegisterOpen}
        onClose={handleClose}
        selectedValue={selectedValue}
      />
      <LoginModal
        isOpen={isLoginOpen}
        onClose={handleClose}
        selectedValue={selectedValue}
      />
      <RentModal
        isOpen={isRentOpen}
        onClose={handleClose}
        selectedValue={selectedValue}
      />
      <SearchModal
        isOpen={isSearchOpen}
        onClose={handleClose}
        selectedValue={selectedValue}
      />
      <Categories />
    </div>
  );
};

export default Navbar;

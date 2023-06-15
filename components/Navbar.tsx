"use client";

import Image from "next/image";
import React, { useCallback, useState } from "react";
import Link from "next/link";
import { BiSearch } from "react-icons/bi";
import { AiOutlineMenu } from "react-icons/ai";
import RegisterModal from "./modals/RegisterModal";
import LoginModal from "./modals/LoginModal";
import { signOut } from "next-auth/react";
import { SafeUser } from "@/app/types";
import Categories from "./Categories";
import { toast } from "react-hot-toast";

interface NavbarProps {
  currentUser?: SafeUser | null;
}

const Navbar = (props: NavbarProps) => {
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(String);

  const handleRegisterOpen = () => {
    setIsRegisterOpen(true);
  };

  const handleLoginOpen = () => {
    setIsLoginOpen(true);
  };

  const handleClose = (value: string) => {
    setIsRegisterOpen(false);
    setIsLoginOpen(false);
    setSelectedValue(value);
  };

  const [isOpen, setIsOpen] = useState(false);
  const toggleOpen = useCallback(() => {
    setIsOpen((value) => !value);
  }, []);

  const onRent = useCallback(() => {
    if (!props.currentUser) {
      setIsLoginOpen(true)
    }
  },[props.currentUser])

  return (
    <div className="fixed w-full bg-white z-10  py-4">
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
        <div className="border-[1px] w-full md:w-auto py-2 rounded-full shadow-sm hover:shadow-md transition cursor-pointer">
          <div className="flex flex-row items-center justify-between">
            <div className="text-sm font-semibold px-4">Anywhere</div>
            <div className="hidden sm:block text-sm font-semibold px-4 border-x-[1px] flex-1 text-center">
              Any week
            </div>
            <div className="text-sm pl-4 pr-2 text-gray-600 flex flex-row items-center gap-3">
              <div className="hidden sm:block">Add guests</div>
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
              onClick={toggleOpen}
              className="p-4 md:py-1 md:px-2 border-[1px] border-neutral-200 flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition "
            >
              <AiOutlineMenu className="md:ml-1" />
              <div className="hidden md:block">
                <Image
                  src={props.currentUser?.image || "/images/placeholder.jpg"}
                  className="rounded-full"
                  width={30}
                  height={30}
                  alt=""
                />
              </div>
            </div>
          </div>
          {isOpen && (
            <div className="absolute rounded-xl border-[1px] shadow-lg w-[40vw] md:w-60 bg-white overflow-hidden right-0 top-12 text-sm z-4 ">
              <div className="flex flex-col cursor-pointer">
                {props.currentUser ? (
                  <>
                    <div className="py-2">
                      <div
                        onClick={() => {}}
                        className="px-4 py-3 transition hover:bg-neutral-100"
                      >
                        My trips
                      </div>
                      <div
                        onClick={() => {}}
                        className="px-4 py-3 transition hover:bg-neutral-100"
                      >
                        My favorites
                      </div>
                      <div
                        onClick={() => {}}
                        className="px-4 py-3 transition hover:bg-neutral-100"
                      >
                        My reservations
                      </div>
                      <div
                        onClick={() => {}}
                        className="px-4 py-3 transition hover:bg-neutral-100"
                      >
                        My properties
                      </div>
                      <div
                        onClick={() => {}}
                        className="px-4 py-3 transition hover:bg-neutral-100"
                      >
                        Airbnb my home
                      </div>
                      <hr className="py-1"/>
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
                      <div className="px-4 py-3 transition hover:bg-neutral-100">
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
        open={isRegisterOpen}
        onClose={handleClose}
        selectedValue={selectedValue}
      />
      <LoginModal
        open={isLoginOpen}
        onClose={handleClose}
        selectedValue={selectedValue}
      />
      <Categories />
    </div>
  );
};

export default Navbar;

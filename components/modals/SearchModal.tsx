"use client";

import { Dialog } from "@mui/material";
import dynamic from "next/dynamic";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useMemo, useState } from "react";
import { Range } from "react-date-range";
import { IoMdClose } from "react-icons/io";
import CountrySelect, { CountrySelectValue } from "../CountrySelect";
import qs from "query-string";
import { formatISO } from "date-fns";
import Calender from "../Calender";
import Counter from "../Counter";

interface SearchModalProps {
  isOpen: boolean;
  onClose: (value: string) => void;
  selectedValue: string;
}

enum STEPS {
  LOCATION = 0,
  DATE = 1,
  INFO = 2,
}

const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  selectedValue,
}) => {
  const router = useRouter();
  const params = useSearchParams();

  const [isLoading, setIsLoading] = useState(false);

  const handleClose = () => {
    onClose(selectedValue);
  };

  const [location, setLocation] = useState<CountrySelectValue>();
  const [step, setStep] = useState(STEPS.LOCATION);
  const [guestCount, setGuestCount] = useState(1);
  const [roomCount, setRoomCount] = useState(1);
  const [bathroomCount, setBathroomCount] = useState(1);
  const [dateRange, setDateRange] = useState<Range>({
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  });

  const Map = useMemo(
    () =>
      dynamic(() => import("../Map"), {
        ssr: false,
      }),
    [location]
  );

  const onBack = useCallback(() => {
    setStep((value) => value - 1);
  }, []);

  const onNext = useCallback(() => {
    setStep((value) => value + 1);
  }, []);

  const onSubmit = useCallback(async () => {
    if (step !== STEPS.INFO) {
      return onNext();
    }

    let currentQuery = {};

    if (params) {
      currentQuery = qs.parse(params.toString());
    }

    const updatedQuery: any = {
      ...currentQuery,
      locationValue: location?.value,
      guestCount,
      roomCount,
      bathroomCount,
    };

    if (dateRange.startDate) {
      updatedQuery.startDate = formatISO(dateRange.startDate);
    }

    if (dateRange.endDate) {
      updatedQuery.endDate = formatISO(dateRange.endDate);
    }

    const url = qs.stringifyUrl(
      {
        url: "/",
        query: updatedQuery,
      },
      { skipNull: true }
    );

    setStep(STEPS.LOCATION);
    handleClose();
    router.push(url);
  }, [
    step,
    location,
    router,
    guestCount,
    roomCount,
    bathroomCount,
    dateRange,
    onNext,
    params,
  ]);

  const buttonLabel = useMemo(() => {
    if (step === STEPS.INFO) {
      return "Search";
    }

    return "Next";
  }, [step]);

  let bodyContent = (
    <div className="flex flex-col gap-8 p-6">
      <div className="flex-auto">
        <p className="font-semibold text-2xl">Where do you want to go?</p>
      </div>
      <CountrySelect
        value={location}
        onChange={(value) => setLocation(value as CountrySelectValue)}
      />
      <hr />
      <Map center={location?.latlng} />
    </div>
  );

  if (step === STEPS.DATE) {
    bodyContent = (
      <div className="flex flex-col gap-8 p-6">
        <div className="flex-auto">
          <p className="font-semibold text-2xl">What are your dates?</p>
        </div>
        <Calender
          value={dateRange}
          onChange={(value) => setDateRange(value.selection)}
        />
      </div>
    );
  }

  if (step === STEPS.INFO) {
    bodyContent = (
      <div className="flex flex-col gap-8 p-6">
        <div className="flex-auto">
          <p className="font-semibold text-2xl">Give us more information</p>
        </div>
        <Counter
            title="Guest"
            subtitle="How many guests?"
            value={guestCount}
            onChange={(value) => setGuestCount(value)}
        />
        <hr />
        <Counter
            title="Rooms"
            subtitle="How many rooms?"
            value={roomCount}
            onChange={(value) => setRoomCount(value)}
        />
        <hr />
        <Counter
            title="Bathrooms"
            subtitle="How many bathrooms?"
            value={bathroomCount}
            onChange={(value) => setBathroomCount(value)}
        />
      </div>
    );
  }

  return (
    <Dialog open={isOpen} onClose={handleClose} fullWidth={true} maxWidth="sm">
      <div className="flex flex-row relative items-center justify-center p-6 border-b-[1px]">
        <IoMdClose
          className="absolute cursor-pointer left-9"
          onClick={handleClose}
          size={18}
        />
        <div className="flex items-center w-20 font-semibold">Search</div>
      </div>
      {bodyContent}
      <div className="flex flex-col gap-2 p-6">
        <div className="flex flex-row items-center gap-4 w-full">
          {step !== STEPS.LOCATION && (
            <button
              onClick={onBack}
              className="relative rounded-lg w-full bg-gradient-to-r from-rose-500 to-rose-600 text-white py-4"
            >
              Back
            </button>
          )}
          <button
            onClick={onSubmit}
            className="relative rounded-lg w-full bg-gradient-to-r from-rose-500 to-rose-600 text-white py-4"
            disabled={isLoading}
          >
            {buttonLabel}
          </button>
        </div>
      </div>
    </Dialog>
  );
};

export default SearchModal;

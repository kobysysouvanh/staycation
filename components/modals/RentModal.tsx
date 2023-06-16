import { Dialog, TextField, ThemeProvider } from "@mui/material";
import { signIn } from "next-auth/react";
import { useMemo, useState } from "react";
import { AiFillApple, AiFillFacebook } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { IoMdClose } from "react-icons/io";
import { categories } from "../Category/Categories";
import CategoryInput from "../Category/CategoryInput";
import { FieldValue, FieldValues, useForm } from "react-hook-form";

type RentModalProps = {
  isOpen: boolean;
  onClose: (value: string) => void;
  selectedValue: string;
};

enum STEPS {
  CATEGORY = 0,
  LOCATION = 1,
  INFO = 2,
  IMAGES = 3,
  DESCRIPTION = 4,
  PRICE = 5,
}

export default function RentModal(props: RentModalProps) {
  const [step, setStep] = useState(STEPS.CATEGORY);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: {
        errors
    },
    reset
  } = useForm<FieldValues>({
    defaultValues: {
        title: "",
        description: "",
        imageSrc: "",
        category: "",
        roomCount: 1,
        bathroomCount: 1,
        guestCount: 1,
        locationValue: null,
        price: 1

    }
  })

  const category = watch("category")

  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
        shouldDirty: true,
        shouldTouch: true,
        shouldValidate: true
    })
  }

  const onBack = () => {
    setStep((value) => value - 1);
  };

  const onNext = () => {
    setStep((value) => value + 1);
  };

  const actionLabel = useMemo(() => {
    if (step === STEPS.PRICE) {
      return "Create";
    }

    return "Next";
  }, [step]);

  const secondLabel = useMemo(() => {
    if (step === STEPS.CATEGORY) {
      return undefined;
    }

    return "Back";
  }, [step]);

  const handleClose = () => {
    props.onClose(props.selectedValue);
  };

  return (
    <Dialog
      open={props.isOpen}
      onClose={handleClose}
      fullWidth={true}
      maxWidth="sm"
    >
      <div className="flex flex-row relative items-center justify-center p-6 border-b-[1px]">
        <IoMdClose
          className="absolute cursor-pointer left-9"
          onClick={handleClose}
          size={18}
        />
        <div className="flex flex-row items-center font-semibold">
          Airbnb your home!
        </div>
      </div>
      <div className="relative p-6 flex-auto">
        <p className="font-semibold text-2xl py-2">
          Which of these best describes your place?
        </p>
        <p>Pick a category</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[50vh] overflow-y-auto px-6">
        {categories.map((item) => (
          <div key={item.label} className="col-span-1">
            <CategoryInput
              onClick={(category) => setCustomValue("category", category)}
              selected={category === item.label}
              label={item.label}
              icon={item.icon}
            />
          </div>
        ))}
      </div>
      <div className="flex flex-col gap-2 p-6">
        <div className="flex flex-row items-center gap-4 w-full">
          <button className="relative rounded-lg w-full bg-gradient-to-r from-rose-500 to-rose-600 text-white py-4">
            {actionLabel}
          </button>
        </div>
      </div>
    </Dialog>
  );
}

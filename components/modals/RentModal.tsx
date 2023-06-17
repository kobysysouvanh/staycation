import { Dialog, InputAdornment, TextField, ThemeProvider, createTheme } from "@mui/material";
import { signIn } from "next-auth/react";
import { useMemo, useState } from "react";
import { AiFillApple, AiFillFacebook } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { IoMdClose } from "react-icons/io";
import { categories } from "../Category/Categories";
import CategoryInput from "../Category/CategoryInput";
import { FieldValue, FieldValues, SubmitHandler, useForm } from "react-hook-form";
import CountrySelect from "../CountrySelect";
import dynamic from "next/dynamic";
import Counter from "../Counter";
import { ClassNames, Theme, useTheme } from "@emotion/react";
import ImageUpload from "../ImageUpload";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

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

const customTheme = (outerTheme: Theme) =>
  createTheme({
    components: {
      MuiTextField: {
        styleOverrides: {
          root: {
            "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: "#F33D5D",
            },
            "& .MuiOutlinedInput-root.Mui-focused  .MuiOutlinedInput-notchedOutline":
              {
                borderColor: "#F33D5D",
              },
            "& label.Mui-focused": {
              color: "#F33D5D",
            },
          },
        },
      },
    },
  });

export default function RentModal(props: RentModalProps) {
  const [step, setStep] = useState(STEPS.CATEGORY);
  const [isLoading, setIsLoading] = useState(false);
  const outerTheme = useTheme();
  const router = useRouter()

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
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
      price: null,
    },
  });

  const category = watch("category");
  const location = watch("location");
  const guestCount = watch("guestCount");
  const roomCount = watch("roomCount");
  const bathroomCount = watch("bathroomCount");
  const imageSrc = watch("imageSrc");

  const Map = useMemo(
    () =>
      dynamic(() => import("../Map"), {
        ssr: false,
      }),
    [location]
  );

  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
  };

  const onBack = () => {
    setStep((value) => value - 1);
  };

  const onNext = () => {
    setStep((value) => value + 1);
  };

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    if (step !== STEPS.PRICE) {
      return onNext()
    }

    setIsLoading(true)

    axios.post('/api/listings', data)
    .then(() => {
      toast.success('Listing Created!')
      router.refresh()
      reset()
      setStep(STEPS.CATEGORY)
      handleClose()
    })
    .catch(() => {
      toast.error("Something went wrong!")
    })
    .finally(() => {
      setIsLoading(false)
    })
  }

  const buttonLabel = useMemo(() => {
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

  let bodyContent = (
    <div>
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
    </div>
  );

  if (step === STEPS.LOCATION) {
    bodyContent = (
      <div className="flex flex-col">
        <div className="ml-6 mt-6 flex-auto">
          <p className="font-semibold text-2xl">Where is this place located?</p>
        </div>
        <div className="flex items-center justify-center">
          <CountrySelect
            value={location}
            onChange={(value) => setCustomValue("location", value)}
          />
        </div>
        <div className="p-6">
          <Map center={location?.latlng} />
        </div>
      </div>
    );
  }

  if (step === STEPS.INFO) {
    bodyContent = (
      <div className="flex flex-col gap-4">
        <div className="ml-6 mt-6 flex-auto">
          <p className="font-semibold text-2xl">
            Share some basic information about your place
          </p>
          <p>Include guest, room, and bathroom count!</p>
        </div>
        <Counter
          onChange={(value) => setCustomValue("guestCount", value)}
          title="Guests"
          subtitle="How many guest are allowed?"
          value={guestCount}
        />
        <div className="px-6">
          <hr />
        </div>
        <Counter
          onChange={(value) => setCustomValue("roomCount", value)}
          title="Rooms"
          subtitle="How many bedrooms?"
          value={roomCount}
        />
        <div className="px-6">
          <hr />
        </div>
        <Counter
          onChange={(value) => setCustomValue("bathroomCount", value)}
          title="Bathrooms"
          subtitle="How many bathrooms?"
          value={bathroomCount}
        />
      </div>
    );
  }

  if (step === STEPS.IMAGES) {
    bodyContent = (
      <div className="flex flex-col gap-4">
        <div className="ml-6 mt-6 flex-auto">
          <p className="font-semibold text-2xl">Add a photo of your place</p>
          <p>Impress your guests!</p>
        </div>
        <div className="px-6 py-4">
          <ImageUpload
            value={imageSrc}
            onChange={(value) => setCustomValue("imageSrc", value)}
          />
        </div>
      </div>
    );
  }

  if (step === STEPS.DESCRIPTION) {
    bodyContent = (
      <div className="flex flex-col gap-4">
        <div className="ml-6 mt-6 flex-auto">
          <p className="font-semibold text-2xl">Describe the place</p>
          <p>Provide a short description!</p>
        </div>
        <div className="py-4 px-6">
          <ThemeProvider theme={customTheme(outerTheme)}>
            <TextField
              {...register("title", {
                required: "title is required",
              })}
              label="Title"
              type="text"
              disabled={isLoading}
              fullWidth
            />
            <div className="py-2" />
            <TextField
              {...register("description", {
                required: "description is required",
              })}
              label="Description"
              type="text"
              disabled={isLoading}
              fullWidth
            />
          </ThemeProvider>
        </div>
      </div>
    );
  }

  if (step === STEPS.PRICE) {
    bodyContent = (
      <div className="glex flex-col gap-4">
        <div className="ml-6 mt-6 flex-auto">
          <p className="font-semibold text-2xl">Finally, set your price</p>
          <p>How much do you charge per night?</p>
        </div>
        <div className="px-6 py-6">
          <ThemeProvider theme={customTheme(outerTheme)}>
            <TextField
              {...register("price", {
                required: "price is required",
              })}
              label="Price Per Night"
              type="text"
              disabled={isLoading}
              fullWidth
            />
          </ThemeProvider>
        </div>
      </div>
    );
  }

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
      {bodyContent}
      <div className="flex flex-col gap-2 p-6">
        <div className="flex flex-row items-center gap-4 w-full">
          {step !== STEPS.CATEGORY && (
            <button
              onClick={onBack}
              className="relative rounded-lg w-full bg-gradient-to-r from-rose-500 to-rose-600 text-white py-4"
            >
              Back
            </button>
          )}
          <button
            onClick={handleSubmit(onSubmit)}
            className="relative rounded-lg w-full bg-gradient-to-r from-rose-500 to-rose-600 text-white py-4"
          >
            {buttonLabel}
          </button>
        </div>
      </div>
    </Dialog>
  );
}

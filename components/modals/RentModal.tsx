import { Theme, useTheme } from "@emotion/react";
import { Dialog, TextField, ThemeProvider, createTheme } from "@mui/material";
import axios from "axios";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { IoMdClose } from "react-icons/io";
import Counter from "../Counter";
import CountrySelect from "../CountrySelect";
import ImageUpload from "../ImageUpload";
import { categories } from "@/components/categories/categoriesType";
import CategoryInput from "@/components/categories/CategoryInput";

interface RentModalProps {
  isOpen: boolean;
  onClose: (value: string) => void;
  selectedValue: string;
}

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

const RentModal: React.FC<RentModalProps> = ({
  isOpen,
  onClose,
  selectedValue,
}) => {
  const [step, setStep] = useState(STEPS.CATEGORY);
  const [isLoading, setIsLoading] = useState(false);
  const outerTheme = useTheme();
  const router = useRouter();

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
      return onNext();
    }

    setIsLoading(true);

    axios
      .post("/api/listings", data)
      .then(() => {
        toast.success("Listing Created!");
        router.refresh();
        reset();
        setStep(STEPS.CATEGORY);
        handleClose();
      })
      .catch(() => {
        toast.error("Something went wrong!");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const buttonLabel = useMemo(() => {
    if (step === STEPS.PRICE) {
      return "Create";
    }

    return "Next";
  }, [step]);

  const handleClose = () => {
    onClose(selectedValue);
  };

  let bodyContent = (
    <div>
      <div className="relative flex-auto p-6">
        <p className="py-2 text-2xl font-semibold">
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
        <div className="flex-auto p-6">
          <p className="text-2xl font-semibold">Where is this place located?</p>
        </div>
        <div className="flex items-center justify-center p-6">
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
      <div className="flex flex-col gap-4 p-6">
        <div className="flex-auto py-4">
          <p className="text-2xl font-semibold">
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
        <div className="flex-auto mt-6 ml-6">
          <p className="text-2xl font-semibold">Add a photo of your place</p>
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
        <div className="flex-auto mt-6 ml-6">
          <p className="text-2xl font-semibold">Describe the place</p>
          <p>Provide a short description!</p>
        </div>
        <div className="px-6 py-4">
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
      <div className="flex-col gap-4 glex">
        <div className="flex-auto mt-6 ml-6">
          <p className="text-2xl font-semibold">Finally, set your price</p>
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
    <Dialog open={isOpen} onClose={handleClose} fullWidth={true} maxWidth="sm">
      <div className="flex flex-row relative items-center justify-center p-6 border-b-[1px]">
        <IoMdClose
          className="absolute cursor-pointer left-9"
          onClick={handleClose}
          size={18}
        />
        <div className="flex flex-row items-center font-semibold">
          Rent out your home!
        </div>
      </div>
      {bodyContent}
      <div className="flex flex-col gap-2 p-6">
        <div className="flex flex-row items-center w-full gap-4">
          {step !== STEPS.CATEGORY && (
            <button
              onClick={onBack}
              className="relative w-full py-4 text-white rounded-lg bg-gradient-to-r from-rose-500 to-rose-600"
            >
              Back
            </button>
          )}
          <button
            onClick={handleSubmit(onSubmit)}
            className="relative w-full py-4 text-white rounded-lg bg-gradient-to-r from-rose-500 to-rose-600"
          >
            {buttonLabel}
          </button>
        </div>
      </div>
    </Dialog>
  );
};

export default RentModal;

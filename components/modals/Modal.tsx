import { useCallback, useState } from "react";
import { Theme, useTheme } from "@emotion/react";
import { Dialog, TextField, ThemeProvider, createTheme } from "@mui/material";
import { IoMdClose } from "react-icons/io";
import axios from "axios";
import { create } from "zustand";
import { AiFillApple, AiFillFacebook } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import useRegisterModal from "@/app/hooks/useRegisterModal";

type ModalProps = {
  open: boolean;
  onClose: (value: string) => void;
  selectedValue: string;
  disabled?: boolean;
};

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

export default function Modal(props: ModalProps) {
  const registerModal = useRegisterModal();
  const outerTheme = useTheme();

  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    axios
      .post("/api/register", data)
      .then(() => {
        registerModal.onClose();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleClose = () => {
    props.onClose(props.selectedValue);
  };

  const handleItemClick = (value: string) => {
    props.onClose(value);
  };

  return (
    <Dialog
      open={props.open}
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
        <div className="flex items-center w-20 font-semibold">Register</div>
      </div>
      <div className="relative p-6 flex-auto">
        <p className="font-semibold text-2xl py-2">Welcome to Airbnb</p>
        <div className="flex flex-col gap-4 mt-4">
          <ThemeProvider theme={customTheme(outerTheme)}>
            <TextField label="Name" fullWidth />
            <TextField label="Email" type="email" fullWidth />
            <TextField label="Password" type="password" fullWidth />
          </ThemeProvider>
        </div>
      </div>
      <div className="flex flex-col gap-2 p-6">
        <div className="flex flex-row items-center gap-4 w-full">
          <button
            onClick={handleSubmit(onSubmit)}
            className="relative rounded-lg w-full bg-gradient-to-r from-rose-500 to-rose-600 text-white py-4"
          >
            Sign Up
          </button>
        </div>
      </div>
    </Dialog>
  );
}

import { Theme, useTheme } from "@emotion/react";
import { Dialog, TextField, ThemeProvider, createTheme } from "@mui/material";
import axios from "axios";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { AiFillApple, AiFillFacebook } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { IoMdClose } from "react-icons/io";

type RegisterModalProps = {
  isOpen: boolean;
  onClose: (value: string) => void;
  selectedValue: string;
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

const RegisterModal: React.FC<RegisterModalProps> = ({
  isOpen,
  onClose,
  selectedValue,
}) => {
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
        toast.success("Account created!");
        handleClose();
      })
      .catch((err) => {
        toast.error("Something went wrong.");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleClose = () => {
    onClose(selectedValue);
  };

  return (
    <Dialog open={isOpen} onClose={handleClose} fullWidth={true} maxWidth="sm">
      <div className="flex flex-row relative items-center justify-center p-6 border-b-[1px]">
        <IoMdClose
          className="absolute cursor-pointer left-9"
          onClick={handleClose}
          size={18}
        />
        <div className="flex items-center w-20 font-semibold">Register</div>
      </div>
      <div className="relative flex-auto p-6">
        <p className="py-2 text-2xl font-semibold">Welcome to Staycation!</p>
        <div className="flex flex-col gap-4 mt-4">
          <ThemeProvider theme={customTheme(outerTheme)}>
            <TextField
              {...register("name", {
                required: "name is required",
              })}
              label="Name"
              disabled={isLoading}
              fullWidth
            />
            <TextField
              {...register("email", {
                required: "email is required",
              })}
              label="Email"
              type="email"
              disabled={isLoading}
              fullWidth
            />
            <TextField
              {...register("password", {
                required: "password is required",
              })}
              label="Password"
              type="password"
              disabled={isLoading}
              fullWidth
            />
          </ThemeProvider>
        </div>
      </div>
      <div className="flex flex-col gap-2 p-6">
        <div className="flex flex-row items-center w-full gap-4">
          <button
            onClick={handleSubmit(onSubmit)}
            className="relative w-full py-4 text-white rounded-lg bg-gradient-to-r from-rose-500 to-rose-600"
            disabled={isLoading}
          >
            Sign Up
          </button>
        </div>
        <div className="flex flex-row items-center justify-center py-4 text-center">
          <hr className="w-full" />
          <p className="px-2 text-xs">or</p>
          <hr className="w-full" />
        </div>
        <div className="relative flex flex-row items-center justify-center cursor-pointer hover:bg-neutral-100">
          <AiFillFacebook className="absolute left-6" color="blue" size={24} />
          <div className="relative w-full py-3 text-sm text-center text-black border border-black rounded-lg">
            Continue with Facebook
          </div>
        </div>
        <div className="relative flex flex-row items-center justify-center my-2 cursor-pointer hover:bg-neutral-100">
          <FcGoogle className="absolute left-6" size={24} />
          <div
            onClick={() => signIn("google")}
            className="relative w-full py-3 text-sm text-center text-black border border-black rounded-lg"
          >
            Continue with Google
          </div>
        </div>
        <div className="relative flex flex-row items-center justify-center cursor-pointer hover:bg-neutral-100">
          <AiFillApple className="absolute left-6" size={24} />
          <div className="relative w-full py-3 text-sm text-center text-black border border-black rounded-lg">
            Continue with Apple
          </div>
        </div>
      </div>
    </Dialog>
  );
};

export default RegisterModal;

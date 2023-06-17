import { Theme, useTheme } from "@emotion/react";
import { Dialog, TextField, ThemeProvider, createTheme } from "@mui/material";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { AiFillApple, AiFillFacebook } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { IoMdClose } from "react-icons/io";

type LoginModalProps = {
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

export default function LoginModal(props: LoginModalProps) {
  const router = useRouter();
  const outerTheme = useTheme();

  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    signIn("credentials", {
      ...data,
      redirect: false,
    }).then((callback) => {
      setIsLoading(false);

      if (callback?.ok) {
        toast.success("Logged in!");
        router.refresh();
        handleClose();
      }

      if (callback?.error) {
        toast.error(callback.error);
      }
    });
  };

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
        <div className="flex items-center w-20 font-semibold">Login</div>
      </div>
      <div className="relative p-6 flex-auto">
        <p className="font-semibold text-2xl py-2">Welcome back</p>
        <div className="flex flex-col gap-4 mt-4">
          <ThemeProvider theme={customTheme(outerTheme)}>
            <TextField
              {...register("email")}
              label="Email"
              type="email"
              disabled={isLoading}
              fullWidth
            />
            <TextField
              {...register("password")}
              label="Password"
              type="password"
              disabled={isLoading}
              fullWidth
             
            />
          </ThemeProvider>
        </div>
      </div>
      <div className="flex flex-col gap-2 p-6">
        <div className="flex flex-row items-center gap-4 w-full">
          <button
            onClick={handleSubmit(onSubmit)}
            className="relative rounded-lg w-full bg-gradient-to-r from-rose-500 to-rose-600 text-white py-4"
            disabled={isLoading}
          >
            Log in
          </button>
        </div>
        <div className="py-4 flex flex-row items-center text-center justify-center">
          <hr className="w-full" />
          <p className="px-2 text-xs">or</p>
          <hr className="w-full" />
        </div>
        <div className="flex flex-row relative items-center justify-center cursor-pointer hover:bg-neutral-100">
          <AiFillFacebook className="absolute left-6" color="blue" size={24} />
          <div className="relative rounded-lg w-full border border-black text-black py-3 text-center text-sm">
            Continue with Facebook
          </div>
        </div>
        <div className="flex flex-row relative items-center justify-center my-2 cursor-pointer hover:bg-neutral-100">
          <FcGoogle className="absolute left-6" size={24} />
          <div
            onClick={() => signIn("google")}
            className="relative rounded-lg w-full border border-black text-black py-3 text-center text-sm"
          >
            Continue with Google
          </div>
        </div>
        <div className="flex flex-row relative items-center justify-center cursor-pointer hover:bg-neutral-100">
          <AiFillApple className="absolute left-6" size={24} />
          <div className="relative rounded-lg w-full border border-black text-black py-3 text-center text-sm">
            Continue with Apple
          </div>
        </div>
      </div>
    </Dialog>
  );
}

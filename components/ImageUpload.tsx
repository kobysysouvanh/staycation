"use client";

import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import { useCallback } from "react";
import { TbPhotoPlus } from "react-icons/tb";

declare global {
  var cloudinary: any;
}

interface ImageUploadProps {
  onChange: (value: string) => void;
  value: string;
}

export default function ImageUpload(props: ImageUploadProps) {
  const handleUpload = useCallback(
    (result: any) => {
      props.onChange(result.info.secure_url);
    },
    [props.onChange]
  );

  return (
    <CldUploadWidget
      onUpload={handleUpload}
      uploadPreset="airbnb"
      options={{
        maxFiles: 1,
      }}
    >
      {({ open }) => {
        return (
          <div
            onClick={() => open?.()}
            className="relative cursor-pointer hover:opacity-70 border-dashed border-2 p-20 border-neutral-300 flex flex-col justify-center items-center gap-4 text-neutral-600"
          >
            <TbPhotoPlus size={50} />
            <div className="font-semibold text-lg">
                Click to upload
            </div>
            {props.value && (
                <div className="absolute inset-0 w-full h-full">
                    <Image
                        alt="Upload"
                        fill
                        style={{ objectFit: "cover" }}
                        src={props.value}
                    />
                </div>
            )}
          </div>
        );
      }}
    </CldUploadWidget>
  );
}

"use client"

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import { IconType } from "react-icons";
import qs from "query-string";

interface CategoryItemProps {
  icon: IconType;
  label: string;
  selected?: boolean;
}

export default function CategoryItem(props: CategoryItemProps) {
  const router = useRouter();
  const params = useSearchParams();

  const handleClick = useCallback(() => {
    let currentQuery = {};

    if (params) {
      currentQuery = qs.parse(params.toString());
    }

    const updatedQuery: any = {
      ...currentQuery,
      category: props.label,
    };

    const url = qs.stringifyUrl(
      {
        url: "/",
        query: updatedQuery,
      },
      { skipNull: true }
    );

    router.push(url);
  }, [props.label, params, router]);

  return (
    <div
      onClick={handleClick}
      className={`flex flex-col items-center justify-center gap-2 p-2 border-b-2 transition cursor-pointer hover:text-black hover:border-b-neutral-800
    ${props.selected ? "border-b-black" : "border-transparent"}
    ${props.selected ? "text-black" : "text-neutral-500"}
    `}
    >
      <props.icon size={26} />
      <div className="font-medium text-xs">{props.label}</div>
    </div>
  );
}

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

const CategoryItem: React.FC<CategoryItemProps> = ({ icon: Icon, label, selected }) => {
  const router = useRouter();
  const params = useSearchParams();

  const handleClick = useCallback(() => {
    let currentQuery = {};

    if (params) {
      currentQuery = qs.parse(params.toString());
    }

    const updatedQuery: any = {
      ...currentQuery,
      category: label,
    };

    const url = qs.stringifyUrl(
      {
        url: "/",
        query: updatedQuery,
      },
      { skipNull: true }
    );

    router.push(url);
  }, [label, params, router]);

  return (
    <div
      onClick={handleClick}
      className={`flex flex-col items-center justify-center gap-2 p-2 border-b-2 transition cursor-pointer hover:text-black hover:border-b-neutral-800
    ${selected ? "border-b-black" : "border-transparent"}
    ${selected ? "text-black" : "text-neutral-500"}
    `}
    >
      <Icon size={26} />
      <div className="font-medium text-xs">{label}</div>
    </div>
  );
}

export default CategoryItem
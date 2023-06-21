"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { categories } from "./categoriesType"
import CategoryItem from "./CategoryItem";
import React from "react";



const Categories = () => {
  const params = useSearchParams();
  const category = params?.get("category");
  const pathname = usePathname();

  const isMainPage = pathname === "/";

  if (!isMainPage) {
    return null;
  }

  return (
    <div className=" w-full bg-white z-0 py-4">
      <div className="flex flex-row items-center justify-between pt-2 px-10 overflow-x-auto">
        {categories.map((item) => (
          <CategoryItem
            key={item.label}
            label={item.label}
            selected={category === item.label}
            icon={item.icon}
          />
        ))}
      </div>
    </div>
  );
};

export default Categories;

"use client"

import { IconType } from "react-icons"

interface CategoryInputProps {
    icon: IconType,
    label: string,
    selected?: boolean,
    onClick: (value: string) => void
}

export default function CategoryInput(props: CategoryInputProps) {
  return (
    <div
    onClick={() => props.onClick(props.label)}
    className={`rounded-xl border-2 p-4 flex flex-col gap-3 hover:border-black cursor-pointer 
    ${props.selected ? "border-black" : "border-neutral-200" }
    `}
    >
      <props.icon size={30}/>
      <div className="font-semibold">
        {props.label}
      </div>
    </div>
  )
}

"use client";

import { useCallback } from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";

interface CounterProps {
  title: string;
  subtitle: string;
  value: number;
  onChange: (value: number) => void;
}

export default function Counter(props: CounterProps) {
  const onAdd = useCallback(() => {
    props.onChange(props.value + 1);
  }, [props.onChange, props.value]);

  const onSubtract = useCallback(() => {
    if (props.value === 1) {
      return;
    }

    props.onChange(props.value - 1);
  }, [props.onChange, props.value]);

  return (
    <div className="flex flex-row items-center justify-between p-6">
      <div className="flex flex-col">
        <div className="font-medium">
            {props.title}
        </div>
        <div className="font-light text-gray-600">
            {props.subtitle}
        </div>
      </div>
      <div className="flex flex-row items-center gap-4">
        <div
            onClick={onSubtract}
            className="w-10 h-10 rounded-full border-[1px] border-neutral-400 flex items-center justify-center text-neutral-600 cursor-pointer hover:opacity-80 hover:bg-rose-500/50"
        >
            <AiOutlineMinus />
        </div>
        <div className="font-light text-xl text-neutral-600">
            {props.value}
        </div>
        <div
            onClick={onAdd}
            className="w-10 h-10 rounded-full border-[1px] border-neutral-400 flex items-center justify-center text-neutral-600 cursor-pointer hover:opacity-80 hover:bg-rose-500/50"
        >
            <AiOutlinePlus />
        </div>
      </div>
    </div>
  );
}

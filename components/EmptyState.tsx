"use client";

import { useRouter } from "next/navigation";

interface EmptyStateProps {
  title?: string;
  subtitle?: string;
  showReset?: boolean;
}

const EmptyState: React.FC<EmptyStateProps> = ({
  title = "No exact matches",
  subtitle = "Try changing or removing filters",
  showReset,
}) => {
  const router = useRouter();
  return (
    <div className="relative h-[60vh] flex flex-col gap-2 justify-center items-center">
      <div className="p-6 flex-auto text-center">
        <p className="font-semibold text-2xl py-2">{title}</p>
        <p className="tracking-wider">{subtitle}</p>
        <div className="w-full mt-4">
          {showReset && (
            <button
              className="relative rounded-lg w-full bg-gradient-to-r from-rose-500 to-rose-600 text-white py-4"
              onClick={() => router.push("/")}
            >
              Remove all filters
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default EmptyState;

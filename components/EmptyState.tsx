"use client"

import { useRouter } from 'next/navigation'


interface EmptyStateProps {
    title?: string
    subtitle?: string
    showReset?: boolean
}

export default function EmptyState(props: EmptyStateProps) {
    props.title = "No exact matches"
    props.subtitle = "Try changing or removing filters"

    const router = useRouter()
  return (
    <div className='relative h-[60vh] flex flex-col gap-2 justify-center items-center'>
      <div className="p-6 flex-auto text-center">
        <p className="font-semibold text-2xl py-2">
          {props.title}
        </p>
        <p className='tracking-wider'>{props.subtitle}</p>
        <div className='w-full mt-4'>
        {props.showReset && (
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
  )
}

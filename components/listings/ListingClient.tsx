import { SafeListing, SafeUser } from "@/app/types"
import { Listing, Reservation } from "@prisma/client"

interface ListingClientProps {
    reservations?: Reservation[]
    listing: SafeListing
    currentUser?: SafeUser | null
}

export default function ListingClient(props: ListingClientProps) {

  return (
    <div>
      ListingClient
    </div>
  )
}

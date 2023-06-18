import getCurrentUser from "@/app/actions/getCurrentUser"
import getListingByIds from "@/app/actions/getListingById"
import EmptyState from "@/components/EmptyState"
import ListingClient from "@/components/listings/ListingClient"

interface IParams {
    listingId?: string
}

const ListingPage = async ({ params } : { params : IParams }) => {
    const listing = await getListingByIds(params)
    const currentUser = await getCurrentUser()

    if(!listing) {
        return (
            <EmptyState/>
        )
    }

  return (
    <ListingClient
        listing={listing}
        currentUser={currentUser}
    />
  )
}

export default ListingPage
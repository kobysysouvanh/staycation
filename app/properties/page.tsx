import EmptyState from "@/components/EmptyState"
import getCurrentUser from "../actions/getCurrentUser"
import TripsClient from "@/components/TripsClient"
import getListings from "../actions/getListings"
import PropertiesClient from "@/components/PropertiesClient"

const PropertiesPage = async () => {
    const currentUser = await getCurrentUser()

    if(!currentUser) {
        return (
            <EmptyState
                title="Unauthorized access"
                subtitle="Please login"
            />
        )
    }

    const listings = await getListings({ 
        userId: currentUser.id,
     })

     if (listings.length === 0) {
        return (
            <EmptyState
                title="No properties found"
                subtitle="Looks like you have no properties for rent"
            />
            
        )
     }

    return (
        <PropertiesClient
            listings={listings}
            currentUser={currentUser}
        />
    )
}

export default PropertiesPage

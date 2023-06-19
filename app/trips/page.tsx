import EmptyState from "@/components/EmptyState"
import getCurrentUser from "../actions/getCurrentUser"
import getReservations from "../actions/getReservations"
import TripsClient from "@/components/TripsClient"

const TripsPage = async () => {
    const currentUser = await getCurrentUser()

    if(!currentUser) {
        return (
            <EmptyState
                title="Unauthorized access"
                subtitle="Please login"
            />
        )
    }

    const reservations = await getReservations({ 
        userId: currentUser.id,
     })

     if (reservations.length === 0) {
        return (
            <EmptyState
                title="No trips found"
                subtitle="Looks like you have not reserved any trips"
            />
            
        )
     }

    return (
        <TripsClient
            reservations={reservations}
            currentUser={currentUser}
        />
    )
}

export default TripsPage

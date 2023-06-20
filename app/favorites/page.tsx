import EmptyState from "@/components/EmptyState";
import getCurrentUser from "../actions/getCurrentUser";
import getFavorites from "../actions/getFavorites";
import FavoritesClient from "@/components/FavoritesClient";

const FavoritesPage = async () => {
    const favorites = await getFavorites()
    const currentUser = await getCurrentUser()

    if (favorites.length === 0 ) {
        return (
            <EmptyState
                title="No favorites found"
                subtitle="Looks like you have no favorited listings"
            />
        )
    }
    return (
        <FavoritesClient
            listings={favorites}
            currentUser={currentUser}
        />
    )
}

export default FavoritesPage
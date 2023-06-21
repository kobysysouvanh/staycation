import { SafeListing, SafeUser } from "@/app/types";
import ListingCard from "./listings/ListingCard";

interface FavoriteClientProps {
  listings: SafeListing[];
  currentUser?: SafeUser | null;
}

const FavoritesClient: React.FC<FavoriteClientProps> = ({
  listings,
  currentUser,
}) => {
  return (
    <div className="-mt-40 px-5">
      <div className="ml-6 mt-6 flex-auto">
        <p className="font-semibold text-2xl">My Favorites</p>
        <p>Listings you have favorited</p>
      </div>
      <div className="mt-10 px-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
        {listings.map((listing) => (
          <ListingCard
            currentUser={currentUser}
            key={listing.id}
            data={listing}
          />
        ))}
      </div>
    </div>
  );
};

export default FavoritesClient;

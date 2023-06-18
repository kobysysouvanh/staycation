import EmptyState from "@/components/EmptyState";
import getListings from "./actions/getListings";
import ListingCard from "@/components/listings/ListingCard";
import getCurrentUser from "./actions/getCurrentUser";

export default async function Home() {
  const listings = await getListings();
  const currentUser = await getCurrentUser();

  if (listings.length === 0) {
    return (
      <div>
        <EmptyState showReset />
      </div>
    );
  }

  return (
    <div className="px-10 w-full h-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
      {listings.map((listing) => {
        return (
          <ListingCard
            currentUser={currentUser}
            key={listing.id}
            data={listing}
          />
        );
      })}
    </div>
  );
}

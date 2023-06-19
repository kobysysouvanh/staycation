import { Listing, Reservation, User } from "@prisma/client";

export type SafeReservations = Omit<
  Reservation,
  "createdAt" | "startDate" | "endDate" | "listing"
> & {
  createdAt: string;
  startDate: string;
  endDate: string;
  listing: SafeListing;
};

export type SafeListing = Omit<Listing, "createdAt"> & {
  createdAt: string;
};

export type SafeUser = Omit<
  User,
  "createAt" | "updatedAt" | "emailVerified"
> & {
  createAt: string;
  updatedAt: string;
  emailVerified: string | null;
};

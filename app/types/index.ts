import { User } from "@prisma/client";

export type SafeUser = Omit<
    User,
    "createAt" | "updatedAt" | "emailVerified"
> & {
    createAt: string,
    updatedAt: string,
    emailVerified: string | null;
}
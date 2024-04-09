import Navbar from "@/components/Navbar";
import "./globals.css";
import { Inter } from "next/font/google";
import ToasterProvider from "./providers/ToasterProvider";
import getCurrentUser from "./actions/getCurrentUser";


const font = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Staycation",
  description: "Home rental platform for your next vacation",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentUser = await getCurrentUser()

  return (
    <html lang="en">
      <body className={font.className}>
        <ToasterProvider/>
        <Navbar currentUser={currentUser}/>
        <div className="pt-64 pb-20">
          {children}
        </div>
      </body>
    </html>
  );
}

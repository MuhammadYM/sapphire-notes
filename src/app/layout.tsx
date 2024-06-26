import "~/styles/globals.css";

import { Inter } from "next/font/google";
import { cookies } from "next/headers";
import SessionProvider from "./_components/SessionProvider";
import { getServerSession } from "next-auth";

import { TRPCReactProvider } from "~/trpc/react";
import { Open_Sans } from "next/font/google";

const openSans = Open_Sans({
  subsets: ["latin"],
  display: "swap",
});
export const metadata = {
  title: "Notetaker ",
  description: "Generated by create-t3-app",
  icons: [
    { rel: "icon", url: "/sapphire.svg", sizes: "30x30", type: "image/x-icon" },
  ],
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession();
  return (
    <html lang="en" className={openSans.className}>
      <body>
        <TRPCReactProvider cookies={cookies().toString()}>
          <SessionProvider session={session}>{children}</SessionProvider>
        </TRPCReactProvider>
      </body>
    </html>
  );
}

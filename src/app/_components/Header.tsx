"use client";
import { signIn, signOut, useSession } from "next-auth/react";
// import { getServerAuthSession } from "~/server/auth";
import Image from "next/image";

export const Header = () => {
  //   const session = await getServerAuthSession();
  const { data: session } = useSession();

  return (
    <div className="navbar bg-primary text-primary-content shadow-lg" data-theme="nord">
      <div className="container mx-auto max-w-7xl">
        <div className="flex-1 gap-x-2 text-2xl lg:text-3xl font-bold">
          <Image src="/sapphire.svg" width={28} height={28} alt="logo" className="ml-2"></Image>
          <span className="hidden sm:inline">
            {session ? `Notes for ${session.user.name}` : "Notetaker"}
          </span>
          <span className="sm:hidden">Notes</span>
        </div>
        <div className="flex-none gap-2">
          <div className="dropdown dropdown-end">
            {session ? (
              <label
                tabIndex={0}
                className="avatar btn btn-circle btn-ghost hover:bg-primary-focus"
                onClick={() => void signOut()}
              >
                <div className="relative h-10 w-10 overflow-hidden rounded-full ring-2 ring-primary-content/20">
                  <Image
                    src={session?.user?.image ?? ""}
                    alt={session?.user?.name ?? ""}
                    fill
                  />
                </div>
              </label>
            ) : (
              <button
                className="btn btn-ghost btn-sm lg:btn-md"
                onClick={() => void signIn()}
              >
                Sign In
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;

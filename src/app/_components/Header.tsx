"use client";
import { signIn, signOut, useSession } from "next-auth/react";
// import { getServerAuthSession } from "~/server/auth";
import Image from "next/image";

export const Header = () => {
  //   const session = await getServerAuthSession();
  const { data: session } = useSession();

  return (
    <div className="navbar bg-base-100 border-b border-base-300" data-theme="nord">
      <div className="container mx-auto max-w-7xl px-4">
        <div className="flex-1 flex items-center gap-x-2.5">
          <Image src="/sapphire.svg" width={20} height={20} alt="logo"></Image>
          <span className="font-montserrat text-lg font-light tracking-wide text-base-content">
            sapphire-notes
          </span>
        </div>
        <div className="flex-none">
          {session ? (
            <label
              tabIndex={0}
              className="avatar btn btn-circle btn-ghost"
              onClick={() => void signOut()}
            >
              <div className="relative h-8 w-8 overflow-hidden rounded-full">
                <Image
                  src={session?.user?.image ?? ""}
                  alt={session?.user?.name ?? ""}
                  fill
                />
              </div>
            </label>
          ) : (
            <button
              className="btn btn-ghost btn-sm"
              onClick={() => void signIn()}
            >
              Sign In
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;

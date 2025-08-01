"use client";
import { signIn, signOut, useSession } from "next-auth/react";
// import { getServerAuthSession } from "~/server/auth";
import Image from "next/image";

export const Header = () => {
  //   const session = await getServerAuthSession();
  const { data: session } = useSession();

  return (
    <div className="navbar bg-primary text-primary-content" data-theme="nord">
      <div className="flex-1 gap-x-1 pl-5 text-3xl font-bold">
        <Image src="/sapphire.svg" width={25} height={25} alt="logo"></Image>
        {session ? `Notes for ${session.user.name}` : "Notetaker "}
      </div>
      <div className="flex-none gap-2">
        <div className="dropdown dropdown-end">
          {session ? (
            <label
              tabIndex={0}
              className="avatar btn btn-circle btn-ghost"
              onClick={() => void signOut()}
            >
              <div className="relative h-10 w-10 overflow-hidden rounded-full">
                <Image
                  src={session?.user?.image ?? ""}
                  alt={session?.user?.name ?? ""}
                  fill
                />
              </div>
            </label>
          ) : (
            <button
              className="btn btn-ghost rounded-btn"
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

import { useSession } from "next-auth/react";
import Header from "./_components/Header";
import { api } from "~/trpc/server";
import { getServerSession } from "next-auth/next";
import { title } from "process";
import Content from "./_components/Content";

export default async function Home() {
  return (
    <main className="flex min-h-screen flex-col  text-white" data-theme="retro">
      <Header />
      <Content />
    </main>
  );
}

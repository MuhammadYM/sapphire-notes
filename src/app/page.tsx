import Header from "./_components/Header";

import Content from "./_components/Content";

export default async function Home() {
  return (
    <main className="flex min-h-screen flex-col" data-theme="retro">
      <Header />
      <Content />
    </main>
  );
}

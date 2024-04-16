"use client";
import Header from "./_components/Header";
import { useEffect } from "react";

import Content from "./_components/Content";

export default function Home() {
  async function requestNotificationPermission() {
    try {
      const result = await Notification.requestPermission();
      if (result === "granted") {
        // Trigger your notification here
      }
    } catch (error) {
      console.error("Error showing notification", error);
    }
  }

  useEffect(() => {
    const button = document.getElementById("notifications");
    if (button) {
      button.onclick = requestNotificationPermission;
    }
  }, []);

  return (
    <main className="flex min-h-screen flex-col" data-theme="lemonade">
      <button id="notifications"></button>
      <Header />
      <Content />
    </main>
  );
}

function randomNotification() {
  const random = Math.floor(Math.random() * 1000);
  const notification = new Notification("Hello, world!", {
    body: `Random number: ${random}`,
  });
  notification.onclick = () => {
    window.open("https://www.youtube.com/watch?v=dQw4w9WgXcQ");
  };
}

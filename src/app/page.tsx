"use client";

import Header from "./_components/Header";
import { useEffect } from "react";

import Content from "./_components/Content";

export default function Home() {
  const words = [
    "Hello",
    "World",
    "React",
    "Elixir",
    "Phoenix",
    "JavaScript",
    "Programming",
  ];
  async function requestNotificationPermission() {
    try {
      const result = await Notification.requestPermission();
      if (result === "granted") {
        // Trigger your notification here
        randomNotification();
      }
    } catch (error) {
      console.error("Error showing notification", error);
    }
  }

  function randomNotification() {
    const randomItemIndex = Math.floor(Math.random() * words.length);
    const notifTitle = words[randomItemIndex] ?? "Word of the Moment";
    const notifBody = `Word of the Moment: ${words[randomItemIndex]}`;

    const options = {
      body: notifBody,
    };

    new Notification(notifTitle, options);
    setTimeout(randomNotification, 10000);
  }

  useEffect(() => {
    const button = document.getElementById("notifications");
    if (button) {
      button.onclick = requestNotificationPermission;
    }
  }, []);

  return (
    <main className="flex min-h-screen flex-col" data-theme="lemonade">
      <button id="notifications" className="btn btn-neutral">
        Allow notifications!
      </button>
      <Header />
      <Content />
    </main>
  );
}

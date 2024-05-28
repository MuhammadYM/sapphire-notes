"use client";

import Header from "./_components/Header";
import { useEffect } from "react";
import dotenv from "dotenv";
dotenv.config();

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

  function randomNotification() {
    const randomItemIndex = Math.floor(Math.random() * words.length);
    const notifTitle = words[randomItemIndex] ?? "Word of the Moment";
    const notifBody = `Word of the Moment: ${words[randomItemIndex]}`;
    const notifImg = `/sapphire.svg`;

    const options = {
      body: notifBody,
      icon: notifImg,
    };

    new Notification(notifTitle, options);
    setTimeout(randomNotification, 10000);
  }

  useEffect(() => {
    if ("serviceWorker" in navigator) {
      const handleServiceWorker = async () => {
        try {
          const register = await navigator.serviceWorker.register("/sw.js");
          console.log("Service Worker registered:", register);
        } catch (error) {
          console.error("Service Worker registration failed:", error);
        }
      };
      handleServiceWorker();
    }

    const button = document.getElementById("notifications");
    if (button) {
      button.addEventListener("click", requestNotificationPermission);
    }
  }, []);

  const requestNotificationPermission = async () => {
    try {
      const permission = await Notification.requestPermission();
      if (permission === "granted") {
        await subscribeUserToPush();
      } else {
        console.log("Notification permission denied");
      }
    } catch (error) {
      console.error("Error requesting notification permission:", error);
    }
  };

  const subscribeUserToPush = async () => {
    try {
      const register = await navigator.serviceWorker.ready;

      const subscription = await register.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlB64ToUint8Array(
          process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY,
        ),
      });

      const res = await fetch("http://localhost:3000/", {
        method: "POST",
        body: JSON.stringify(subscription),
        headers: {
          "content-type": "application/json",
        },
      });

      const data = await res.json();
      console.log("Push subscription:", data);
    } catch (error) {
      console.error("Error subscribing to push notifications:", error);
    }
  };

  function urlB64ToUint8Array(base64String) {
    const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
    const base64 = (base64String + padding)
      .replace(/\-/g, "+")
      .replace(/_/g, "/");
    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);
    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  }

  return (
    <main className="flex min-h-screen flex-col" data-theme="lemonade">
      <button id="notifications">Allow notifications!</button>
      <Header />
      <Content />
    </main>
  );
}

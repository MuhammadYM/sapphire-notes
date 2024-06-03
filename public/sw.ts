// Define the shape of the notification payload
interface NotificationPayload {
  title: string;
  body: string;
  icon: string;
  data: {
    url: string;
  };
}

// Listen for push events
self.addEventListener("push", (event: PushEvent) => {
  let data: NotificationPayload;

  try {
    data = event.data.json();
  } catch (e) {
    console.error("Error parsing push event data:", e);
    return;
  }

  const options = {
    body: data.body,
    icon: data.icon,
    data: {
      url: data.data.url,
    },
  };

  event.waitUntil(self.registration.showNotification(data.title, options));
});

// Handle notification clicks
self.addEventListener("notificationclick", (event: NotificationEvent) => {
  event.notification.close();
  event.waitUntil(
    clients
      .matchAll({ type: "window", includeUncontrolled: true })
      .then((clientList) => {
        if (clientList.length > 0) {
          let client = clientList[0];
          for (let i = 0; i < clientList.length; i++) {
            if (clientList[i].focused) {
              client = clientList[i];
            }
          }
          return client.focus();
        }
        return clients.openWindow(event.notification.data.url);
      }),
  );
});

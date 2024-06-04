// /* eslint-disable @typescript-eslint/no-unsafe-call */
// // Define the shape of the notification payload
// // interface NotificationPayload {
// //   title: string;
// //   body: string;
// //   icon: string;
// //   data: {
// //     url: string;
// //   };
// // }

// // Listen for push events
// self.addEventListener("push", (event: Event) => {
//   const pushEvent = event as PushEvent;
//   let data: NotificationPayload;

//   try {
//     data = pushEvent.data?.json();
//   } catch (e) {
//     console.error("Error parsing push event data:", e);
//     return;
//   }

//   const options = {
//     body: data.body,
//     icon: data.icon,
//     data: {
//       url: data.data.url,
//     },
//   };

//   Pushevent.waitUntil(self.registration.showNotification(data.title, options));
// });

// // Handle notification clicks
// self.addEventListener(
//   "notificationclick",
//   (event: NotificationEvent<Notification>) => {
//     event.notification.close();
//     event.waitUntil(
//       self.Clients.matchAll({ type: "window", includeUncontrolled: true }).then(
//         (clientList: WindowClient[]) => {
//           if (clientList.length > 0) {
//             let client = clientList[0];
//             for (let i = 0; i < clientList.length; i++) {
//               if (clientList[i]?.focused) {
//                 client = clientList[i];
//               }
//             }
//             return client?.focus();
//           }
//           return self.Clients.openWindow(event.notification.data.url);
//         },
//       ),
//     );
//   },
// );

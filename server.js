import express from "express";
import webpush from "web-push";
import dotenv from "dotenv";
import cors from "cors";
dotenv.config();

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
    optionsSuccessStatus: 200,
    credentials: true,
  }),
);
app.use(express.json());

const vapidKeys = {
  publicKey: process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY,
  privateKey: process.env.PRIVATE_KEY,
  vapid_subject: process.env.VAPID_SUBJECT,
};

webpush.setVapidDetails(
  vapidKeys.vapid_subject,
  vapidKeys.publicKey,
  vapidKeys.privateKey,
);

let subscriptions = [];

app.post("/subscribe", (req, res) => {
  const subscription = req.body;
  subscriptions.push(subscription);

  res.status(201).json({ status: "success" });
});

app.post("/send-notification", (req, res) => {
  const notificationPayload = {
    title: "New Notification",
    body: "This is a new notification",
    icon: "https://some-image-url.jpg",
    data: {
      url: "https://example.com",
    },
  };

  Promise.all(
    subscriptions.map((subscription) =>
      webpush.sendNotification(
        subscription,
        JSON.stringify(notificationPayload),
      ),
    ),
  )
    .then(() =>
      res.status(200).json({ message: "Notification sent successfully." }),
    )
    .catch((err) => {
      console.error("Error sending notification", err);
      res.sendStatus(500);
    });
});

const port = process.env.PORT ?? 4000;
app.listen(port, () => {
  console.log("Server started on port 4000");
});

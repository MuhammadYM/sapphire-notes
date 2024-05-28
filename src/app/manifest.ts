import { type MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Sapphire Notes",
    short_name: "Sapphire",
    description: "Markup? hmm no problem, use Sapphire",
    start_url: "/",
    display: "standalone",
    background_color: "#fff",
    theme_color: "#fff",
    icons: [
      {
        src: "/sapphire.svg",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
    gcm_sender_id: "103953800507",
  };
}

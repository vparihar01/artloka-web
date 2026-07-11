import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "ArtLoka — Handcrafted Indian Lighting and Decor",
    short_name: "ArtLoka",
    description: "Heritage craftsmanship, styled for modern living.",
    start_url: "/",
    display: "standalone",
    background_color: "#f7f1e8",
    theme_color: "#2b2520",
    icons: [
      { src: "/icon.png", sizes: "512x512", type: "image/png" },
      { src: "/apple-icon.png", sizes: "180x180", type: "image/png" }
    ]
  };
}

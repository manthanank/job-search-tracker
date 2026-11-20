import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "HuntFlow — Job Search & Application Tracker",
    short_name: "HuntFlow",
    description: "Career management pipeline and recruitment CRM with visual Kanban boards, salary analytics, and interview reminders.",
    start_url: "/",
    display: "standalone",
    background_color: "#030712",
    theme_color: "#f59e0b",
    icons: [
      {
        src: "/icon",
        sizes: "32x32",
        type: "image/png",
      },
      {
        src: "/apple-icon",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  };
}

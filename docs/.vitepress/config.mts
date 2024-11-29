import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Maests",
  description: "Maests Docs",
  head: [["link", { rel: "icon", type: "image/png", href: "/maests.png" }]],
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [{ text: "Getting Started", link: "/getting-started" }],

    logo: "/maests.png",

    sidebar: [
      {
        text: "Introduction",
        items: [
          { text: "Getting Started", link: "/getting-started" },
          { text: "Playground", link: "/playground" },
        ],
      },
      {
        text: "API",
        items: [{ text: "Commands", link: "/commands" }],
      },
    ],

    socialLinks: [
      { icon: "github", link: "https://github.com/vuejs/vitepress" },
    ],
  },
});

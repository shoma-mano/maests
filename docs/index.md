---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: "Maests"
  text: "Run Maestro with TypeScript"
  tagline: Write Maestro flows in TypeScript and execute directly.
  actions:
    - theme: brand
      text: Getting Started
      link: /getting-started

  image:
    src: /maests.png

features:
  - icon: 🚀
    title: Easily Break Down Flows
    details: Break down flows into smaller, reusable modules moere easily than yaml.
  - icon: 🛹
    title: Write Flows Faster with IDE Support
    details: Write flows faster with the power of an IDE.
  - icon: 🎸
    title: Handle runScript with Type Safety
    details: Write scripts in TypeScript and execute them by passing them as callbacks.
---

<style>
:root {
  --vp-home-hero-name-color: transparent !important;
  --vp-home-hero-name-background: -webkit-linear-gradient(120deg, #bd34fe 30%, #41d1ff) !important;

  --vp-home-hero-image-background-image: linear-gradient(-45deg, #bd34fe 50%, #47caff 50%) !important;
  --vp-home-hero-image-filter: blur(44px) !important;
}

@media (min-width: 640px) {
  :root {
    --vp-home-hero-image-filter: blur(56px) !important;
  }
}

@media (min-width: 960px) {
  :root {
    --vp-home-hero-image-filter: blur(68px) !important;
  }
}
</style>

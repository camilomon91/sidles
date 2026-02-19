import { apiPlugin, storyblokInit } from "@storyblok/react";
import Hero from "@/storyblok/Hero";
import Page from "@/storyblok/Page";
import ProjectCard from "@/storyblok/ProjectCard";
import Section from "@/storyblok/Section";

let isInitialized = false;

export function initStoryblok() {
  if (isInitialized) return;

  storyblokInit({
    accessToken: process.env.NEXT_PUBLIC_STORYBLOK_TOKEN,
    use: [apiPlugin],
    components: {
      hero: Hero,
      page: Page,
      project_card: ProjectCard,
      section: Section,
    },
  });

  isInitialized = true;
}

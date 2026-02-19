import { apiPlugin, storyblokInit } from "@storyblok/react";
import Hero from "@/features/storyblok/components/Hero";
import Page from "@/features/storyblok/components/Page";
import ProjectCard from "@/features/storyblok/components/ProjectCard";
import Section from "@/features/storyblok/components/Section";

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

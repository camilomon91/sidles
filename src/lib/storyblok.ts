import { storyblokInit, apiPlugin } from "@storyblok/react";
import Page from "@/storyblok/Page";
import Hero from "@/storyblok/Hero";
import Section from "@/storyblok/Section";
import ProjectCard from "@/storyblok/ProjectCard";

export function initStoryblok() {
  storyblokInit({
    accessToken: process.env.NEXT_PUBLIC_STORYBLOK_TOKEN,
    use: [apiPlugin],
    components: {
      page: Page,
      hero: Hero,
      section: Section,
      project_card: ProjectCard,
    },
  });
}

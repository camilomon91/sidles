export type StoryblokAsset = {
  alt?: string;
  filename?: string;
};

export type HeroBlok = {
  _uid: string;
  component: "hero";
  title?: string;
  subtitle?: string;
  image?: StoryblokAsset;
};

export type ProjectCardBlok = {
  _uid: string;
  component: "project_card";
  name?: string;
  description?: string;
  stack?: string;
  link?: { url?: string };
  image?: StoryblokAsset;
};

export type SectionBlok = {
  _uid: string;
  component: "section";
  heading?: string;
  items?: ProjectCardBlok[];
};

export type PageBlok = {
  _uid: string;
  component: "page";
  body?: Array<HeroBlok | SectionBlok | ProjectCardBlok>;
};

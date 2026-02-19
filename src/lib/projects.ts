export type Project = {
  slug: string;
  title: string;
  result: string;
  tags: string[];
  liveUrl: string;
  codeUrl: string;
  problem: string;
  approach: string;
  outcome: string;
};

export const projects: Project[] = [
  {
    slug: "sidlee-microsite",
    title: "SIDLEE Microsite",
    result: "Storyblok pages now degrade gracefully instead of failing hard under API or content issues.",
    tags: ["CMS", "A11y", "Perf"],
    liveUrl: "/sidlee",
    codeUrl: "/projects/sidlee-microsite#implementation",
    problem: "Editors needed speed, but broken CMS payloads could take pages down.",
    approach: "Typed content boundaries + fallback rendering + stricter runtime validation.",
    outcome: "The user journey stays alive and branded even when CMS data misbehaves.",
  },
  {
    slug: "contact-flow",
    title: "Contact Flow",
    result: "Submission quality improved using structured validation, honeypot filtering, and throttling.",
    tags: ["Full-stack", "A11y", "QA"],
    liveUrl: "/sidlee/contact",
    codeUrl: "/projects/contact-flow#implementation",
    problem: "Unvalidated inputs created noisy submissions and weak trust in the form.",
    approach: "Client-side instant feedback + server validation contract + anti-spam controls.",
    outcome: "Cleaner leads, better UX, and a predictable API response surface.",
  },
  {
    slug: "design-system",
    title: "Bold Portfolio System",
    result: "A reusable visual language made the portfolio feel cohesive and campaign-driven.",
    tags: ["Design", "Motion", "Frontend"],
    liveUrl: "/",
    codeUrl: "/projects/design-system#implementation",
    problem: "The previous pages felt disconnected and lacked hierarchy.",
    approach: "Poster hero, strict spacing rhythm, shared primitives, and controlled motion.",
    outcome: "Faster scanability and a stronger first impression for reviewers.",
  },
];

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}

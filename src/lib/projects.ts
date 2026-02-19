export type Project = {
  slug: string;
  title: string;
  result: string;
  tags: string[];
  liveUrl: string;
  codeUrl?: string;
  problem: string;
  approach: string;
  outcome: string;
  nextStep: string;
};

export const projects: Project[] = [
  {
    slug: "sidlee-microsite",
    title: "SIDLEE Microsite",
    result: "Improved first-load clarity and made CMS failures degrade gracefully.",
    tags: ["CMS", "A11y", "Perf"],
    liveUrl: "/sidlee",
    codeUrl: "/projects/sidlee-microsite",
    problem: "Content editors needed autonomy without risking hard frontend crashes.",
    approach: "Built typed Storyblok boundaries, fallback states, and defensive API parsing.",
    outcome: "User-facing downtime became a soft degradation, not a blank page.",
    nextStep: "Add observability dashboards and contract tests against Storyblok fixtures.",
  },
  {
    slug: "contact-flow",
    title: "Contact Flow",
    result: "Cut invalid submissions with server validation, honeypot, and rate limits.",
    tags: ["Full-stack", "A11y", "QA"],
    liveUrl: "/sidlee/contact",
    codeUrl: "/projects/contact-flow",
    problem: "The original form accepted noisy input and gave weak feedback.",
    approach: "Implemented structured API errors, field-level a11y hints, and focus handling.",
    outcome: "More trustworthy submissions and better user confidence in send actions.",
    nextStep: "Integrate transactional email + analytics event tracing.",
  },
];

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}

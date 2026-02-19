import { notFound } from "next/navigation";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import { getProject } from "@/lib/projects";

export default async function ProjectCaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) {
    notFound();
  }

  return (
    <main className="site-texture py-16">
      <div className="page-container">
        <section className="section-space border-2 border-black bg-white p-6 md:p-10">
          <p className="section-kicker">Case study</p>
          <h1 className="mt-4 text-5xl font-black leading-[0.95] md:text-7xl">{project.title}</h1>
          <p className="mt-5 max-w-3xl text-lg font-medium">{project.result}</p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Button href={project.liveUrl} variant="ghost">
              Live
            </Button>
            <Button href="/">Back home</Button>
          </div>
        </section>

        <div className="section-space grid-12">
          <Card className="col-span-12 md:col-span-6 motion-enter">
            <h2 className="text-2xl font-black">Problem</h2>
            <p className="mt-3 text-base font-medium">{project.problem}</p>
          </Card>
          <Card className="col-span-12 md:col-span-6 motion-enter">
            <h2 className="text-2xl font-black">Approach</h2>
            <p className="mt-3 text-base font-medium">{project.approach}</p>
          </Card>
          <Card className="col-span-12 md:col-span-6 motion-enter">
            <h2 className="text-2xl font-black">Result</h2>
            <p className="mt-3 text-base font-medium">{project.outcome}</p>
          </Card>
          <Card className="col-span-12 md:col-span-6 motion-enter">
            <h2 className="text-2xl font-black">Next step</h2>
            <p className="mt-3 text-base font-medium">{project.nextStep}</p>
          </Card>
        </div>
      </div>
    </main>
  );
}

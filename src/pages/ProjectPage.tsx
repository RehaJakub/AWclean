import { ArrowRight } from "lucide-react";
import type { Project } from "../data/projects";
import { Breadcrumbs } from "../components/layout/Breadcrumbs";
import { PageIntro } from "../components/layout/PageIntro";
import { Gallery } from "../components/Gallery";
import { ProjectFacts } from "../components/ProjectFacts";
import { ServiceCTA } from "../components/services/ServiceCTA";
interface ProjectPageProps {
  project: Project;
}
export function ProjectPage({ project }: ProjectPageProps) {
  return (
    <div className="project-page">
      <Breadcrumbs
        items={[
          { label: "Reference", href: "/reference/" },
          { label: project.title },
        ]}
      />
      <PageIntro
        eyebrow="REALIZACE AWCLEAN / ČIŠTĚNÍ FASÁD"
        title={project.title}
        description={project.description}
      />
      <section className="container project-detail">
        <ProjectFacts project={project} />
        <Gallery images={project.comparison ? [
          { src: project.comparison.before, alt: project.comparison.beforeAlt, caption: "Před čištěním" },
          { src: project.comparison.after, alt: project.comparison.afterAlt, caption: "Po čištění" },
        ] : project.gallery} label={project.title} />
        <div className="project-outcome"><h2>Co se změnilo</h2><p>{project.outcome}</p></div>
        <div className="project-links">
          <a className="text-link" href={project.servicePath}>
            Jak probíhá čištění fasád <ArrowRight size={17} />
          </a>
          <a className="text-link" href="/reference/">
            Zpět na všechny reference <ArrowRight size={17} />
          </a>
        </div>
      </section>
      <ServiceCTA servicePath={project.servicePath} />
    </div>
  );
}

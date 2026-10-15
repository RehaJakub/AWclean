import { ArrowRight } from "lucide-react";
import { projects, type Project } from "../data/projects";
import { servicePages } from "../data/pages";
import { Breadcrumbs } from "../components/layout/Breadcrumbs";
import { Gallery } from "../components/Gallery";
import { ProjectFacts } from "../components/ProjectFacts";
import { ResponsiveImage } from "../components/ResponsiveImage";
import { ServiceCTA } from "../components/services/ServiceCTA";
interface ProjectPageProps {
  project: Project;
}
export function ProjectPage({ project }: ProjectPageProps) {
  const service = servicePages.find((page) => page.path === project.servicePath);
  const next = projects[(projects.indexOf(project) + 1) % projects.length];
  const pair = project.comparison
    ? [
        { src: project.comparison.before, alt: project.comparison.beforeAlt, label: "Před" },
        { src: project.comparison.after, alt: project.comparison.afterAlt, label: "Po" },
      ]
    : null;
  return (
    <div className="project-page">
      <Breadcrumbs
        items={[
          { label: "Reference", href: "/reference/" },
          { label: project.title },
        ]}
      />
      <header className="project-hero">
        <ResponsiveImage
          src={project.image}
          alt=""
          sizes="100vw"
          fetchPriority="high"
          width="1600"
          height="900"
        />
        <div className="rd-wrap project-hero-copy">
          <p className="project-hero-kicker">
            Realizace · {service?.shortTitle ?? "AWCLEAN"}
          </p>
          <h1>{project.title}</h1>
        </div>
      </header>
      <section className="rd-wrap project-detail">
        <div className="project-intro">
          <p className="svc-lead">{project.description}</p>
          <ProjectFacts project={project} />
        </div>
        {pair ? (
          <div className="project-pair">
            {pair.map((image) => (
              <figure key={image.src}>
                <ResponsiveImage
                  src={image.src}
                  alt={image.alt}
                  sizes="(max-width: 760px) 100vw, 50vw"
                  loading="lazy"
                  width="800"
                  height="1000"
                />
                <span className={`rd-badge${image.label === "Po" ? " is-after" : ""}`}>
                  {image.label}
                </span>
              </figure>
            ))}
          </div>
        ) : (
          <Gallery images={project.gallery} label={project.title} />
        )}
        <div className="project-outcome">
          <h2>Co se změnilo</h2>
          <p>{project.outcome}</p>
        </div>
        <div className="project-links">
          <a className="rd-link" href={project.servicePath}>
            {service?.shortTitle ?? "Služba"} – jak probíhá <ArrowRight size={17} aria-hidden="true" />
          </a>
          <div>
            <a className="rd-btn rd-btn-outline" href="/reference/">
              Všechny reference
            </a>
            {next !== project && (
              <a className="rd-btn rd-btn-dark" href={next.path}>
                Další: {next.title} <ArrowRight size={17} aria-hidden="true" />
              </a>
            )}
          </div>
        </div>
      </section>
      <ServiceCTA servicePath={project.servicePath} />
    </div>
  );
}

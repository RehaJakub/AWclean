import type { Project } from "../data/projects";
interface ProjectFactsProps { project: Project; compact?: boolean }
export function ProjectFacts({ project, compact = false }: ProjectFactsProps) {
  return (
    <dl className={`project-facts${compact ? " is-compact" : ""}`}>
      {project.facts.slice(0, compact ? 2 : undefined).map((fact) => <div key={fact.label}><dt>{fact.label}</dt><dd>{fact.value}</dd></div>)}
    </dl>
  );
}

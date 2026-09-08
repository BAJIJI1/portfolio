import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { HiOutlineExternalLink } from "react-icons/hi";
import { FiGithub } from "react-icons/fi";
import { projectCategories, projects } from "../data/profile";
import SectionHeading from "./ui/SectionHeading";
import Reveal from "./ui/Reveal";
import { StaggerContainer, StaggerItem } from "./ui/Stagger";
import ProjectModal from "./ui/ProjectModal";

function ProjectCard({ project, onOpen }) {
  return (
    <div
      onClick={() => onOpen(project)}
      className="group h-full flex flex-col rounded-2xl border border-navy/10 dark:border-white/10 bg-bg-light dark:bg-bg-dark-alt overflow-hidden shadow-sm hover:shadow-2xl hover:shadow-navy/10 dark:hover:shadow-emerald/10 hover:border-emerald/40 transition-shadow cursor-pointer"
    >
      <div className="relative aspect-[4/3] flex items-center justify-center overflow-hidden bg-navy/5 dark:bg-white/5">
        {/* Placeholder screenshot — swap the file at this path */}
        <img
          src={project.images[0]}
          alt={`${project.name} screenshot`}
          className="h-full w-full object-contain scale-100 group-hover:scale-125 transition-transform duration-500 ease-out"
          onError={(e) => {
            e.currentTarget.style.display = "none";
            e.currentTarget.nextElementSibling.style.display = "flex";
          }}
        />
        <div className="hidden h-full w-full items-center justify-center font-mono text-xs text-muted bg-navy/5 dark:bg-white/5">
          screenshot placeholder
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-navy/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>

      <div className="flex-1 flex flex-col p-6">
        <div className="h-6 overflow-hidden flex flex-wrap gap-1.5 mb-3">
          {project.categories.map((c) => (
            <span
              key={c}
              className="text-[11px] font-mono uppercase tracking-wide text-emerald bg-emerald/10 rounded-full px-2 py-0.5"
            >
              {c}
            </span>
          ))}
        </div>
        <h3 className="font-display font-semibold text-lg text-navy dark:text-white truncate">
          {project.name}
        </h3>
        <p className="min-h-[2.5rem] text-sm text-emerald font-medium mt-0.5 line-clamp-2">
          {project.tagline}
        </p>
        <p className="mt-3 min-h-[4.3rem] text-sm text-body-light dark:text-body-dark leading-relaxed line-clamp-3">
          {project.description}
        </p>

        <div className="mt-auto flex items-center gap-4 pt-5 border-t border-navy/10 dark:border-white/10">
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-navy dark:text-white hover:text-emerald transition-colors"
          >
            <FiGithub size={16} /> Code
          </a>
          {project.liveDemo && (
            <a
              href={project.liveDemo}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-emerald hover:text-emerald-dark transition-colors"
              title={project.liveDemoPlaceholder ? "Placeholder link — will be replaced once deployed" : undefined}
            >
              <HiOutlineExternalLink size={16} /> Live Demo
              {project.liveDemoPlaceholder && (
                <span className="text-[10px] font-normal text-muted">(placeholder)</span>
              )}
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

export default function Projects() {
  const [filter, setFilter] = useState("All");
  const [activeProject, setActiveProject] = useState(null);

  const filtered = useMemo(
    () => (filter === "All" ? projects : projects.filter((p) => p.categories.includes(filter))),
    [filter]
  );

  return (
    <section id="projects" className="py-24 sm:py-28 bg-bg-light-alt dark:bg-bg-dark-alt">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Projects"
          title="Things I've built"
          subtitle="From AI-assisted decision support to enterprise call center systems — a look at the work."
        />

        <Reveal delay={0.1}>
          <div className="mt-8 flex flex-wrap gap-2">
            {projectCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                  filter === cat
                    ? "bg-emerald text-white"
                    : "bg-navy/5 dark:bg-white/10 text-body-light dark:text-body-dark hover:bg-navy/10 dark:hover:bg-white/20"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </Reveal>

        <StaggerContainer
          className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
          stagger={0.07}
        >
          {filtered.map((project) => (
            <StaggerItem key={project.slug}>
              <motion.div layout>
                <ProjectCard project={project} onOpen={setActiveProject} />
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>

      <ProjectModal project={activeProject} onClose={() => setActiveProject(null)} />
    </section>
  );
}

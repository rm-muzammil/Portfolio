import Image from "next/image";
import React from "react";

interface Project {
  title: string;
  description: string;
  image: string;
  skills: string[];
}

function ProjectsCard({ project }: { project: Project }) {
  return (
    <div className="w-[22rem] p-6 bg-gradient-to-br from-[#10011e] to-[#30013d] text-gray-50 rounded-2xl shadow-md flex-shrink-0 hover:scale-[1.03] transition-all duration-300 border border-white/10">
      {/* Project Image */}
      <div className="w-full relative h-40 rounded-xl overflow-hidden">
        <Image
          fill
          className="object-cover opacity-80"
          src={project.image}
          alt={project.title}
        />
      </div>

      {/* Skills */}
      <div className="flex flex-wrap gap-2 my-4 min-h-[3rem]">
       <div className="flex flex-wrap gap-2 my-4 h-[3.2rem] overflow-hidden content-start">
  {project.skills.slice(0, 4).map((s: string) => (
    <span
      className="bg-violet-950 text-gray-300 text-xs px-2 py-1 rounded-full whitespace-nowrap"
      key={s}
    >
      {s}
    </span>
  ))}

  {project.skills.length > 4 && (
    <span className="bg-gray-700 text-gray-300 text-xs px-2 py-1 rounded-full whitespace-nowrap">
      +{project.skills.length - 4} more
    </span>
  )}
</div>
      </div>

      {/* Content */}
      <div>
        <h3 className="text-lg font-bold mb-2 min-h-[3.5rem] line-clamp-2">
          {project.title}
        </h3>
        <p className="text-sm text-gray-400 leading-relaxed min-h-[5rem] line-clamp-4">
          {project.description}
        </p>
      </div>
    </div>
  );
}

export default ProjectsCard;
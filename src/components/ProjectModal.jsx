import { motion, AnimatePresence } from "framer-motion";

export default function ProjectModal({ isOpen, onClose, project }) {
  if (!project) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-gray-800/70 backdrop-blur-xs z-[9999] flex items-center justify-center md:p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="bg-gray-800 text-gray-50 max-w-[90%] md:max-w-[55%] w-full  rounded-xl p-2 md:p-6"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.8 }}
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={project.image}
              alt={project.title}
              className="md:w-full md:h-[20rem] object-cover rounded mb-4"
            />
            <h2 className="md:text-2xl font-bold mb-2">{project.title}</h2>
            <div className="flex flex-wrap mb-2 gap-[1rem]">
              {project.skills.map((s) => (
                <p
                  className="bg-violet-950 md:my-[2rem]  text-gray-300 text-xs px-2 h-[1rem]"
                  key={s}
                >
                  {s}
                </p>
              ))}
            </div>
            <p className="md:text-sm text-[0.7rem] mb-2">
              {project.description}
            </p>
            <div className="flex justify-between gap-4 md:mt-4">
              {project.link[0] ? (
                <a
                  href={project?.link[0]}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gray-700 w-[49%] hover:bg-purple-800 text-white md:px-4 md:py-2 rounded text-center transition"
                >
                  View Code
                </a>
              ) : (
                ""
              )}
              {project.link[1] ? (
                <a
                  href={project?.link[1]}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-purple-700 w-[49%] hover:bg-purple-800 text-white md:px-4 md:py-2 rounded text-center transition"
                >
                  View Live Demo
                </a>
              ) : (
                ""
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

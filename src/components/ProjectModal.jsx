import { motion, AnimatePresence } from "framer-motion";

export default function ProjectModal({ isOpen, onClose, project }) {
  if (!project) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-gray-900/70 backdrop-blur-sm p-3 md:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="bg-gray-800 text-gray-50 w-full max-w-[95%] md:max-w-3xl rounded-2xl p-4 md:p-6 shadow-2xl max-h-[90vh] overflow-y-auto"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-48 md:h-80 object-cover rounded-xl mb-4"
            />

            <h2 className="text-lg md:text-2xl font-bold mb-3">{project.title}</h2>

            {/* Skills */}
            <div className="flex flex-wrap gap-2 mb-4">
              {project.skills.map((s) => (
                <span
                  key={s}
                  className="bg-violet-900/60 border border-violet-700 text-violet-200 text-xs md:text-sm px-3 py-1 rounded-full whitespace-nowrap"
                >
                  {s}
                </span>
              ))}
            </div>

            <p className="text-sm md:text-base text-gray-300 leading-relaxed mb-5">
              {project.description}
            </p>

            <div className="flex flex-col sm:flex-row gap-3 mt-4">
              {project.link[0] && (
                <a
                  href={project.link[0]}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2.5 rounded-lg text-center transition w-full"
                >
                  View Code
                </a>
              )}

              {project.link[1] && (
                <a
                  href={project.link[1]}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-purple-700 hover:bg-purple-800 text-white px-4 py-2.5 rounded-lg text-center transition w-full"
                >
                  View Live Demo
                </a>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
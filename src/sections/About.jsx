import AnimatedSection from "../components/AnimatedSection";
import TrueFocus from "./TrueFocus";
import RotatingText from "./RotatingText";

import Profile from "@/components/Profile";

export default function About() {
  return (
    <AnimatedSection
      variants={{
        hidden: { opacity: 0, scale: 0.9 },
        visible: { opacity: 1, scale: 1 },
      }}
    >
      <section
        id="about"
        className="mt-[1rem] min-h-screen flex flex-wrap-reverse md:flex-nowrap justify-between items-center mx-[1rem] md:mx-[6rem] lg:mx-[10rem] text-white"
      >
        {/* Left Content */}
        <div className="flex flex-col justify-center md:max-w-[42rem]">
          <h2 className="text-2xl md:text-4xl font-semibold">HI, I'm</h2>

          <div className="flex my-2">
            <TrueFocus
              sentence="RM MUZAMMIL"
              manualMode={false}
              blurAmount={5}
              borderColor="purple"
              animationDuration={2}
              pauseBetweenAnimations={1}
            />
          </div>

          <div className="flex items-center flex-wrap gap-2 md:w-[40rem]">
            <h3 className="md:text-2xl text-[1rem]">I am a</h3>

            <RotatingText
              texts={[
                "Full Stack Developer",
                "Next.js Developer",
                "MERN Stack Developer",
              ]}
              mainClassName="px-2 md:text-3xl text-[1.2rem] font-bold sm:px-2 md:px-3 text-violet-500 overflow-hidden py-0.5 sm:py-1 md:py-2 justify-center rounded-lg"
              staggerFrom={"last"}
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "-120%" }}
              staggerDuration={0.035}
              splitLevelClassName="overflow-hidden pb-0.5 sm:pb-1 md:pb-1"
              transition={{ type: "spring", damping: 90, stiffness: 1200 }}
              rotationInterval={3500}
            />
          </div>

          <div className="md:text-lg text-sm leading-relaxed text-gray-300 mt-4">
            I build modern, responsive, and high-performance web applications
            for businesses, startups, and personal brands. My core expertise
            includes React.js, Next.js, Node.js, Express.js, MongoDB,
            PostgreSQL, and Prisma. I create fast, SEO-friendly, and
            production-ready websites, dashboards, admin panels, authentication
            systems, and full-stack web solutions.
          </div>

          <p className="mt-4 text-sm md:text-lg text-violet-300 font-medium">
            Available for freelance projects: Business Websites, Dashboards,
            Admin Panels, and Full-Stack Web Apps.
          </p>
        </div>

        {/* Right Profile */}
        <div className="mt-[4rem] md:mt-0 flex justify-center items-center w-full">
          <Profile />
        </div>
      </section>
    </AnimatedSection>
  );
}
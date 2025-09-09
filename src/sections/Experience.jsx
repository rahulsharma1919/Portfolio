import { useRef } from "react";
import AnimatedHeaderSection from "../components/AnimatedHeaderSection";
import { experiences } from "../constants";
import { useMediaQuery } from "react-responsive";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const Experience = () => {
  const text = `I build secure, high-performance full-stack apps
    with smooth UX to drive growth 
    not headaches.`;

  const expRefs = useRef([]);
  const isDesktop = useMediaQuery({ minWidth: "48rem" }); //768px

  useGSAP(() => {
    expRefs.current.forEach((el) => {
      if (!el) return;

      gsap.from(el, {
        y: 200,
        scrollTrigger: {
          trigger: el,
          start: "top 80%",
        },
        duration: 1,
        ease: "circ.out",
      });
    });
  }, []);

  return (
    <section id="experience" className="min-h-screen bg-black rounded-t-4xl">
      <AnimatedHeaderSection
        subTitle={"Behind the scene, Beyond the screen"}
        title={"Experience"}
        text={text}
        textColor={"text-white"}
        withScrollTrigger={true}
      />

      {experiences.map((exp, index) => (
        <div
          ref={(el) => (expRefs.current[index] = el)}
          key={index}
          className="sticky px-10 pt-6 pb-12 text-white bg-black border-t-2 border-white/30"
          style={
            isDesktop
              ? {
                  top: `calc(10vh + ${index * 5}em)`,
                  marginBottom: `${(experiences.length - index - 1) * 5}rem`,
                }
              : { top: 0 }
          }
        >
          <div className="flex flex-col gap-4 font-light">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
              <h2 className="text-3xl lg:text-4xl">{exp.title}</h2>
              <span className="text-lg text-white/50">{exp.date}</span>
            </div>

            <p className="text-xl font-semibold text-white/70">
              {exp.employer}
            </p>

            <ul className="flex flex-col gap-3 text-lg lg:text-xl text-white/80 list-disc list-inside">
              {exp.contents.map((point, pointIndex) => (
                <li key={`point-${index}-${pointIndex}`}>{point}</li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </section>
  );
};

export default Experience;

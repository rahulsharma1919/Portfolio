import { useRef } from "react";
import AnimatedHeaderSection from "../components/AnimatedHeaderSection";
import { AnimatedTextLines } from "../components/AnimatedTextLines";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Button from "../components/Button";

const About = () => {
  const text = `A Computer Science Engineer
    passionate about building scalable, efficient, and
    user-focused applications.`;

  const aboutText = `I bring a balance of strong technical skills and practical 
experience, crafting solutions that merge performance with 
creativity. My focus is always on writing clean, reliable code 
and delivering real impact.
💻 Skilled in React.js, Tailwind, Express.js, Python, C++, SQL/MySQL, 
Firebase, Git/GitHub & DSA — I love building clean, scalable apps.
🎮 Beyond code: gaming, adventurous books 📚, traveling ✈️, music 🎶, anime, 
and watch sci-fi 🚀, thriller 🔍, horror 👻 & comedy movies😂.  
🚀 Vision: grow as a Software Engineer, crafting impactful products that 
blend performance with creativity (and a little fun).`;

  const imgRef = useRef(null);

  useGSAP(() => {
    gsap.to("#about", {
      scale: 0.95,
      scrollTrigger: {
        trigger: "#about",
        start: "bottom 80%",
        end: "bottom 20%",
        scrub: true,
        markers: false,
      },
      ease: "power1.inOut",
    });

    gsap.set(imgRef.current, {
      clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0% 100%)",
    });
    gsap.to(imgRef.current, {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      duration: 2,
      ease: "power4.out",
      scrollTrigger: { trigger: imgRef.current },
    });
  });

  return (
    <section id="about" className="min-h-screen bg-black rounded-b-4xl">
      <AnimatedHeaderSection
        subTitle={"Code with purpose, Built to scale"}
        title={"About"}
        text={text}
        textColor={"text-white"}
        withScrollTrigger={true}
      />

      {/* Container for image and text */}
      <div className="flex flex-col items-center gap-10 px-10 pb-8 lg:flex-row lg:items-start">
        <img
          ref={imgRef}
          src="images/rahul.jpg"
          alt="man"
          className="w-md rounded-3xl"
        />
        <AnimatedTextLines
          text={aboutText}
          className="w-full text-white/60 text-xl font-light tracking-wide lg:text-3xl"
        />
      </div>

      {/* Button below the image-text container */}
      <div className="flex justify-center pb-16">
        <a
          href="./assets/docs/Rahul_Sharma SDE.pdf"
          download="Rahul_Sharma SDE.pdf"
          className="md:block text-white cursor-pointer"
        >
          <Button
            id="download-cv-button"
            containerClass="md:flex items-center justify-center gap-1 hover-animation"
          />
        </a>
      </div>
    </section>
  );
};

export default About;

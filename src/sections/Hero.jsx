import { Canvas } from "@react-three/fiber";
import { Planet } from "../components/Planet";
import { Environment, Float, Lightformer } from "@react-three/drei";
import { useMediaQuery } from "react-responsive";
import AnimatedHeaderSection from "../components/AnimatedHeaderSection";
import BinaryHover from "../components/BinaryHover";

const Hero = () => {
  const isMobile = useMediaQuery({ maxWidth: 853 });
  const text = `I help growing brands and startups gain an
unfair advantage through premium
results driven webs/apps`;
  const scrollToNext = () => {
    const nextSection = document.getElementById("services");
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: "smooth" });
    }
  };
  return (
    <section id="home" className="flex flex-col justify-end min-h-screen">
      <AnimatedHeaderSection
        subTitle={"404 No Bugs Found"}
        title={"Rahul Sharma"}
        text={text}
        textColor={"text-black"}
      />
      <figure
        className="absolute inset-0 -z-50"
        style={{ width: "100vw", height: "100vh" }}
      >
        <Canvas
          shadows
          camera={{ position: [0, 0, -10], fov: 17.5, near: 1, far: 20 }}
        >
          <ambientLight intensity={0.5} />
          <Float speed={0.5}>
            <Planet scale={isMobile ? 0.7 : 1} />
          </Float>
          <Environment resolution={256}>
            <group rotation={[-Math.PI / 3, 4, 1]}>
              <Lightformer
                form={"circle"}
                intensity={2}
                position={[0, 5, -9]}
                scale={10}
              />
              <Lightformer
                form={"circle"}
                intensity={2}
                position={[0, 3, 1]}
                scale={10}
              />
              <Lightformer
                form={"circle"}
                intensity={2}
                position={[-5, -1, -1]}
                scale={10}
              />
              <Lightformer
                form={"circle"}
                intensity={2}
                position={[10, 1, 0]}
                scale={16}
              />
            </group>
          </Environment>
        </Canvas>
      </figure>
      {/* Scroll down arrow */}
      <div
        onClick={scrollToNext}
        className="absolute bottom-5 left-8 flex items-center cursor-pointer"
      >
        <svg
          width="50"
          height="50"
          viewBox="0 0 24 24"
          fill="none"
          stroke="none"
          strokeWidth="1.5"
          className="relative"
        >
          <path d="M6 9l6 6 6-6" />
          <path d="M6 15l6 6 6-6" />
          <defs>
            <linearGradient id="shine" x1="0" y1="0" x2="0" y2="1">
              <stop offset="50%" stopColor="white" stopOpacity="0.9" />
            </linearGradient>
            <mask id="shine-mask">
              <rect x="0" y="0" width="100%" height="100%" fill="url(#shine)">
                <animateTransform
                  attributeName="transform"
                  type="translate"
                  values="0 -40; 0 40"
                  dur="2s"
                  repeatCount="indefinite"
                />
              </rect>
            </mask>
          </defs>
          <g mask="url(#shine-mask)">
            <path d="M6 9l6 6 6-6" stroke="#cfa355" strokeWidth="2" />
            <path d="M6 15l6 6 6-6" stroke="#cfa355" strokeWidth="2" />
          </g>
        </svg>
        <span className="text-black text-xl tracking-wide mt-3 transition-all ease-in-out cursor-pointer">
          <BinaryHover
            text="Scroll Down"
            className="text-black text-xl tracking-wide"
            hoverClassName="hover:text-black/50"
          />
        </span>
      </div>
    </section>
  );
};

export default Hero;

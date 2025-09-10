import React, { useEffect, useRef, useState } from "react";
import { socials } from "../constants";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Link } from "react-scroll";
import BinaryHover from "../components/BinaryHover";

const Navbar = () => {
  const navRef = useRef(null);
  const linksRef = useRef([]);
  const contactRef = useRef(null);
  const topLineRef = useRef(null);
  const bottomLineRef = useRef(null);
  const topNavbarRef = useRef(null); // 🔹 for horizontal navbar
  const tl = useRef(null);
  const iconTl = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [showBurger, setShowBurger] = useState(false); // start hidden
  const [dateTime, setDateTime] = useState({ time: "", date: "" });

  // GSAP setup for side menu + burger
  useGSAP(() => {
    gsap.set(navRef.current, { xPercent: 100 });
    gsap.set([linksRef.current, contactRef.current], {
      autoAlpha: 0,
      x: -20,
    });

    tl.current = gsap
      .timeline({ paused: true })
      .to(navRef.current, {
        xPercent: 0,
        duration: 1,
        ease: "power3.out",
      })
      .to(
        linksRef.current,
        {
          autoAlpha: 1,
          x: 0,
          stagger: 0.1,
          duration: 0.5,
          ease: "power2.out",
        },
        "<"
      )
      .to(
        contactRef.current,
        {
          autoAlpha: 1,
          x: 0,
          duration: 0.5,
          ease: "power2.out",
        },
        "<+0.2"
      );

    iconTl.current = gsap
      .timeline({ paused: true })
      .to(topLineRef.current, {
        rotate: 45,
        y: 3.3,
        duration: 0.3,
        ease: "power2.inOut",
      })
      .to(
        bottomLineRef.current,
        {
          rotate: -45,
          y: -3.3,
          duration: 0.3,
          ease: "power2.inOut",
        },
        "<"
      );
  }, []);

  // Scroll detection for switching nav
  useEffect(() => {
    let lastScrollY = window.scrollY;
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > 50) {
        // hide top navbar + show burger
        gsap.to(topNavbarRef.current, {
          y: -80,
          opacity: 0,
          duration: 0.5,
          ease: "power2.out",
        });
        setShowBurger(true);
      } else {
        // show top navbar again if at top
        gsap.to(topNavbarRef.current, {
          y: 0,
          opacity: 1,
          duration: 0.5,
          ease: "power2.out",
        });
        setShowBurger(false);
      }

      lastScrollY = currentScrollY;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => {
    if (isOpen) {
      tl.current.reverse();
      iconTl.current.reverse();
    } else {
      tl.current.play();
      iconTl.current.play();
    }
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();

      const time = now.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      });

      const date = now.toLocaleDateString([], {
        weekday: "short", // e.g. Mon
        year: "numeric",
        month: "short", // e.g. Sep
        day: "numeric",
      });

      setDateTime({ time, date });
    };

    updateDateTime();
    const interval = setInterval(updateDateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div
        ref={topNavbarRef}
        className="fixed top-0 left-0 w-full flex items-center justify-between px-10 py-4 text-black z-40"
      >
        <div className="text-xl font-amiamie font-medium">
          <a href="#">
            <BinaryHover
              text="Rahul Sharma"
              hoverClassName="hover:text-black/50 transition-colors duration-200"
            />
          </a>
        </div>

        <div className="absolute left-1/2 transform -translate-x-1/2 flex gap-8 uppercase text-md tracking-wider">
          {["home", "experience", "about", "project", "contact"].map(
            (section, i) => (
              <Link
                key={i}
                to={`${section}`}
                smooth
                duration={1000}
                className="cursor-pointer hover:text-black/50"
              >
                <BinaryHover
                  text={section}
                  className="uppercase text-sm"
                  hoverClassName="hover:text-black/50"
                />
              </Link>
            )
          )}
        </div>

        <div className="text-lg font-mono text-black/70">{dateTime.time}</div>
      </div>

      <nav
        ref={navRef}
        className="fixed z-50 flex flex-col justify-between w-full h-full px-7 uppercase bg-black text-white/80 py-20 gap-y-10 md:w-1/2 md:left-1/2"
        style={{
          clipPath: "polygon(0 0, 100% 0, 100% 100%, 3% 100%, 3% 85%, 0 82%)",
        }}
      >
        <div className="flex flex-col -mt-8">
          <span className="text-lg font-mono tracking-widest text-white/70">
            {dateTime.time}
          </span>
          <span className="text-2xl font-semibold font-mono tracking-wide text-white/90 mt-1">
            {dateTime.date}
          </span>
        </div>
        <div className="flex flex-col text-4xl gap-y-2 md:text-5xl lg:text-6xl">
          {["home", "experience", "about", "project", "contact"].map(
            (section, index) => (
              <div key={index} ref={(el) => (linksRef.current[index] = el)}>
                <Link
                  className="transition-all duration-300 cursor-pointer hover:text-white"
                  to={`${section}`}
                  smooth
                  offset={0}
                  duration={2000}
                >
                  {section}
                </Link>
              </div>
            )
          )}
        </div>
        <div
          ref={contactRef}
          className="flex flex-col flex-wrap mt-15 justify-between gap-8 md:flex-row"
        >
          <div className="font-light ml-3">
            <p className="tracking-wider text-md text-white/50">E-mail</p>
            <a href="mailto:rahul1sharma1919@gmail.com">
              <p className="text-[12px] tracking-widest lowercase text-pretty hover:text-white">
                rahul1sharma1919@gmail.com
              </p>
            </a>
          </div>
          <div className="font-light">
            <p className="tracking-wider text-md text-white/50">Social Media</p>
            <div className="flex flex-col flex-wrap md:flex-row gap-x-1">
              {socials.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className="text-[11px] leading-loose tracking-widest uppercase hover:text-white transition-colors duration-300"
                >
                  {"{ "}
                  {social.name}
                  {" }"}
                </a>
              ))}
            </div>
          </div>
        </div>
      </nav>

      <div
        className="fixed z-50 flex flex-col items-center justify-center gap-1 transition-all duration-300 bg-black rounded-full cursor-pointer w-10 h-10 md:w-14 md:h-14 top-4 right-10"
        onClick={toggleMenu}
        style={
          showBurger
            ? { clipPath: "circle(50% at 50% 50%)" }
            : { clipPath: "circle(0% at 50% 50%)" }
        }
      >
        <span
          ref={topLineRef}
          className="block w-6 h-0.5 bg-white rounded-full origin-center"
        ></span>
        <span
          ref={bottomLineRef}
          className="block w-6 h-0.5 bg-white rounded-full origin-center"
        ></span>
      </div>
    </>
  );
};

export default Navbar;

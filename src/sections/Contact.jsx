import { useGSAP } from "@gsap/react";
import AnimatedHeaderSection from "../components/AnimatedHeaderSection";
import Marquee from "../components/Marquee";
import { socials } from "../constants";
import gsap from "gsap";
import { useState } from "react";
import emailjs from "@emailjs/browser";
import Alert from "../components/Alert";
import BinaryHover from "../components/BinaryHover";
import StatefulButton from "../components/StatefulButton";

const Contact = () => {
  const text = `Got a question, how or project Idea?
    WE’D love to hear from you and discus further!`;
  const items = [
    "just imagin, I code",
    "just imagin, I code",
    "just imagin, I code",
    "just imagin, I code",
    "just imagin, I code",
  ];

  // ✨ Email logic
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState("idle"); // "idle" | "success" | "error"

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setStatus("idle");

    try {
      await emailjs.send(
        "service_fu4hhiy",
        "template_qoelemu",
        {
          from_name: formData.name,
          to_name: "Rahul",
          from_email: formData.email,
          to_email: "rahul1sharma1919@gmail.com",
          message: formData.message,
        },
        "bo8p3mH6NAAiXE7Zp"
      );

      setStatus("success");
      setFormData({ name: "", email: "", message: "" });

      // reset button after delay
      setTimeout(() => setStatus("idle"), 3000);
    } catch (error) {
      console.error("Error sending message:", error);
      setStatus("error");
      setTimeout(() => setStatus("idle"), 3000);
    } finally {
      setIsLoading(false);
    }
  };

  useGSAP(() => {
    gsap.from(".social-link", {
      y: 100,
      opacity: 0,
      delay: 0.5,
      duration: 1,
      stagger: 0.3,
      ease: "back.out",
      scrollTrigger: {
        trigger: ".social-link",
      },
    });
  }, []);

  return (
    <section
      id="contact"
      className="flex flex-col justify-between min-h-screen bg-black"
    >
      <div>
        <AnimatedHeaderSection
          subTitle={"You Dream It, I Code it"}
          title={"Contact"}
          text={text}
          textColor={"text-white"}
          withScrollTrigger={true}
        />

        <div className="flex flex-col lg:flex-row px-10 font-light text-white uppercase lg:text-[32px] text-[26px] leading-none mb-10 gap-10">
          {/* Left: Contact Info */}
          <div className="flex flex-col w-full gap-10 lg:w-1/2">
            <div className="social-link">
              <h2>E-mail</h2>
              <div className="w-full h-px my-2 bg-white/30" />
              <a href="mailto:rahul1sharma1919@gmail.com">
                <p className="text-xl tracking-wider lowercase md:text-2xl lg:text-3xl hover:text-white/80 transition-colors duration-200">
                  rahul1sharma1919@gmail.com
                </p>
              </a>
            </div>
            <div className="social-link">
              <h2>Phone</h2>
              <div className="w-full h-px my-2 bg-white/30" />
              <a href="tel:+91-955488377">
                <p className="text-xl lowercase md:text-2xl lg:text-3xl hover:text-white/80 transition-colors duration-200">
                  +91 95548 88377
                </p>
              </a>
            </div>
            <div className="social-link">
              <h2>Social Media</h2>
              <div className="w-full h-px my-2 bg-white/30" />
              <div className="flex flex-wrap gap-2">
                {socials.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    className="text-xs leading-loose tracking-wides uppercase md:text-sm hover:text-white/80 transition-colors duration-200"
                  >
                    {"{ "}
                    {social.name}
                    {" }"}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Form */}
          <div className="w-full lg:w-1/2">
            <form
              onSubmit={handleSubmit}
              className="flex flex-col gap-5 text-white tracking-wide"
            >
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Sweet Tooth"
                value={formData.name}
                onChange={handleChange}
                required
                autoComplete="name"
                className="bg-black border-b border-white/40 px-4 py-3 focus:outline-none focus:border focus:border-white transition-all duration-300 text-base tracking-widest"
              />
              <input
                type="email"
                id="email"
                name="email"
                placeholder="marcus-kane@twistedmetal.com"
                value={formData.email}
                onChange={handleChange}
                required
                autoComplete="email"
                className="bg-black border-b border-white/40 px-4 py-3 focus:outline-none focus:border focus:border-white transition-all duration-300 text-base tracking-widest"
              />
              <textarea
                name="message"
                placeholder="Ready for action !"
                rows="4"
                type="text"
                id="message"
                value={formData.message}
                onChange={handleChange}
                className="bg-black border border-white/40 px-4 py-3 focus:outline-none focus:border-white text-base tracking-widest"
                required
                autoComplete="message"
              />
              <StatefulButton isLoading={isLoading} status={status} />
            </form>
          </div>
        </div>
      </div>

      <Marquee items={items} className="text-white bg-transparent" />
    </section>
  );
};

export default Contact;

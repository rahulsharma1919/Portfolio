import React, { useState, useRef } from "react";

const BinaryHover = ({ text, className, hoverClassName }) => {
  const [displayText, setDisplayText] = useState(text);
  const intervalRef = useRef(null);

  const scrambleText = (original, iterations = 4, onFinish) => {
    // fewer iterations for faster flicker
    let count = 0;
    const chars = original.split("");
    clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      const scrambled = chars
        .map((c) => (c === " " ? " " : Math.random() > 0.5 ? "1" : "0"))
        .join("");
      setDisplayText(scrambled);

      count++;
      if (count >= iterations) {
        clearInterval(intervalRef.current);
        if (onFinish) onFinish();
      }
    }, 30); // faster interval
  };

  const revealText = (original, direction = "ltr") => {
    const chars = original.split("");
    let index = direction === "ltr" ? 0 : chars.length - 1;

    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setDisplayText((prev) =>
        prev
          .split("")
          .map((c, i) => {
            if (direction === "ltr" && i <= index) return chars[i];
            if (direction === "rtl" && i >= index) return chars[i];
            return c;
          })
          .join("")
      );

      if (direction === "ltr") index++;
      else index--;

      if (
        (direction === "ltr" && index >= chars.length) ||
        (direction === "rtl" && index < 0)
      ) {
        clearInterval(intervalRef.current);
      }
    }, 40); // faster per-letter reveal
  };

  const handleMouseEnter = () => {
    scrambleText(text, 4, () => revealText(text, "ltr"));
  };

  const handleMouseLeave = () => {
    scrambleText(text, 4, () => revealText(text, "rtl"));
  };

  return (
    <span
      className={`${className} ${hoverClassName || ""} cursor-pointer`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {displayText}
    </span>
  );
};

export default BinaryHover;

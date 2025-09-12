import { twMerge } from "tailwind-merge";
import { Icon } from "@iconify/react/dist/iconify.js";

const Button = ({ className, ...props }, ref) => {
  return (
    <button
      ref={ref}
      className={twMerge(
        "group relative w-auto overflow-hidden border bg-background py-2 px-4 text-sm sm:py-2.5 sm:px-6 sm:text-base md:py-3 md:px-8 md:text-lg lg:py-4 lg:px-8 lg:text-xl font-medium",
        className
      )}
      {...props}
    >
      <div className="flex items-center gap-2 sm:gap-3 md:gap-4">
        <div className="h-3 w-3 rounded-full bg-white transition-all duration-300 group-hover:scale-[100.8]" />
        <span className="inline-block transition-all duration-300 group-hover:translate-x-10 group-hover:opacity-0">
          Download CV
        </span>
      </div>
      <div className="cursor-pointer absolute top-0 z-10 flex h-full w-full translate-x-12 items-center justify-center gap-1 text-black opacity-0 transition-all duration-300 group-hover:-translate-x-7 group-hover:opacity-100">
        <span>Download CV</span>
        <Icon
          icon="lucide:download"
          className="size-5 sm:size-6 md:size-7 lg:size-8"
        />
      </div>
    </button>
  );
};

export default Button;

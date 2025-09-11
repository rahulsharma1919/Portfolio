import { Icon } from "@iconify/react";
import { motion, AnimatePresence } from "framer-motion";

const StatefulButton = ({ isLoading, status }) => {
  // status: "idle" | "success" | "error"
  const getButtonStyle = () => {
    switch (status) {
      case "success":
        return "bg-green-600 text-white border-green-600";
      case "error":
        return "bg-red-600 text-white border-red-600";
      default:
        return "bg-black text-white border border-white/60 hover:bg-white hover:text-black";
    }
  };

  return (
    <motion.button
      type="submit"
      disabled={isLoading}
      className={`w-full py-3 tracking-widest uppercase relative overflow-hidden transition-colors duration-300 flex items-center justify-center gap-2 cursor-pointer ${getButtonStyle()}`}
      layout
    >
      <AnimatePresence mode="wait">
        {isLoading ? (
          <motion.span
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex items-center gap-2"
          >
            <motion.div
              key="spinner"
              initial={{ rotate: 0 }}
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
            >
              <Icon icon="mdi:loading" className="w-5 h-5" />
            </motion.div>
            Sending...
          </motion.span>
        ) : status === "success" ? (
          <motion.span
            key="success"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="flex items-center gap-2"
          >
            <motion.div
              key="tick"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 15 }}
            >
              <Icon icon="charm:circle-tick" className="w-6 h-6" />
            </motion.div>
            Message Sent
          </motion.span>
        ) : status === "error" ? (
          <motion.span
            key="error"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="flex items-center gap-2"
          >
            <motion.div
              key="tick"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 15 }}
            >
              <Icon icon="mdi:close" className="w-5 h-5" />
            </motion.div>
            Message Not Sent
          </motion.span>
        ) : (
          <motion.span
            key="idle"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            Send
          </motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  );
};

export default StatefulButton;

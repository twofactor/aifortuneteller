import React, { useState } from "react";
import { motion } from "framer-motion";
// import { MicrophoneIcon, XIcon } from "@heroicons/react/24/solid";

const MicrophoneButton = ({ onClick, recording }) => {
  const variants = {
    hover: { scale: 1.1 },
    pressed: { scale: 0.95 },
    recording: { scale: [1, 1.1, 1] },
    notRecording: { scale: 1 },
  };

  const pulseTransition = {
    duration: 2,
    repeat: Infinity,
  };

  return (
    <motion.div
      className="flex items-center justify-center bg-blue-500 hover:bg-blue-700 text-white font-bold rounded w-12 h-12 cursor-pointer"
      initial="notRecording"
      animate={recording ? "recording" : "notRecording"}
      whileHover={recording ? undefined : "hover"}
      whileTap="pressed"
      onClick={onClick}
      variants={variants}
      transition={recording ? pulseTransition : {}}
    >
      {recording ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z"
          />
        </svg>
      )}
    </motion.div>
  );
};

export default MicrophoneButton;

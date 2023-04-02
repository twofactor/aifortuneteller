import React, { useState } from "react";
import { motion } from "framer-motion";
// import { MicrophoneIcon, XIcon } from "@heroicons/react/24/solid";
import {
  Box,
  Button,
  Input,
  ListItem,
  UnorderedList,
  useColorModeValue,
} from "@chakra-ui/react";

const MicrophoneButton = ({ onClick, recording }) => {
  const variants = {
    hover: { scale: 1.1 },
    pressed: { scale: 0.95 },
    recording: { scale: [1, 1.05, 1] },
    notRecording: { scale: 1 },
  };

  const pulseTransition = {
    duration: 2,
    repeat: Infinity,
  };

  return (
    <motion.div
      initial="notRecording"
      animate={recording ? "recording" : "notRecording"}
      whileHover={recording ? undefined : "hover"}
      whileTap="pressed"
      onClick={onClick}
      variants={variants}
      transition={recording ? pulseTransition : {}}
    >
      <Button
        cursor="pointer"
        backgroundColor="rgba(255, 167, 36, 0.15)"
        border="0.5px solid rgba(255, 210, 0, 0.1)"
        boxShadow="0px 1px 6px rgba(255, 165, 0, 0.1)"
        backdropFilter="blur(6px)"
        borderRadius={0}
        paddingLeft="6"
        paddingRight="6"
        color={"#FFC266"}
        textShadow="0px 0px 3px rgba(255, 167, 36, 0.5)"
        transition="background 0.2s ease-in-out, color 0.2s ease-in-out, border 0.2s ease-in-out, box-shadow 0.2s ease-in-out"
        _hover={{
          backgroundColor: "rgba(255, 167, 36, 0.2)",
          border: "0.5px solid rgba(255, 210, 0, 0.2)",
          boxShadow: "0px 1px 6px rgba(255, 165, 0, 0.12)",
        }}
      >
        {recording ? "Listening... click to stop" : "Speak"}
      </Button>
    </motion.div>
  );
};

export default MicrophoneButton;

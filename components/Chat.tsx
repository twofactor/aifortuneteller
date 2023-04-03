import { useState, useRef, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Box,
  Button,
  Input,
  Textarea,
  ListItem,
  UnorderedList,
  useColorModeValue,
} from "@chakra-ui/react";
import { Be_Vietnam_Pro } from "next/font/google";
import { Space_Mono } from "next/font/google";
import useSound from "use-sound";

const spacemono = Space_Mono({
  weight: "400",
  subsets: ["latin"],
});

interface ChatProps {
  messages: Message[];
  addMessage: (message: Message) => void;
  height?: any;
  width?: any;
}

interface Message {
  id: number;
  role: "user" | "assistant" | "system";
  content: string;
  loading?: boolean;
}

export default function Chat({
  messages,
  addMessage,
  height = "400px",
  width = "300px",
}: ChatProps) {
  const [inputValue, setInputValue] = useState("");
  const chatBoxRef = useRef<HTMLDivElement>(null);
  const hiddenMessageRef = useRef<HTMLDivElement>(null);
  const [playButton] = useSound("/button.m4a");
  const [playButton5] = useSound("/button5.m4a");
  const [playExpand] = useSound("/expand.m4a");
  const [playCollapse] = useSound("/collapse.m4a");

  useEffect(() => {
    if (chatBoxRef.current) {
      const isAtBottom =
        chatBoxRef.current.scrollHeight - chatBoxRef.current.scrollTop <=
        chatBoxRef.current.clientHeight + 1;

      if (isAtBottom || messages[messages.length - 1].role === "user") {
        chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
      } else if (messages[messages.length - 1].role === "assistant") {
        if (chatBoxRef.current.scrollTop !== 0) {
        }
      }
    }
  }, [messages]);

  function handleScroll() {
    if (chatBoxRef.current) {
      const isAtBottom = chatBoxRef.current.scrollTop === 0;

      if (isAtBottom) {
      }
    }
  }

  function sendMessage() {
    hiddenMessageRef.current
      ? (hiddenMessageRef.current.style.zIndex = "2")
      : null;
    let newId = messages.length
      ? Math.max(...messages.map((m) => m.id)) + 1
      : 1;
    let newMessage: Message = {
      id: newId,
      role: "user",
      content: inputValue,
    };

    if (inputValue !== "" && messages[messages.length - 1].role !== "user") {
      setInputValue("");
      addMessage(newMessage);
      playButton();
      playExpand();
    }
  }

  useEffect(() => {
    if (messages[messages.length - 1].role === "assistant") {
      playCollapse();
    }
  }, [messages, playCollapse]);

  function addMessageThem() {
    let newId = messages.length
      ? Math.max(...messages.map((m) => m.id)) + 1
      : 1;
    let newMessage: Message = {
      id: newId,
      role: "assistant",
      content:
        "That's great! Thanks for sharing. It's always a pleasure to talk to you.",
    };

    addMessage(newMessage);
  }

  function handleInputChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setInputValue(e.target.value);
  }

  function handleKeyPress(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && inputValue) {
      e.preventDefault(); // Prevents the default behavior of adding a newline
      sendMessage();
    }
  }

  const bg = useColorModeValue("white", "gray.900");

  return (
    <Box p="1">
      <AnimatePresence initial={false} mode="popLayout">
        <Box
          className={spacemono.className}
          h={"320px"}
          w={"100%"}
          position="relative"
          display="flex"
          flexDirection={"column"}
        >
          <Box
            ref={chatBoxRef}
            onScroll={handleScroll}
            overflowY="auto"
            display="flex"
            flexDirection="column-reverse"
            h="100%"
            w="100%"
            // p="8px"
            paddingBottom="16px"
            boxSizing="border-box"
            css={{
              "&::-webkit-scrollbar": {
                backgroundColor: "transparent",
                width: "0px",
              },
              "&::-webkit-scrollbar-track": {
                width: "0px",
              },
              "&::-webkit-scrollbar-thumb": {
                // background: "blue",
                color: "blue",
                borderRadius: "0px",
                width: "3px",
              },
            }}
          >
            {/* {inputValue ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                layoutId={"MessageID: " + (messages.length + 1)}
                className={`${beVietnamPro.className}`}
                ref={hiddenMessageRef}
              >
                <Box opacity="0" left="0" position="absolute">
                  {inputValue}
                </Box>
              </motion.div>
            ) : null} */}
            <Box flexGrow={1}></Box>
            <UnorderedList
              styleType="none"
              paddingLeft="0"
              paddingBottom="8px"
              margin="0"
            >
              <AnimatePresence initial={false} mode="sync">
                {messages
                  .filter((message) => message.role !== "system")
                  .map((message) => (
                    <motion.li
                      layout
                      initial={{
                        opacity: 0,
                        scale: 0.8,
                        y: 30,
                      }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      transition={{
                        opacity: { duration: 0.2 },
                        type: "spring",
                        bounce: 0.12,
                        duration: 0.7,
                        layout: {
                          type: "spring",
                          bounce: 0.12,
                          duration: 0.6,
                        },
                      }}
                      style={{
                        originX: message.role === "user" ? 1 : 0,
                        originY: message.role === "user" ? 2 : 1,
                      }}
                      key={message.id}
                      // whileTap={{
                      //   scale: 0.95,
                      //   //   originX: 0.5,
                      //   originY: 0.5,
                      // }}
                      // layoutId={
                      //   message.user === "me"
                      //     ? "MessageID: " + message.id
                      //     : undefined
                      // }
                    >
                      <Box padding="3px 0" display="flex">
                        <Box
                          className={`${spacemono.className}`}
                          padding="10px 14px"
                          background={
                            message.role === "user"
                              ? "rgba(255, 167, 36, 0.1)"
                              : "rgba(0, 0, 0, 0.2)"
                          }
                          border={
                            message.role === "user"
                              ? "0.5px solid rgba(255, 210, 0, 0.1)"
                              : "0.5px solid rgba(255, 194, 102, 0.2)"
                          }
                          boxShadow={
                            message.role === "user"
                              ? "0px 1px 6px rgba(255, 165, 0, 0.1)"
                              : "0px 1px 6px rgba(255, 165, 0, 0.12)"
                          }
                          backdropFilter="blur(6px)"
                          color={"#FFC266"}
                          textShadow="0px 0px 3px rgba(255, 167, 36, 0.5)"
                          marginLeft={message.role === "user" ? "auto" : "0"}
                          maxWidth="90%"
                          marginRight={
                            message.role === "assistant" ? "auto" : "0"
                          }
                        >
                          <motion.span>{message.content}</motion.span>
                        </Box>
                      </Box>
                    </motion.li>
                  ))}
              </AnimatePresence>
            </UnorderedList>
          </Box>
          <Box
            display="flex"
            position="relative"
            alignItems="center"
            width="100%"
            boxSizing="border-box"
          >
            <Textarea
              value={inputValue}
              resize={"vertical"}
              onChange={handleInputChange}
              onKeyPress={handleKeyPress}
              className={spacemono.className}
              placeholder="Say something..."
              flexGrow={1}
              minHeight={"64px"}
              padding="8px 64px 8px 14px"
              backgroundColor="rgba(0, 0, 0, 0.2)"
              border="0.5px solid rgba(255, 194, 102, 0.2)"
              boxShadow="0px 1px 6px rgba(255, 165, 0, 0.12)"
              backdropFilter="blur(6px)"
              zIndex="1"
              color={"#FFC266"}
              textShadow="0px 0px 3px rgba(255, 167, 36, 0.5)"
              borderRadius={0}
              _hover={{
                outline: "none",
                border: "0.5px solid rgba(255, 194, 102, 0.3)",
              }}
              _focus={{
                outline: "none",
                border: "0.5px solid rgba(255, 194, 102, 0.4)",
                boxShadow: "none",
              }}
              _placeholder={{
                color: "rgba(255, 194, 102, 0.4)",
              }}
              // onMouseEnter={() => {
              //   playButton5();
              // }}
            />
            <Button
              onClick={sendMessage}
              disabled={!inputValue.trim()}
              height="28px"
              width="28px"
              position="absolute"
              right="7px"
              zIndex="3"
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
              _active={{
                backgroundColor: "rgba(255, 167, 36, 0.1)",
                border: "0.5px solid rgba(255, 210, 0, 0.1)",
                boxShadow: "0px 1px 6px rgba(255, 165, 0, 0.1)",
              }}
              // onMouseEnter={() => {
              //   playButton5();
              // }}
            >
              Send
            </Button>
          </Box>
        </Box>
      </AnimatePresence>
      {/* <Button onClick={() => addMessageThem()}>Generate New Message</Button> */}
    </Box>
  );
}

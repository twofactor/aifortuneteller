import { useState, useRef, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Box,
  Button,
  Input,
  ListItem,
  UnorderedList,
  useColorModeValue,
} from "@chakra-ui/react";
import { Be_Vietnam_Pro } from "next/font/google";

const beVietnamPro = Be_Vietnam_Pro({
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

    setInputValue("");
    addMessage(newMessage);
  }

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

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    setInputValue(e.target.value);
  }

  function handleKeyPress(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter" && inputValue) {
      sendMessage();
    }
  }

  const bg = useColorModeValue("white", "gray.900");

  return (
    <Box>
      <AnimatePresence initial={false} mode="popLayout">
        <Box
          className={beVietnamPro.className}
          h={height}
          w={width}
          position="relative"
        >
          <Box
            ref={chatBoxRef}
            onScroll={handleScroll}
            overflowY="auto"
            display="flex"
            flexDirection="column-reverse"
            h="100%"
            w="100%"
            p="8px"
            paddingBottom="16px"
            boxSizing="border-box"
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
                          className={`${beVietnamPro.className}`}
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
            <Input
              type="text"
              value={inputValue}
              onChange={handleInputChange}
              onKeyPress={handleKeyPress}
              className={beVietnamPro.className}
              placeholder="Say something..."
              flexGrow={1}
              padding="12px 14px"
              background="white"
              border="0.5px solid rgba(0, 0, 0, 0.16)"
              boxShadow="0px 1px 2px rgba(34, 2, 85, 0.05)"
              borderRadius="20px"
              zIndex="1"
              color="black"
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
              background="linear-gradient(180deg, #5e10dc 0%, #7a24e7 100%)"
              border="none"
              boxShadow="0px 2px 4px rgba(60, 8, 143, 0.08)"
              borderRadius="16px"
              color="white"
              transition="background 0.2s ease-in-out, color 0.2s ease-in-out, border 0.2s ease-in-out, box-shadow 0.2s ease-in-out"
              _disabled={{
                background: "linear-gradient(0deg, #acacac 0%, #757575 100%)",
                cursor: "default",
                border: "none",
                boxShadow:
                  "0px 2px 4px rgba(60, 8, 143, 0.08), inset 0px 0px 0px 0.5px rgba(0, 0, 0, 0.25)",
                color: "rgba(255, 255, 255, 0.5)",
              }}
            >
              <Box
                as="svg"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                paddingLeft="1px"
              >
                <path d="M3.105 2.289a.75.75 0 00-.826.95l1.414 4.925A1.5 1.5 0 005.135 9.25h6.115a.75.75 0 010 1.5H5.135a1.5 1.5 0 00-1.442 1.086l-1.414 4.926a.75.75 0 00.826.95 28.896 28.896 0 0015.293-7.154.75.75 0 000-1.115A28.897 28.897 0 003.105 2.289z" />
              </Box>
            </Button>
          </Box>
        </Box>
      </AnimatePresence>
      <Button onClick={() => addMessageThem()}>Generate New Message</Button>
    </Box>
  );
}

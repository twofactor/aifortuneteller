import { useState, useRef, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";

export interface Message {
  id: number;
  user: "me" | "them";
  text: string;
}

interface ChatProps {
  messages: Message[];
  addMessage: (message: string) => void;
  inputOverlay?: string;
}

const seeds: Message[] = [
  { id: 1, user: "me", text: "gggg" },
  { id: 2, user: "them", text: "swag" },
  { id: 3, user: "me", text: "yo" },
];

const seedsWithUpdatedIds = seeds.map((seed, i) => ({ ...seed, id: i + 1 }));

export default function Chat({
  messages,
  addMessage,
  inputOverlay,
}: ChatProps) {
  // const [messages, setMessages] = useState<Message[]>(seedsWithUpdatedIds);
  const [showNewMessagesButton, setShowNewMessagesButton] = useState(false);
  const [lastChangedIndex, setLastChangedIndex] = useState<number | null>(null);
  const [inputValue, setInputValue] = useState("");
  const chatBoxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatBoxRef.current) {
      const isAtBottom =
        chatBoxRef.current.scrollHeight - chatBoxRef.current.scrollTop <=
        chatBoxRef.current.clientHeight + 1;

      if (isAtBottom || messages[messages.length - 1].user === "me") {
        chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
        setShowNewMessagesButton(false);
      } else if (messages[messages.length - 1].user === "them") {
        if (chatBoxRef.current.scrollTop !== 0) {
          setShowNewMessagesButton(true);
        }
      }
    }
  }, [messages]);

  function handleScroll() {
    if (chatBoxRef.current) {
      const isAtBottom = chatBoxRef.current.scrollTop === 0;

      if (isAtBottom) {
        setShowNewMessagesButton(false);
      }
    }
  }

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    setInputValue(e.target.value);
  }

  function handleKeyPress(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      addMessage(inputValue);
      setInputValue("");
    }
  }

  let animatingMessages = messages.slice(lastChangedIndex || 0);

  return (
    <>
      {showNewMessagesButton && (
        <button
          onClick={() => {
            if (chatBoxRef.current) {
              chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
            }
          }}
          className="bg-blue-500 text-white font-bold py-2 px-4 rounded"
        >
          New Messages
        </button>
      )}
      <div>
        <div
          ref={chatBoxRef}
          onScroll={handleScroll}
          // height of 300ish px, 1px solid gray border
          className="overflow-y-scroll flex flex-col-reverse h-96 w-96"
        >
          <ul className="space-y-2">
            <AnimatePresence initial={false} mode="popLayout">
              {messages.map((message) => (
                <motion.li
                  layout
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{
                    opacity: { duration: 0.2 },
                    layout: {
                      type: "spring",
                      bounce: 0.4,
                      duration: lastChangedIndex
                        ? animatingMessages.indexOf(message) * 0.15 + 0.85
                        : 1,
                    },
                  }}
                  style={{
                    originX: message.user === "me" ? 1 : 0,
                  }}
                  key={message.id}
                >
                  <div className="flex">
                    <div
                      className={`px-4 py-2 rounded-lg max-w-xs
                     
                      ${
                        message.user === "me"
                          ? "bg-blue-500 text-white text-right ml-auto"
                          : "bg-gray-200 text-gray-900 text-left mr-auto"
                      }`}
                    >
                      {message.text}
                    </div>
                  </div>
                </motion.li>
              ))}
            </AnimatePresence>
          </ul>
        </div>
        <div className="flex items-center mt-4 w-96">
          <input
            type="text"
            value={inputOverlay ? inputOverlay : inputValue}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
            className="border border-gray-300 rounded-lg w-full px-4 py-2"
            // placeholder={inputOverlay ? inputOverlay : "Write a message"}
          />
          <button
            onClick={() => {
              addMessage(inputValue);
              setInputValue("");
            }}
            disabled={!inputValue.trim()}
            className={`text-white font-bold py-2 px-4 rounded-lg ml-2 ${
              !inputValue.trim()
                ? "bg-gray-300"
                : "bg-blue-500 hover:bg-blue-400 active:bg-blue-600"
            }`}
          >
            Send
          </button>
        </div>
      </div>
    </>
  );
}

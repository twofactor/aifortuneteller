import Chat from "../components/Chat";
import { Flex, Box, Text } from "@chakra-ui/react";
import { useState, useRef, useEffect, useCallback } from "react";

interface Message {
  id: number;
  role: "user" | "assistant" | "system";
  content: string;
  loading?: boolean;
}

export default function TestChat() {
  const [messages, setMessages] = useState<Message[]>([]);

  const fetchChatGptResponse = useCallback(
    async (currentMessages: Message[]) => {
      const apiUrl = "/api/chatgpt";

      try {
        const requestBody = {
          model: "gpt-3.5-turbo",
          messages: currentMessages.map((message) => {
            return { role: message.role, content: message.content };
          }),
        };

        const response = await fetch(apiUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestBody),
        });

        if (!response.ok) {
          throw new Error(`API request failed: ${response.status}`);
        }

        const responseData = await response.json();
        const chatGptResponse = responseData.choices[0].message.content;

        return chatGptResponse;
      } catch (error) {
        console.log(error);
      }
    },
    []
  );

  useEffect(() => {
    if (messages.length > 0 && messages[messages.length - 1].role === "user") {
      const getGptResponse = async () => {
        const response = await fetchChatGptResponse(messages);
        if (response) {
          setMessages([
            ...messages,
            { id: Date.now(), role: "assistant", content: response },
          ]);
        }
      };
      getGptResponse();
    }
  }, [messages, fetchChatGptResponse]);

  const addMessage = async (newMessage: Message) => {
    setMessages([...messages, newMessage]);
  };

  return (
    <Flex>
      <Chat messages={messages} addMessage={addMessage} />
    </Flex>
  );
}

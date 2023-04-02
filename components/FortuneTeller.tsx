import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  background,
  Text,
  Button,
} from "@chakra-ui/react";
import { useState, useRef, useEffect, useCallback } from "react";
import Chat from "../components/Chat";

import Audio from "../components/Audio";

import { Space_Mono } from "next/font/google";

const spacemono = Space_Mono({
  weight: "400",
  subsets: ["latin"],
});

interface Message {
  id: number;
  role: "user" | "assistant" | "system";
  content: string;
  loading?: boolean;
}

const seed: Message[] = [
  {
    id: 1,
    role: "system",
    content:
      "you are a fortune telling kirby. answer questions with your powers, and don't forget to say 'poyo'! be concise as possible, and don't use full sentences or fluff. and use only lowercase!! be fun!!! and happi",
  },
  {
    id: 2,
    role: "assistant",
    content: "poyo! what do you want to know?",
  },
];

const FortuneTeller = () => {
  const [messages, setMessages] = useState<Message[]>(seed);

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
    <Tabs variant="unstyled" className={spacemono.className}>
      <TabList>
        <Tab
          width="50%"
          backgroundColor="rgba(0, 0, 0, 0.2)"
          border="0.5px solid rgba(255, 194, 102, 0.2)"
          borderRight="0px"
          boxShadow="0px 1px 6px rgba(255, 165, 0, 0.12)"
          backdropFilter="blur(6px)"
          _selected={{
            backgroundColor: "rgba(255, 167, 36, 0.1)",
            border: "0.5px solid rgba(255, 210, 0, 0.1)",
            boxShadow: "0px 1px 6px rgba(255, 165, 0, 0.1)",
            backdropFilter: "blur(6px)",
          }}
        >
          <Text
            color={"#FFC266"}
            textShadow="0px 0px 3px rgba(255, 167, 36, 0.5)"
          >
            Speak
          </Text>
        </Tab>
        <Tab
          width="50%"
          backgroundColor="rgba(0, 0, 0, 0.2)"
          border="0.5px solid rgba(255, 194, 102, 0.2)"
          boxShadow="0px 1px 6px rgba(255, 165, 0, 0.12)"
          borderLeft="0px"
          backdropFilter="blur(6px)"
          _selected={{
            backgroundColor: "rgba(255, 167, 36, 0.1)",
            border: "0.5px solid rgba(255, 210, 0, 0.1)",
            boxShadow: "0px 1px 6px rgba(255, 165, 0, 0.1)",
            backdropFilter: "blur(6px)",
          }}
        >
          <Text
            color={"#FFC266"}
            textShadow="0px 0px 3px rgba(255, 167, 36, 0.5)"
          >
            Text
          </Text>
        </Tab>
      </TabList>
      <TabPanels
        marginTop="8px"
        backgroundColor="rgba(0, 0, 0, 0.2)"
        border="0.5px solid rgba(255, 194, 102, 0.2)"
        boxShadow="0px 1px 6px rgba(255, 165, 0, 0.12)"
      >
        <TabPanel
          display="flex"
          flexDirection={"column"}
          alignItems="center"
          justifyContent="center"
        >
          <Button
            backgroundColor="rgba(255, 167, 36, 0.1)"
            border="0.5px solid rgba(255, 210, 0, 0.1)"
            boxShadow="0px 1px 6px rgba(255, 165, 0, 0.1)"
            backdropFilter="blur(6px)"
            color={"#FFC266"}
            textShadow="0px 0px 3px rgba(255, 167, 36, 0.5)"
            borderRadius={0}
          >
            Speak
          </Button>
          <Audio fetchChatGptResponse={fetchChatGptResponse} />
        </TabPanel>
        <TabPanel maxHeight={"100%"}>
          <Chat messages={messages} addMessage={addMessage} />
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};

export default FortuneTeller;

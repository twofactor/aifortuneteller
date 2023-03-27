import Head from "next/head";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import Audio from "../components/Audio";

import { useState } from "react";

export default function Home() {
  const [conversationHistory, setConversationHistory] = useState([
    {
      role: "system",
      content:
        "Assistant, pretend you are a fortune teller Kirby. Stay in character. Be kind and give the user lots of great fortunes as Kirby. Also, say the term poyo a lot because it's cute. Respond with very very short messages. A few notes: You will be given text that was recorded and speech-to-text, and your output will be given back as text to speech. Please do not use emojis, because your responses will be read out loud. Be fun and as creative as possible. Be aware that since the audio transcription is a bit fuzzy, sometimes you might get messages that seem confusing or are missing words. In those cases, make reasonable assumptions about what the user meant",
    },
  ]);

  async function fetchChatGptResponse(userInput: any) {
    const apiUrl = "/api/chatgpt";

    setConversationHistory((prevState) => [
      ...prevState,
      { role: "user", content: userInput },
    ]);

    const internalConversationHistory = conversationHistory; // Copy the conversation history

    // Add the user's input to the conversation history
    internalConversationHistory.push({ role: "user", content: userInput });

    const requestBody = {
      model: "gpt-3.5-turbo",
      messages: internalConversationHistory,
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

    setConversationHistory((prevState) => [
      ...prevState,
      { role: "assistant", content: chatGptResponse },
    ]);

    console.log("returning rn", chatGptResponse);
    return chatGptResponse;
  }

  console.log(conversationHistory);

  return (
    <>
      <Head>
        <title>Fortune Teller AI</title>
        <meta name="description" content="Fortune Teller AI" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* // tailwind  */}
      <div className="flex flex-col items-center justify-center min-h-screen py-2">
        <AnimatePresence>
          <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
            <motion.div
              layout
              transition={{
                opacity: { duration: 0.2 },
                layout: {
                  type: "spring",
                  bounce: 0.4,
                  duration: 1,
                },
              }}
            >
              <Image
                src="/kirbyfortune.png"
                alt="Fortune Teller"
                width={256}
                height={256}
              />
            </motion.div>
            <motion.p className="mt-2 text-2xl" layout>
              Ask me anything and I will tell you your fortune.
            </motion.p>
            <Audio fetchChatGptResponse={fetchChatGptResponse} />

            {/* // Small Text */}
            <div className="mt-3 text-sm">
              <p>
                Audio may not work on all browsers. Google Chrome is
                recommended.
              </p>
            </div>
          </main>
        </AnimatePresence>
      </div>
    </>
  );
}

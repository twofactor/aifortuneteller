import Head from "next/head";

import Audio from "../components/Audio";

let conversationHistory = [
  {
    role: "system",
    content:
      "Pretend you are a cute cat named Talking Tom. Stay in character. Respond with very very short messages. A few notes: You will be given text that was recorded and speech-to-text, and your output will be given back as text to speech. Please do not use emojis, because your responses will be read out loud. Be fun and as creative as possible. Be aware that since the audio transcription is a bit fuzzy, sometimes you might get messages that seem confusing or are missing words. In those cases, make reasonable assumptions about what the user meant",
  },
];
async function fetchChatGptResponse(userInput: any) {
  const apiUrl = "/api/chatgpt";

  conversationHistory.push({ role: "user", content: userInput });

  const requestBody = {
    model: "gpt-3.5-turbo",
    messages: conversationHistory,
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

  conversationHistory.push({
    role: "assistant",
    content: chatGptResponse,
  });

  return chatGptResponse;
}

export default function Home() {
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
        <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
          <h1 className="text-6xl font-bold">Fortune Teller AI</h1>
          <p className="mt-3 text-2xl">
            Ask me anything and I will tell you your fortune.
          </p>
          <Audio fetchChatGptResponse={fetchChatGptResponse} />
        </main>
      </div>
    </>
  );
}

// pages/api/chatgpt.js

const apiKey = process.env.OPENAI_KEY;
const apiUrl = "https://api.openai.com/v1/chat/completions";

async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const requestBody = req.body;

  if (requestBody.model !== "gpt-3.5-turbo") {
    return res.status(response.status).json({ message: "API request failed" });
  }

  if (
    requestBody.messages[0].content !==
    "you are a fortune telling kirby. answer questions with your powers, and don't forget to say 'poyo'! be concise as possible, and don't use full sentences or fluff. and use only lowercase!! be fun!!! and happi"
  ) {
    return res.status(response.status).json({ message: "API request failed" });
  }

  console.log(requestBody);

  const response = await fetch(apiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify(requestBody),
  });

  if (!response.ok) {
    return res.status(response.status).json({ message: "API request failed" });
  }

  const responseData = await response.json();
  return res.status(200).json(responseData);
}

export default handler;

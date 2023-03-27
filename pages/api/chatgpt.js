// pages/api/chatgpt.js

import { NextApiRequest, NextApiResponse } from "next";

const apiKey = ""; // Replace with your actual API key
const apiUrl = "https://api.openai.com/v1/chat/completions";

async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const requestBody = req.body;

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

import { GoogleGenerativeAI } from "@google/generative-ai";
import { config } from "../config/index.js";
import { getCache, setCache } from "../config/redis.js";

console.log("Gemini API Key:", config.gemini?.apiKey);
console.log("Raw env:", process.env.GEMINI_API_KEY);
const genAI = new GoogleGenerativeAI(config.gemini.apiKey);

export const explainAPOD = async (title, explanation) => {
  const cacheKey = `ai:apod:${title.replace(/\s+/g, "-").toLowerCase()}`;
  await getCache(cacheKey);

  const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

  const prompt = `You are a friendly space educator. Given this NASA astronomy image:
                  Title: ${title}
                  Description: ${explanation}
                  Provide:
                  1. A simple 2-3 sentence explanation a curious 12-year-old would understand
                  2. One amazing fun fact
                  Respond in this exact JSON format only:
                  {
                    "simple": "your simple explanation here",
                    "funFact": "your fun fact here"
                  }`;

  const result = await model.generateContent(prompt);
  const text = result.response.text();

  let data;
  try {
    const clean = text.replace(/```json|```/g, "").trim();
    data = JSON.parse(clean);
  } catch {
    data = { simple: text, funFact: null };
  }
  await setCache(cacheKey, data, 86400 * 7);
  return data;
};

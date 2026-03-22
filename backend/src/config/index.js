import dotenv from "dotenv";
dotenv.config();

export const config = {
  nasa: {
    baseUrl: process.env.NASE_BASE_URL,
    apiKey: process.env.NASA_API_KEY,
  },
  redis: {
    host: process.env.REDIS_HOST || "127.0.0.1",
    port: parseInt(process.env.REDIS_PORT) || 6379,
    password: process.env.REDIS_PASSWORD || "",
    tls: process.env.REDIS_TLS === "true",
  },
  port: process.env.PORT || 5000,
  frontendUrl: process.env.FRONTEND_URL || "http://localhost:5173",
};

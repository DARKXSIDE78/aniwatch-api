import { config } from "dotenv";
import { cors } from "hono/cors";

// Load environment variables
config();

// Get allowed origins from the environment variable or use a default list
const allowedOrigins = process.env.ANIWATCH_API_CORS_ALLOWED_ORIGINS
  ? process.env.ANIWATCH_API_CORS_ALLOWED_ORIGINS.split(",")
  : ["https://darkxside78.github.io", "https://ani-fire-five.vercel.app", "https://darkxside78.github.io"];

// CORS configuration
const corsConfig = cors({
  allowMethods: ["GET", "POST"], // Allow GET and POST requests
  maxAge: 600, // Cache preflight response for 10 minutes
  credentials: true, // Allow cookies or credentials in requests
  origin: (origin) => {
    // Allow requests from specific origins
    if (!origin || allowedOrigins.includes(origin)) {
      return origin;
    }
    throw new Error(`Origin ${origin} is not allowed by CORS policy.`);
  },
});

export default corsConfig;

// /backend/controllers/restaurantChatbotController.js
import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from "@google/generative-ai";
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables

const API_KEY = process.env.GEMINI_API_KEY;

const GENERATION_CONFIG = {
    temperature: 0.7,  // Lower temperature for more predictable responses
    topK: 40,
    topP: 0.95,
    maxOutputTokens: 150,
};

const SAFETY_SETTINGS = [
    { category: HarmCategory.HARM_CATEGORY_HARASSMENT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
    { category: HarmCategory.HARM_CATEGORY_HATE_SPEECH, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
    { category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
    { category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
];

const handleChatMessage = async (req, res) => {
    const userMessage = req.body.message;

    try {
        const genAI = new GoogleGenerativeAI(API_KEY);
        const model = genAI.getGenerativeModel({ model: "gemini-1.0-pro" });

        const chat = model.startChat({
            generationConfig: GENERATION_CONFIG,
            safetySettings: SAFETY_SETTINGS,
            history: [],
        });

        const result = await chat.sendMessage(userMessage);
        if (result.error) {
            return res.status(500).json({ error: result.error.message });
        }

        // Predefined responses for restaurant-specific queries
        const restaurantResponses = {
            "menu": "We have a variety of dishes, including pasta, burgers, salads, and desserts. Would you like to know about a specific dish?",
            "reservation": "To make a reservation, please provide the date, time, and number of guests.",
            "hours": "We are open from 11 AM to 10 PM, Monday through Sunday.",
            "location": "We are located at 123 Delicious St., Foodtown.",
            "specials": "Today's special is our chef's signature lasagna!",
        };

        // Check if the user message matches any predefined responses
        for (const key in restaurantResponses) {
            if (userMessage.toLowerCase().includes(key)) {
                return res.json({ response: restaurantResponses[key] });
            }
        }

        // If no predefined response matches, respond politely
        const politeResponse = "I appreciate your inquiry! However, I'm designed to assist with restaurant-related questions. If you have any dining-related queries, feel free to ask!";
        res.json({ response: politeResponse });
    } catch (error) {
        console.error('An error occurred:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

export default handleChatMessage;
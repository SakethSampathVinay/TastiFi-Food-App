import express from 'express';
import handleChatMessage from '../controllers/chatbotController.js'; // Ensure the path is correct

const router = express.Router();

// Define the POST route for chat messages
router.post('/chat', handleChatMessage);

export default router;

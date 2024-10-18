// Help.jsx
import React, { useState, useContext } from 'react';
import { StoreContext } from "../../context/StoreContext";
import axios from 'axios';
import "./Help.css"

const Help = () => {
  const [messages, setMessages] = useState([]); // Store messages
  const [userInput, setUserInput] = useState(''); // Store user input
  const [error, setError] = useState(null); // Store error messages
  const { url, token } = useContext(StoreContext); // Assuming you have StoreContext set up

  // Function to send a message to the chatbot
  const sendMessage = async (message) => {
    try {
      const response = await axios.post(`${url}/api/chatbot/chat`, { message }, { headers: { Authorization: `Bearer ${token}` } });
      console.log('Response from server:', response.data); // Log the response for debugging

      const data = response.data;

      // Check if the response contains a valid response
      if (data.response) {
        setMessages((prevMessages) => [
          ...prevMessages,
          { sender: 'user', text: message },
          { sender: 'bot', text: data.response },
        ]);
      } else {
        console.error('Unexpected response format:', data);
        setError('Error: Unexpected response format from server.');
      }
    } catch (err) {
      console.error('Error sending message to chatbot:', err);
      setError('Error sending message to the chatbot.');
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (userInput.trim()) {
      sendMessage(userInput.trim());
      setUserInput(''); // Clear input field after sending
    }
  };

  return (
    <div className="help-container">
      {error && <p className="error-message">{error}</p>}
      <h2>Help Section</h2>
      <div className="messages-container">
        {messages.length > 0 ? (
          messages.map((message, index) => (
            <div key={index} className={`message ${message.sender}`}>
              <p>{message.text}</p>
            </div>
          ))
        ) : (
          <p>No messages to display</p>  // Fallback if no messages have been sent
        )}
      </div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          placeholder="Type your message..."
          required
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default Help;
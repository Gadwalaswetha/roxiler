import React, { useState, useEffect, useRef } from 'react';
import './App.css';

function App() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const ws = useRef(null);

  useEffect(() => {
    // Initialize WebSocket connection
    ws.current = new WebSocket('ws://localhost:8080');

    ws.current.onopen = () => {
      console.log('WebSocket connected');
    };

    ws.current.onclose = () => {
      console.log('WebSocket disconnected');
    };

    ws.current.onmessage = (event) => {
      const message = JSON.parse(event.data);
      setMessages((prevMessages) => [...prevMessages, message]);
    };

    // Clean up WebSocket connection on component unmount
    return () => {
      ws.current.close();
    };
  }, []);

  const handleSendMessage = () => {
    const message = {
      content: input,
      timestamp: new Date().toISOString(),
    };

    // Send message via WebSocket
    ws.current.send(JSON.stringify(message));

    // Clear input field
    setInput('');
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Simple Chat App</h1>
        <div className="chat-window">
          {messages.map((msg, index) => (
            <div key={index} className="chat-message">
              <span>{msg.timestamp}</span>
              <p>{msg.content}</p>
            </div>
          ))}
        </div>
        <div className="chat-input">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a message..."
          />
          <button onClick={handleSendMessage}>Send</button>
        </div>
      </header>
    </div>
  );
}

export default App;

import React, { useState, ChangeEvent, FocusEvent, useEffect } from 'react';
import io from 'socket.io-client';
import "./index.css";

const socket = io('http://localhost:5000');

interface Message {
  user_id: number;
  message: string;
}

export default function InteractiveTextbox(): JSX.Element {
  const [inputValue, setInputValue] = useState<string>('');
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    socket.on('chat message', (message) => {
      setMessages((prevMessage) => [...prevMessage, message]);
      console.log(message);
    });
    return () => {
      socket.off('chat message'); // Remove the event listener
    };
  }, []);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleFocus = (event: FocusEvent<HTMLInputElement>) => {
    setIsFocused(true);
  };

  const handleBlur = (event: FocusEvent<HTMLInputElement>) => {
    setIsFocused(false);
  };

  const handleSubmit = () => {
    if (inputValue.trim()) {
      socket.emit('chat message', inputValue);
      setInputValue('');
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-dark_blue" >
      <div className='flex flex-col items-center justify-center bg-primary p-4 rounded-md'>
        {messages.map((message, index) => (
          <div key={index} className="mb-2">
            {`User ${message.user_id}: ${message.message}`}
          </div>
        ))}
      </div>
      <div className='flex flex-row items-center justify-center space-x-4'>
        <input
          id="interactive-textbox"
          type="text"
          value={inputValue}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder="Type something..."
          className={`w-64 p-3 border rounded-md text-gray-800 focus:outline-none transition duration-200 ${isFocused ? 'border-blue-500 shadow-lg' : 'border-gray-300'}`}
        />
        <button
          onClick={handleSubmit}
          className='bg-gray-100 rounded font-semi-bold hover:bg-gray-200 p-2 shadow text-base'>
          Send
        </button>
      </div>
    </div>
  );
}

import React, { useState, ChangeEvent, FocusEvent, useEffect, useId } from 'react';
import io from 'socket.io-client';
import "./index.css";

const socket = io('http://localhost:5000');

interface Message {
  user_id: number;
  message: string;
}

interface ConnectionMessage {
  user_id: number;
}

export default function InteractiveTextbox(): JSX.Element {
  const [inputValue, setInputValue] = useState<string>('');
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [userID, setUserID] = useState<number>(-1);

  useEffect(() => {
    socket.on('chat message', (message) => {
      setMessages((prevMessage) => [...prevMessage, message]);
      console.log(message);
    });
    return () => {
      socket.off('chat message');
    };
  }, []);

  useEffect(() => {
    socket.on('connection_message', (message) => {
      console.log(message);
      setUserID(message);
    });
    return () => {
      socket.off('connection_message');
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
    <div className="flex flex-col items-center justify-center min-h-screen bg-tropical_indigo" >
      <div className='flex flex-col items-start  bg-ghost_white p-4 rounded-md min-w-96 min-h-96'>
        {messages.map((message, index) => (
          <div key={index} className='flex flex-col min-w-full'>
            {message.user_id === userID ?
              <div className='m-1 rounded-md p-2 self-end bg-periwinkle'>
                {message.message}
              </div>
              :
              <div className='flex flex-row items-center justify-center self-start'>
                <div className='m-1 rounded-full p-2 bg-apricot'>
                  {message.user_id}
                </div>
                <div className='m-1 rounded-md p-2 bg-apricot'>
                  {message.message}
                </div>
              </div>
            }
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
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              handleSubmit();
            }
          }}
          className={`w-64 p-3 border rounded-md text-gray-800 focus:outline-none transition duration-200 ${isFocused ? 'border-blue-500 shadow-lg' : 'border-gray-300'}`}
        />
        <button
          onClick={handleSubmit}
          className='bg-periwinkle rounded font-semi-bold hover:bg-periwinkle-400 p-2 shadow text-base'>
          Send
        </button>
      </div>
    </div>
  );
}

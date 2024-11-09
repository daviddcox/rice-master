import React, {
	useState,
	ChangeEvent,
	FocusEvent,
	useEffect,
	useId,
} from 'react';
import io from 'socket.io-client';
import { GoDotFill } from 'react-icons/go';
import './index.css';

const socket = io('http://localhost:5000');

interface Message {
	user_id: number;
	message: string;
	time: Date;
}

const get_time_str = (datetime: Date): string => {
	return datetime.toLocaleString('en-US', {
		hour12: true,
		dateStyle: 'short',
		timeStyle: 'short',
	});
};

export default function InteractiveTextbox(): JSX.Element {
	const [inputValue, setInputValue] = useState<string>('');
	const [isFocused, setIsFocused] = useState<boolean>(false);
	const [messages, setMessages] = useState<Message[]>([]);
	const [userID, setUserID] = useState<number>(-1);
	const [activeUserCount, setActiveUserCount] = useState<number>(0);

	useEffect(() => {
		const handleChatMessage = (message: Message) => {
			message.time = new Date(message.time);
			setMessages((prevMessages) => [...prevMessages, message]);
			console.log(message);
		};

		const handleConnectionMessage = (message: number) => {
			console.log(message);
			setUserID(message);
		};

		const handleActiveCount = (active_count: number) => {
			console.log(active_count, typeof active_count);
			setActiveUserCount(active_count);
		};

		// Set up the socket listeners
		socket.on('chat message', handleChatMessage);
		socket.on('connection_message', handleConnectionMessage);
		socket.on('active_count', handleActiveCount);

		// Cleanup function to remove the listeners
		return () => {
			socket.off('chat message', handleChatMessage);
			socket.off('connection_message', handleConnectionMessage);
			socket.off('active_count', handleActiveCount);
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
	};

	return (
		<div className="flex flex-col items-center justify-center min-h-screen bg-tropical_indigo">
			<div className="flex flex-col items-center justify-center min-h-screen w-96 space-y-2">
				<div className="flex flex-row items-center justify-center space-x-2 text-lg font-semibold bg-ghost_white rounded px-2 self-end">
					<GoDotFill className="text-green-500 w-4 h-4" />
					<span>{activeUserCount} online</span>
				</div>
				<div className="flex flex-col items-start  bg-ghost_white p-4 rounded-md w-96 h-96 overflow-y-scroll">
					{messages.map((message, index) => (
						<div key={index} className="flex flex-col min-w-full">
							{message.user_id === userID ? (
								<div className="my-2 flex flex-col items-center self-end">
									<div className="flex flex-row items-center justify-center self-end">
										<div className="m-1 rounded-md p-2 bg-periwinkle">
											{message.message}
										</div>
									</div>
									<p className="text-sm text-slate-400 self-end">
										{get_time_str(message.time)}
									</p>
								</div>
							) : (
								<div className="my-2 flex flex-col items-center self-start">
									<div className="flex flex-row items-center justify-center self-start">
										<div className="m-1 rounded-full p-2 bg-apricot">
											<p className="text-sm">
												{message.user_id}
											</p>
										</div>
										<div className="m-1 rounded-md p-2 bg-apricot">
											{message.message}
										</div>
									</div>
									<p className="text-sm text-slate-400 self-start">
										{get_time_str(message.time)}
									</p>
								</div>
							)}
						</div>
					))}
				</div>
				<div className="flex flex-row items-center justify-center space-x-4">
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
						className={`w-64 p-3 border rounded-md text-gray-800 focus:outline-none transition duration-200 ${
							isFocused
								? 'border-blue-500 shadow-lg'
								: 'border-gray-300'
						}`}
					/>
					<button
						onClick={handleSubmit}
						className="bg-periwinkle rounded font-semi-bold hover:bg-periwinkle-400 p-2 shadow text-base"
					>
						Send
					</button>
				</div>
			</div>
		</div>
	);
}

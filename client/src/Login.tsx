import { useState, ChangeEvent } from 'react';
import api from './api';

export default function LoginPage(): JSX.Element {
	const [username, setUsername] = useState<string>('');
	const [password, setPassword] = useState<string>('');
	const [usernameFocus, setUsernameFocus] = useState<boolean>(false);
	const [passwordFocus, setPasswordFocus] = useState<boolean>(false);

	const login = async () => {
		try {
			const response = await api.post('/login', { username, password });
			console.log(response.data.message);
		} catch (error) {
			console.log(error);
		}
	};
	const logout = async () => {
		try {
			const response = await api.post('/logout');
			console.log(response.data.message);
		} catch (error) {
			console.log(error);
		}
	};

	const handleUsernameChange = (event: ChangeEvent<HTMLInputElement>) => {
		setUsername(event.target.value);
	};
	const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
		setPassword(event.target.value);
	};

	return (
		<div className="flex flex-col justify-center items-center bg-tropical_indigo min-h-screen space-y-2">
			<input
				id="username-input"
				type="text"
				value={username}
				onChange={handleUsernameChange}
				onFocus={() => {
					setUsernameFocus(true);
				}}
				onBlur={() => {
					setUsernameFocus(false);
				}}
				placeholder="username"
				className={`w-64 p-3 border rounded-md text-gray-800 focus:outline-none transition duration-200 ${
					usernameFocus
						? 'border-blue-500 shadow-lg'
						: 'border-gray-300'
				}`}
			/>
			<input
				id="password-input"
				type="text"
				value={password}
				onChange={handlePasswordChange}
				onFocus={() => {
					setPasswordFocus(true);
				}}
				onBlur={() => {
					setPasswordFocus(false);
				}}
				placeholder="password"
				className={`w-64 p-3 border rounded-md text-gray-800 focus:outline-none transition duration-200 ${
					passwordFocus
						? 'border-blue-500 shadow-lg'
						: 'border-gray-300'
				}`}
			/>
			<div className="flex flex-row justify-center items-center space-x-2">
				<button
					onClick={login}
					className="bg-periwinkle rounded font-semi-bold hover:bg-periwinkle-400 p-2 shadow text-base"
				>
					Login
				</button>
				<button
					onClick={logout}
					className="bg-periwinkle rounded font-semi-bold hover:bg-periwinkle-400 p-2 shadow text-base"
				>
					Logout
				</button>
			</div>
		</div>
	);
}

import { ref } from 'vue';
import axios from 'axios';

// Create an axios instance with a base URL
const api = axios.create({
	baseURL: 'http://localhost:3000/user'
});

// Interceptor to handle any errors in the response
api.interceptors.response.use(response => response, error => {
	console.error(error);
	return Promise.reject(error);
});

// Interceptor to attach token to requests if it exists
api.interceptors.request.use(config => {
	const token = localStorage.getItem('token');
	if (token) {
		config.headers.Authorization = `Bearer ${token}`;
	}
	return config;
}, error => {
	return Promise.reject(error);
});

// Reference to the token in local storage
const token = ref(localStorage.getItem('token') ?? null);
const loggedInUser = ref(JSON.parse(localStorage.getItem('loggedInUser')) ?? {});

// Function to make requests to the API
const makeRequest = async (method, url, data) => {
	try {
		const response = await api[method](url, data);
		return response.data;
	} catch (error) {
		console.error(error);
		throw error;
	}
};

// Function to handle user-related actions
const handleUsers = () => {
	// Function to sign up a user
	const signupUser = async (args) => {
		return await makeRequest('post', '/signup', args);
	};

	// Function to log in a user
	const loginUser = async (args) => {
		try {
			const response = await makeRequest('post', '/login', args);
			if (response && response.token) {
				const receivedToken = response.token;
				localStorage.setItem('token', receivedToken);
				token.value = receivedToken;
				localStorage.setItem('loggedInUser', JSON.stringify(response.user));
				loggedInUser.value = response.user;
			} else {
				console.error('Response is undefined or token is not present in the response');
			}

			return response;
		} catch (error) {
			console.error(error);
			throw error;
		}
	};

	// Function to log out a user
	const logoutUser = () => {
		localStorage.removeItem('token');
		token.value = null;
		localStorage.removeItem('loggedInUser');
		loggedInUser.value = null;
	};

	// const getOneUser = async (userId) => {
	// 	user.value = await makeRequest('get', `/${userId}`);
	// };

	return { signupUser, loginUser, logoutUser, token, loggedInUser };
};

export default handleUsers;
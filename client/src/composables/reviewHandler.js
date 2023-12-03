import { ref } from "vue";
import axios from 'axios';
import userHandler from "@/composables/userHandler";
const { loggedInUser, token } = userHandler();

// Create an axios instance with a base URL
const api = axios.create({
	baseURL: 'http://localhost:3000/review'
});

// Interceptor to handle any errors in the response
api.interceptors.response.use(response => response, error => {
	console.error(error);
	return Promise.reject(error);
});

// Interceptor to attach token to requests if it exists
api.interceptors.request.use(config => {
	if (token) {
		config.headers.Authorization = `Bearer ${token.value}`;
	}
	return config;
}, error => {
	return Promise.reject(error);
});

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

const handleReviews = () => {
	let review = ref({});
	let user = ref({});

	const getOneReview = async () => {
		let result = await makeRequest('get', '/');
		review.value = result;
	};

	const getUserOfReview = async (review) => {
		let result = await makeRequest('get', `/${review}/user`);
		user.value = result[0];
	};

	const newReview = async (input) => {
		if (token.value) {
			try {
				let response = await makeRequest('post', '/', {
					comment: input.comment,
					rating: input.rating,
					createdAt: input.createdAt,
					userId: loggedInUser.value._id,
					recipeId: input.recipeId
				});
				return response;
			} catch (error) {
				console.error(error);
				throw error;
			}
		} else {
			return;
			// throw new Error("token doesn't exist");
		}
	};

	return { review, getOneReview, user, getUserOfReview, newReview }
};

export default handleReviews;
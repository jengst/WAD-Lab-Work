import { ref } from "vue";
import axios from 'axios';

// Create an axios instance with a base URL
const api = axios.create({
	baseURL: 'http://localhost:3000/category'
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

const handleCategories = () => {
	let categories = ref({});
	let recipes = ref({});
	let category = ref({});

	const getAllCategories = async () => {
		let result = await makeRequest('get', '/');
		categories.value = result;
	};

	const getAllRecipesOfCategory = async (category) => {
		let result = await makeRequest('get', `/${category}/recipe`);
		recipes.value = result;
	};

	const getOneCategory = async (categoryId) => {
		category.value = await makeRequest('get', `/${categoryId}`);
	};

	return { categories, getAllCategories, recipes, getAllRecipesOfCategory, category, getOneCategory }
};

export default handleCategories;
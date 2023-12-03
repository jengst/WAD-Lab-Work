import { ref } from "vue";
import axios from 'axios';
import userHandler from "@/composables/userHandler";
const { token } = userHandler();

// Create an axios instance with a base URL
const api = axios.create({
	baseURL: 'http://localhost:3000/recipe'
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

const handleRecipes = () => {
	let recipes = ref({});
	let recipe = ref({});
	let categories = ref({});
	let reviews = ref({});

	const getAllRecipes = async (max) => {
		let result = await makeRequest('get', '/');
		if (max !== undefined) {
			result = result.sort(() => Math.random() - 0.5).slice(0, max);
		}
		recipes.value = result;
	};

	const getOneRecipe = async (recipeId) => {
		recipe.value = await makeRequest('get', `/${recipeId}`);
	};

	const getAllCategoriesOfRecipe = async (recipe) => {
		let result = await makeRequest('get', `/${recipe}/category`);
		categories.value = result;
	};

	const getAllReviewsOfRecipe = async (recipe) => {
		let result = await makeRequest('get', `/${recipe}/review`);
		reviews.value = result;
	};

	const createRecipe = async (input) => {
		let response = await makeRequest('post', '/', { ...input });
		return response;
	};

	// const deleteRecipe = async (id) => {
	// 	await makeRequest('delete', `/${id}`);
	// };

	// const editRecipe = async (id, updatedRecipe) => {
	// 	await makeRequest('put', `/${id}`, updatedRecipe);
	// };

	return { recipes, recipe, getAllRecipes, getOneRecipe, categories, getAllCategoriesOfRecipe, reviews, getAllReviewsOfRecipe, createRecipe }
};

export default handleRecipes;
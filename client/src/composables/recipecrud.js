import { ref, computed } from "vue";
import { useRoute } from "vue-router";
import axios from "axios";

// Create axios instance
const api = axios.create({
	baseURL: 'http://localhost:3000/recipe'
});

// Handle errors globally
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

const handleRecipes = () => {
	const route = useRoute();
	const recipeId = computed(() => route.params.id);
	const state = ref({ newTitle: "", recipes: {} });
	const recipe = ref({});

	const makeRequest = async (method, url, data) => {
		const response = await api[method](url, data);
		return response.data;
	};

	const getAllRecipes = async () => {
		state.value.recipes = await makeRequest('get', '/');
	};

	const newRecipe = async (input) => {
		await makeRequest('post', '/', { title: input });
	};

	const deleteRecipe = async (id) => {
		await makeRequest('delete', `/${id}`);
	};

	const editRecipe = async (id, updatedRecipe) => {
		await makeRequest('put', `/${id}`, updatedRecipe);
	};

	const getSpecificRecipe = async () => {
		recipe.value = await makeRequest('get', `/${recipeId.value}`);
	};

	return { state, getAllRecipes, newRecipe, deleteRecipe, editRecipe, recipe, recipeId, getSpecificRecipe };
};

export default handleRecipes;
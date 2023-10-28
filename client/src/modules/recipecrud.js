import { ref, computed } from "vue";
import { useRoute } from "vue-router";

const getAllRecipes = () => {

	const route = useRoute()
	// const router = useRouter()

	const recipeId = computed(() => route.params.id)
	console.log(recipeId.value);

	const state = ref({
		newTitle: "",
		recipes: {}
	})

	const fetchAllRecipes = async () => {
		try {
			await fetch('http://localhost:3000/recipe')
				.then(res => res.json())
				.then(data => {
					state.value.recipes = data
				})
		} catch (err) {
			console.log(err);
		}
	}

	const newRecipe = (input) => {
		const requestOptions = {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
				// auth token 
			},
			body: JSON.stringify({
				title: input
			})
		}

		fetch('http://localhost:3000/recipe', requestOptions)
			.then(res => res.body)
			.then(res => console.log(res))
	}

	const deleteRecipe = (id) => {
		try {
			fetch('http://localhost:3000/recipe/' + id, { method: 'DELETE' })
				.then(res => res.body)
				.then(res => console.log(res))
		} catch (err) {
			console.log(err);
		}
	}

	const editRecipe = (id) => {
		const requestOptions = {
			method: 'PUT',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({})
		}

		try {
			fetch('http://localhost:3000/recipe/' + id, requestOptions)
				.then(res => res.body)
				.then(res => console.log(res))
		} catch (err) {
			console.log(err);
		}
	}

	const recipe = ref({})
	const getSpecificRecipe = async () => {
		try {
			await fetch('http://localhost:3000/recipe')
				.then(res => res.json())
				.then(data => {
					recipe.value = data.filter(r => r._id === recipeId.value)
				})
		} catch (err) {
			console.log(err);
		}
	}

	return { state, fetchAllRecipes, newRecipe, deleteRecipe, editRecipe, recipe, recipeId, getSpecificRecipe }
}

export default getAllRecipes
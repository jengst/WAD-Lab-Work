<template>
	<div>
		<h1>Recipes</h1>
		<input type="text" placeholder="Test" v-model="state.newTitle">
		<button @click="newRecipe()">New Recipe</button>
		<br>
		<span>Test: {{ state.newTitle }}</span>
		<br>
		<div class="recipe-list">
			<div v-for="recipe in state.recipes" :key="recipe.title" class="recipe-card">
				<router-link :to="`/recipe/${recipe._id}`">
					<h2>{{ recipe.title }}</h2>
					<p>{{ recipe.description }}</p>

					<div class="section">
						<h3>Ingredients:</h3>
						<ul>
							<li v-for="ingredient in recipe.ingredients" :key="ingredient">{{ ingredient }}</li>
						</ul>
					</div>

					<div class="section">
						<h3>Instructions:</h3>
						<ol>
							<li v-for="(instruction, index) in recipe.instructions" :key="index">{{ instruction }}</li>
						</ol>
					</div>
					<button @click="editRecipe(recipe._id)">Edit Recipe</button>
					<button @click="deleteRecipe(recipe._id)">Delete Recipe</button>
				</router-link>
			</div>
		</div>
	</div>
</template>

<script>
import { onMounted } from "vue";
import recipecrud from "../modules/recipecrud";

export default {
	setup() {
		const { state, fetchAllRecipes, newRecipe, deleteRecipe, editRecipe } = recipecrud()

		onMounted(() => {
			fetchAllRecipes()
		})

		return { state, fetchAllRecipes, newRecipe, deleteRecipe, editRecipe }
	}
}
</script>

<style scoped>
.recipe-list {
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
}

.recipe-card {
	border: 2px solid #333;
	border-radius: 5px;
	padding: 20px;
	margin: 10px;
	background-color: #f9f9f9;
	box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.section {
	margin-top: 20px;
}

h2 {
	font-size: 24px;
}

h3 {
	font-size: 18px;
	margin-bottom: 10px;
}

ul,
ol {
	padding-left: 20px;
}
</style>

<template>
	<div class="container">
		<h2 class="my-4">Discover our Recipes</h2>
		<div class="row mb-24">
			<RecipeCardComponent v-for="recipe in recipes" :key="recipe.title" :currentRecipe="recipe" />
		</div>
	</div>
</template>

<script>
import { onMounted } from "vue";
import recipeHandler from "@/composables/recipeHandler";
import RecipeCardComponent from "@/components/RecipeCardComponent.vue";

export default {
	components: {
		RecipeCardComponent
	},
	setup() {
		const { recipes, getAllRecipes } = recipeHandler()

		onMounted(() => {
			getAllRecipes()
		})

		return { recipes, getAllRecipes }
	}
}
</script>
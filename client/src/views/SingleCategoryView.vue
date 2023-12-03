<template>
	<div class="container">
		<h2 class="my-4">All Recipes in {{ category.name }}</h2>
		<p class="my-4">{{ category.description }}</p>
		<div class="row mb-24">
			<RecipeCardComponent v-for="recipe in recipes" :key="recipe.title" :currentRecipe="recipe" />
		</div>
	</div>
</template>

<script>
import { onMounted, computed, watch } from "vue";
import { useRoute } from "vue-router";
import categoryHandler from "@/composables/categoryHandler";
import RecipeCardComponent from "@/components/RecipeCardComponent.vue";

export default {
	components: {
		RecipeCardComponent
	},
	setup() {
		const { recipes, getAllRecipesOfCategory, category, getOneCategory } = categoryHandler()

		const route = useRoute();
		const categoryId = computed(() => route.params.id);

		onMounted(() => {
			getAllRecipesOfCategory(categoryId.value)
			getOneCategory(categoryId.value)

			watch(categoryId, (newId) => {
				if (newId !== undefined) {
					getAllRecipesOfCategory(newId)
					getOneCategory(newId)
				}
			})
		})

		return { recipes, category }
	}
}
</script>
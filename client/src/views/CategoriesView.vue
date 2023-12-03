<template>
	<div class="container">
		<h2 class="my-4">Discover our Recipes</h2>
		<div class="row mb-24">
			<CategoryCardComponent v-for="category in categories" :key="category.title" :currentCategory="category" />
		</div>
	</div>
</template>

<script>
import { onMounted } from "vue";
import categoryHanlder from "@/composables/categoryHandler";
import CategoryCardComponent from "@/components/CategoryCardComponent.vue";

export default {
	components: {
		CategoryCardComponent
	},
	setup() {
		const { categories, getAllCategories } = categoryHanlder()

		onMounted(() => {
			getAllCategories()
		})

		return { categories, getAllCategories }
	}
}
</script>
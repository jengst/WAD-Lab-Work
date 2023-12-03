<template>
	<div class="mb-4 p-6 bg-white">
		<router-link :to="`/recipe/${recipe._id}`" class="d-block px-6 mt-6 mb-2 link-dark text-decoration-none rounded">
			<img class="mb-2 w-100 object-fit-cover rounded" style="height: 8rem" :src="recipe.image"
				:alt="recipe.description">
			<h5 class="mb-2">{{ recipe.title }}</h5>
		</router-link>
	</div>
</template>

<script>
import { reactive, toRefs } from 'vue';

export default {
	props: {
		currentRecipe: Object
	},
	setup(props) {
		const state = reactive({
			recipe: props.currentRecipe
		});

		return {
			...toRefs(state)
		};
	}
}
</script>
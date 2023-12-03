<template>
	<div class="col-12 col-md-6 col-lg-4 mb-4">
		<div class="p-6">
			<router-link :to="`/recipe/${recipe._id}`"
				class="d-block px-6 mt-6 mb-2 link-dark text-decoration-none rounded">
				<img class="mb-2 mx-auto img-fluid rounded" :src="recipe.image" :alt="recipe.description">
				<h5 class="mb-2">{{ recipe.title }}</h5>
				<p>{{ recipe.description }}</p>
			</router-link>
		</div>
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
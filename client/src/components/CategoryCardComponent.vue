<template>
	<div class="col-12 col-md-6 col-lg-4 mb-4">
		<div class="p-6 bg-white">
			<router-link :to="`/category/${category._id}`"
				class="d-block px-6 mt-6 mb-2 link-dark text-decoration-none rounded">
				<img class="mb-2 mx-auto img-fluid rounded" :src="category.image" :alt="category.description">
				<p class="">{{ category.description }}</p>
			</router-link>
		</div>
	</div>
</template>

<script>
import { reactive, toRefs } from 'vue';

export default {
	props: {
		currentCategory: Object
	},
	setup(props) {
		const state = reactive({
			category: props.currentCategory
		});

		return {
			...toRefs(state)
		};
	}
}
</script>

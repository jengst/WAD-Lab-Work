<template>
	<div class="mb-4 px-4 pt-4 pb-2 bg-light rounded">
		<div class="d-flex gap-2 justify-content-start mb-2">
			<p class="me-2"><strong>{{ user.username }}</strong></p>
			<i class="bi-star-fill bi text-warning" v-for="star in review.rating" :key="star"></i>
			<p style="margin-left: auto;">{{ formattedDate }}</p>
		</div>
		<p>{{ review.comment }}</p>
	</div>
</template>

<script>
import { reactive, toRefs, onMounted, computed } from 'vue';
import reviewHandler from "@/composables/reviewHandler";

export default {
	props: {
		currentReview: Object
	},
	setup(props) {
		const { user, getUserOfReview } = reviewHandler()

		const state = reactive({
			review: props.currentReview
		});

		const formattedDate = computed(() => {
			const options = { year: 'numeric', month: 'long', day: 'numeric' };
			return new Date(state.review.createdAt).toLocaleDateString('en-US', options);
		});

		onMounted(() => {
			getUserOfReview(state.review._id)
		});

		return {
			...toRefs(state),
			user,
			formattedDate
		};
	}
}
</script>
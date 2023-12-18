<template>
	<main class="container">
		<h2 class="my-4">Select a review to delete</h2>
		<div class="row mb-24">
			<form @submit.prevent="submitForm">

				<div class="mb-4">
					<!-- <label class="form-label fw-light">Categories</label> -->
					<div class="list-group list-group-checkable d-flex gap-2 flex-lg-row flex-wrap flex-column">

						<span v-for="review in reviews" :key="review._id">
							<input class="list-group-item-check pe-none" type="checkbox"
								:name="'listGroupCheckableRadios' + review._id"
								:id="'listGroupCheckableRadios' + review._id" :value="review._id" v-model="reviewIds">
							<label class="list-group-item rounded" :for="'listGroupCheckableRadios' + review._id">
								<ReviewComponent :currentReview="review" style="margin: 0!important;" />
							</label>
						</span>
					</div>
				</div>

				<button class="btn btn-primary w-100 py-2" type="submit">Confirm deletion</button>
			</form>
		</div>
		<!-- Modal -->
		<ModalComponent :openModal="openModal" :message="message" />

	</main>
</template>

<script>
import { ref, onMounted } from 'vue';
import reviewHandler from '@/composables/reviewHandler';
// import recipeHandler from "@/composables/recipeHandler";
import ModalComponent from '@/components/ModalComponent.vue';
import ReviewComponent from "@/components/ReviewComponent.vue";

export default {
	components: {
		ModalComponent,
		ReviewComponent
	},
	setup() {
		const { reviews, getAllReviews, deleteReview } = reviewHandler();
		// const { getOneRecipe } = recipeHandler();

		const reviewIds = ref([]);

		const message = ref("");
		const openModal = ref(false);

		onMounted(() => {
			getAllReviews();
		});

		const submitForm = async () => {
			if (reviewIds.value.length === 0) {
				message.value = "Please select at least one review to delete."
				openModal.value = true;
				return;
			}
			reviewIds.value.forEach(async reviewId => {
				deleteReview(reviewId);
			});
			message.value = "Deletion successful."

			openModal.value = true;
		};

		return {
			reviewIds,
			submitForm,
			message,
			openModal,
			reviews
		};
	}
}
</script>

<style scoped>
.form-check-input:checked+.form-checked-content {
	opacity: .5;
}

.form-check-input-placeholder {
	border-style: dashed;
}

[contenteditable]:focus {
	outline: 0;
}

.list-group-checkable .list-group-item {
	cursor: pointer;
}

.list-group-item-check {
	position: absolute;
	clip: rect(0, 0, 0, 0);
}

.list-group-item-check:hover+.list-group-item {
	background-color: var(--bs-secondary-bg);
}

.list-group-item-check:checked+.list-group-item {
	/* color: #fff; */
	background-color: var(--bs-primary);
	border-color: var(--bs-primary);
}

.list-group-item-check[disabled]+.list-group-item,
.list-group-item-check:disabled+.list-group-item {
	pointer-events: none;
	filter: none;
	opacity: .5;
}

.list-group-radio .list-group-item {
	cursor: pointer;
	border-radius: .5rem;
}

.list-group-radio .form-check-input {
	z-index: 2;
	margin-top: -.5em;
}

.list-group-radio .list-group-item:hover,
.list-group-radio .list-group-item:focus {
	background-color: var(--bs-secondary-bg);
}

.list-group-radio .form-check-input:checked+.list-group-item {
	background-color: var(--bs-body);
	border-color: var(--bs-primary);
	box-shadow: 0 0 0 2px var(--bs-primary);
}

.list-group-radio .form-check-input[disabled]+.list-group-item,
.list-group-radio .form-check-input:disabled+.list-group-item {
	pointer-events: none;
	filter: none;
	opacity: .5;
}
</style>
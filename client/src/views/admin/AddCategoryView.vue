<template>
	<main class="container">
		<h2 class="my-4">Submit a new category</h2>
		<div class="row mb-24">
			<form @submit.prevent="submitForm">
				<div class="mb-4">
					<label for="title" class="form-label fw-light">Name</label>
					<input v-model="form.name" type="text" class="form-control" id="name" placeholder="New category"
						required>
				</div>
				<div class="mb-4">
					<label for="desc" class="form-label fw-light">Desciption</label>
					<input v-model="form.description" type="text" class="form-control" id="desc"
						placeholder="Category description" required>
				</div>
				<div class="mb-4">
					<label for="img" class="form-label fw-light">Image URL</label>
					<input v-model="form.image" type="url" class="form-control" id="img"
						placeholder="https://example.com/image.jpg" required>
				</div>

				<div class="mb-4">
					<label class="form-label fw-light">Recipes to add to the new category</label>
					<div class="list-group list-group-checkable d-flex gap-2 flex-lg-row flex-wrap flex-column">

						<span v-for="recipe in recipes" :key="recipe._id" class="flex-grow-1">
							<input class="list-group-item-check pe-none" type="checkbox"
								:name="'listGroupCheckableRadios' + recipe._id"
								:id="'listGroupCheckableRadios' + recipe._id" :value="recipe._id" v-model="form.recipes">
							<label class="list-group-item rounded py-2" :for="'listGroupCheckableRadios' + recipe._id">
								{{ recipe.title }}
								<span class="d-block small opacity-50">{{ recipe.description }}</span>
							</label>
						</span>
					</div>
				</div>

				<button class="btn btn-primary w-100 py-2" type="submit">Submit category</button>
			</form>
		</div>
		<!-- Modal -->
		<ModalComponent :openModal="openModal" :message="message" />

	</main>
</template>

<script>
import { reactive, ref, onMounted } from 'vue';
import categoryHandler from '@/composables/categoryHandler';
import recipeHandler from "@/composables/recipeHandler";
import ModalComponent from '@/components/ModalComponent.vue';

export default {
	components: {
		ModalComponent
	},
	setup() {
		const { createCategory } = categoryHandler();
		const { recipes, getAllRecipes } = recipeHandler();

		const form = reactive({
			name: '',
			description: '',
			image: '',
			recipes: []
		});

		const message = ref("");
		const openModal = ref(false);

		onMounted(() => {
			getAllRecipes();
		});

		const submitForm = async () => {
			const response = await createCategory(form);
			message.value = response.message;

			openModal.value = true;
		};

		return {
			form,
			submitForm,
			message,
			openModal,
			recipes
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
	color: #fff;
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
<template>
	<main class="container">
		<h2 class="my-4">Create a new recipe</h2>
		<div class="row mb-24">
			<form @submit.prevent="submitForm">
				<div class="mb-4">
					<label for="title" class="form-label fw-light">Title</label>
					<input v-model="form.title" type="text" class="form-control" id="title" placeholder="Tasty recipe"
						required>
				</div>
				<div class="mb-4">
					<label for="desc" class="form-label fw-light">Desciption</label>
					<input v-model="form.description" type="text" class="form-control" id="desc"
						placeholder="Tasty description" required>
				</div>
				<div class="mb-4">
					<label for="img" class="form-label fw-light">Image URL</label>
					<input v-model="form.image" type="url" class="form-control" id="img"
						placeholder="https://example.com/image.jpg" required>
				</div>

				<div class="mb-4">
					<label class="form-label fw-light">Ingredients</label>
					<ul>
						<li v-for="(item, index) in form.ingredients" :key="index">
							<input v-model="form.ingredients[index]" type="text" class="form-control mb-2"
								:id="'Ingredients' + index" placeholder="New ingredient" required>
						</li>
					</ul>
					<button class="btn btn-outline-primary" @click.prevent="addItem(form.ingredients, 20);">Add
						ingredient</button>
				</div>

				<div class="mb-4">
					<label class="form-label fw-light">Instructions</label>
					<ol>
						<li v-for="(item, index) in form.instructions" :key="index">
							<input v-model="form.instructions[index]" type="text" class="form-control mb-2"
								:id="'Instructions' + index" placeholder="New instruction" required>
						</li>
					</ol>
					<button class="btn btn-outline-primary" @click.prevent="addItem(form.instructions, 20);">Add
						instruction</button>
				</div>

				<div class="mb-4">
					<label class="form-label fw-light">Categories</label>
					<div class="list-group list-group-checkable d-flex gap-2 flex-lg-row flex-column">

						<span v-for="category in categories" :key="category._id">
							<input class="list-group-item-check pe-none" type="checkbox"
								:name="'listGroupCheckableRadios' + category._id"
								:id="'listGroupCheckableRadios' + category._id" :value="category._id"
								v-model="form.categories">
							<label class="list-group-item rounded py-2" :for="'listGroupCheckableRadios' + category._id">
								{{ category.name }}
							</label>
						</span>
					</div>
				</div>

				<button class="btn btn-primary w-100 py-2" type="submit">Submit recipe</button>
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
		const { categories, getAllCategories } = categoryHandler();
		const { createRecipe } = recipeHandler();

		const form = reactive({
			title: '',
			description: '',
			ingredients: [''],
			instructions: [''],
			image: '',
			categories: []
		});

		const message = ref("");
		const openModal = ref(false);

		onMounted(() => {
			getAllCategories();
		});

		const addItem = (items, limit) => {
			if (items.length < limit) {
				items.push('');
			}
		};

		const submitForm = async () => {
			if (form.categories.length == 0) {
				return;
			}

			const response = await createRecipe(form);
			message.value = response.message;

			openModal.value = true;
		};

		return {
			form,
			addItem,
			submitForm,
			message,
			openModal,
			categories
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
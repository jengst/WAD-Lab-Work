<template>
	<main class="m-auto" style="max-width: 330px; padding: 6rem 1rem;">
		<form @submit.prevent="submitForm">
			<h1 class="h3 mb-3 fw-normal">Create an account</h1>

			<div class="mb-4">
				<label for="floatingFName" class="form-label fw-light">Username*</label>
				<input v-model="form.username" type="text" class="form-control" id="floatingFName"
					placeholder="FoodLover123" required>
			</div>
			<div class="mb-4">
				<label for="floatingInput" class="form-label fw-light">Email address*</label>
				<input v-model="form.email" type="email" class="form-control" id="floatingInput"
					placeholder="name@example.com" required>
			</div>
			<div class="mb-4">
				<label for="floatingPassword" class="form-label fw-light">Password*</label>
				<input v-model="form.password" type="password" class="form-control" id="floatingPassword"
					placeholder="*******" required>
			</div>

			<button class="btn btn-primary w-100 py-2" type="submit">Sign up</button>
		</form>

		<!-- Modal -->
		<ModalComponent :openModal="openModal" :message="message" />

	</main>
</template>

<script>
import { reactive, ref } from 'vue';
import userHandler from "../composables/userHandler";
import ModalComponent from '../components/ModalComponent.vue';

export default {
	components: {
		ModalComponent
	},
	setup() {
		const form = reactive({
			username: '',
			email: '',
			password: '',
		});

		const message = ref("");
		const openModal = ref(false);

		const submitForm = async () => {
			// Assign the return value of signupUser to message
			const response = await userHandler().signupUser(form);
			message.value = response.message;

			openModal.value = true;
		};

		return {
			form,
			submitForm,
			message,
			openModal
		};
	}
}
</script>
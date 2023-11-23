<template>
	<main class="m-auto" style="max-width: 330px; padding: 6rem 1rem;">
		<form @submit.prevent="submitForm">
			<h1 class="h3 mb-4 fw-normal">Please sign in</h1>

			<div class="mb-4">
				<label for="floatingInput" class="form-label fw-light">Email address</label>
				<input v-model="form.email" type="email" class="form-control" id="floatingInput"
					placeholder="name@example.com" required>
			</div>
			<div class="mb-4">
				<label for="floatingPassword" class="form-label fw-light">Password</label>
				<input v-model="form.password" type="password" class="form-control" id="floatingPassword"
					placeholder="*******" required>
			</div>

			<button class="btn btn-primary w-100 py-2" type="submit">Sign in</button>
		</form>

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
			email: '',
			password: '',
		});

		const message = ref("");
		const openModal = ref(false);

		const submitForm = async () => {
			// Assign the return value of loginUser to message
			const response = await userHandler().loginUser(form);
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
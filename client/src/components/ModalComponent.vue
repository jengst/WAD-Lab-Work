<template>
	<div class="modal fade" id="modal_demo" tabindex="-1" aria-labelledby="modal_demo_label" aria-hidden="true">
		<div class="modal-dialog modal-dialog-centered">
			<div class="modal-content">
				<div class="modal-header">
					<h5 class="modal-title" id="modal_demo_label">Message</h5>
					<button type="button" class="btn-close" aria-label="Close" @click="hideModal()"></button>
				</div>
				<div class="modal-body">
					<p>{{ state.message }}</p>
				</div>
				<div class="modal-footer">

					<router-link to="/"><button type="button" class="btn btn-secondary"
							@click="hideModal()">Close</button></router-link>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { reactive, onMounted, watch } from 'vue';
import { Modal } from 'bootstrap';

export default {
	props: {
		openModal: Boolean,
		message: String
	},
	setup(props) {
		const state = reactive({
			modal: null,
			message: props.message,
			openModal: props.openModal
		})

		onMounted(() => {
			state.modal = new Modal('#modal_demo', {})
		})

		const showModal = () => {
			state.modal.show()
		}

		const hideModal = () => {
			state.modal.hide()
		}

		watch(() => props.openModal, (newVal) => {
			if (state.modal) {
				if (newVal == true) {
					showModal()
				}
				if (newVal == false) {
					hideModal()
				}
			}
		}, { immediate: true });

		watch(() => props.message, (newVal) => {
			state.message = newVal
		}, { immediate: true });

		return {
			state,
			showModal,
			hideModal
		};
	}
}
</script>
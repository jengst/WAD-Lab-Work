<template>
	<main class="form-signin w-100 m-auto" style="max-width: 330px; padding: 8rem 1rem;">
		<form>
			<h1 class="h3 mb-3 fw-normal">Create an account</h1>

			<div class="form-floating">
				<input type="password" class="form-control" id="floatingPassword" placeholder="Password">
				<label for="floatingPassword">Name</label>
			</div>
			<div class="form-floating">
				<input type="password" class="form-control" id="floatingPassword" placeholder="Password">
				<label for="floatingPassword">Surname</label>
			</div>
			<div class="form-floating">
				<input type="email" class="form-control" id="floatingInput" placeholder="name@example.com">
				<label for="floatingInput">Email address</label>
			</div>
			<div class="form-floating">
				<input type="password" class="form-control" id="floatingPassword" placeholder="Password">
				<label for="floatingPassword">Password</label>
			</div>

			<br>
			<button class="btn btn-primary w-100 py-2" type="submit">Sign in</button>
		</form>
	</main>
</template>

<script>
export default {
	setup() {

	}
}
</script>
<template>
  <div class="container col-xxl-8 px-4">
    <div class="row flex-lg-row-reverse align-items-center g-5 py-5">
      <div class="col-10 col-sm-8 col-lg-6">
        <img
          src="https://images.unsplash.com/photo-1466637574441-749b8f19452f?auto=format&fit=crop&q=80&w=2428&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          class="d-block mx-lg-auto img-fluid" alt="Bootstrap Themes" width="700" height="500" loading="lazy">
      </div>
      <div class="col-lg-6">
        <h1 class="display-5 fw-bold text-body-emphasis lh-1 mb-3">Discover the art of cooking with CookBook Connect</h1>
        <p class="lead">CookBook Connect is your culinary companion, offering a seamless recipe management experience.
          Create, collect, and explore an array of delicious recipes while enhancing your cooking expertise. Join us to
          save, review, and elevate your culinary skills.</p>
        <div class="d-grid gap-2 d-md-flex justify-content-md-start">
          <router-link to="/recipes" type="button" class="btn btn-primary btn-lg px-4 me-md-2">Discover
            Recipes</router-link>
          <router-link to="/create-recipe" type="button" class="btn btn-outline-secondary btn-lg px-4">Submit
            Recipe</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'HomeView'
}
</script>

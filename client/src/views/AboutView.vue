<template>
  <div class="container col-xxl-8 px-4">
    <h1 class="text-center my-4 display-5 fw-bold text-body-emphasis">About CookBook Connect</h1>
    <p class="lead text-center">CookBook Connect is your culinary companion, offering a seamless recipe management
      experience. Create, collect, and explore an array of delicious recipes while enhancing your cooking expertise. Join
      us to save, review, and elevate your culinary skills.</p>

    <div class="row mt-5">
      <div class="col-md-4 d-flex align-items-start mb-4">
        <div
          class="icon-square text-body-emphasis bg-body-secondary d-inline-flex align-items-center justify-content-center fs-4 flex-shrink-0 me-3 rounded">
          <i class="bi-journal bi"></i>
        </div>
        <div>
          <h3 class="fs-2 text-body-emphasis">Recipe Management</h3>
          <p>Create, organize, and manage your recipes effortlessly. Add, edit, and categorize recipes based on your
            preferences and cooking style.</p>
        </div>
      </div>

      <div class="col-md-4 d-flex align-items-start mb-4">
        <div
          class="icon-square text-body-emphasis bg-body-secondary d-inline-flex align-items-center justify-content-center fs-4 flex-shrink-0 me-3 rounded">
          <i class="bi-emoji-heart-eyes bi"></i>
        </div>
        <div>
          <h3 class="fs-2 text-body-emphasis">Delicious Recipes</h3>
          <p>Explore a diverse collection of mouthwatering recipes curated to satisfy different tastes and dietary
            preferences.</p>
        </div>
      </div>

      <div class="col-md-4 d-flex align-items-start mb-4">
        <div
          class="icon-square text-body-emphasis bg-body-secondary d-inline-flex align-items-center justify-content-center fs-4 flex-shrink-0 me-3 rounded">
          <i class="bi-people bi"></i>
        </div>
        <div>
          <h3 class="fs-2 text-body-emphasis">Cooking Community</h3>
          <p>Connect, share, and learn from a vibrant community of cooking enthusiasts. Exchange ideas, tips, and
            experiences.</p>
        </div>
      </div>

      <div class="col-md-4 d-flex align-items-start mb-4">
        <div
          class="icon-square text-body-emphasis bg-body-secondary d-inline-flex align-items-center justify-content-center fs-4 flex-shrink-0 me-3 rounded">
          <i class="bi-globe bi"></i>
        </div>
        <div>
          <h3 class="fs-2 text-body-emphasis">Global Cuisine</h3>
          <p>Explore recipes from around the world and discover new culinary delights from various cultures.</p>
        </div>
      </div>

      <div class="col-md-4 d-flex align-items-start mb-4">
        <div
          class="icon-square text-body-emphasis bg-body-secondary d-inline-flex align-items-center justify-content-center fs-4 flex-shrink-0 me-3 rounded">
          <i class="bi-search bi"></i>
        </div>
        <div>
          <h3 class="fs-2 text-body-emphasis">Explore & Learn</h3>
          <p>Explore new recipes, techniques, and ingredients. Enhance your culinary skills and broaden your cooking
            repertoire.</p>
        </div>
      </div>

      <div class="col-md-4 d-flex align-items-start mb-4">
        <div
          class="icon-square text-body-emphasis bg-body-secondary d-inline-flex align-items-center justify-content-center fs-4 flex-shrink-0 me-3 rounded">
          <i class="bi-lightbulb bi"></i>
        </div>
        <div>
          <h3 class="fs-2 text-body-emphasis">Culinary Skills</h3>
          <p>Elevate your culinary skills with our platform. Access resources, tips, and tutorials to become a more
            proficient cook.</p>
        </div>
      </div>

    </div>
    <div class="text-center mt-2">
      <router-link to="/signup" type="button" class="btn btn-primary btn-lg px-4">Join the CookBook
        Community</router-link>
    </div>
  </div>
</template>

<style scoped>
.icon-square {
  width: 3rem;
  height: 3rem;
}

.bi {
  vertical-align: -.125em;
  fill: currentColor;
  width: 1rem;
  height: 1rem;
  position: relative;
}

.bi::before {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
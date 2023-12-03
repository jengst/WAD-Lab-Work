<template>
  <div class="container">
    <div class="row">
      <div class="col-md-8">
        <h2 class="my-4">{{ recipe.title }}</h2>
        <img class="mb-4 object-fit-cover img-fluid rounded" :src="recipe.image" :alt="recipe.description">
        <div class="d-flex gap-2 justify-content-start mb-3">
          <router-link v-for="category in categories" :key="category.name" :to="'/category/' + category._id"><span
              class="badge bg-primary-subtle text-primary-emphasis rounded-pill">{{ category.name }}</span></router-link>
        </div>
        <p class="mb-4"><strong>{{ recipe.description }}</strong></p>

        <section>
          <h5>Ingredients:</h5>
          <ul>
            <li v-for="ingredient in recipe.ingredients" :key="ingredient">{{ ingredient }}</li>
          </ul>
        </section>

        <section>
          <h5>Instructions:</h5>
          <ol>
            <li v-for="(instruction, index) in recipe.instructions" :key="index">{{ instruction }}</li>
          </ol>
        </section>

        <section>
          <h5 class="mb-3">Reviews:</h5>
          <ReviewComponent v-for="review in reviews" :key="review._id" :currentReview="review" />

          <form @submit.prevent="submitForm">
            <div class="mb-4 d-flex gap-2 justify-content-start mb-2">
              <div class="flex-grow-1">
                <label for="floatingInput" class="form-label fw-light">Comment</label>
                <textarea v-model="form.comment" class="form-control" id="floatingInput" placeholder="Your comment here"
                  required></textarea>
              </div>
              <div>
                <label for="floatingSelectStars" class="form-label fw-light">Rating</label>
                <select v-model="form.rating" class="form-select" id="floatingSelectStars" required>
                  <!-- <option disabled value="" selected>Your rating here</option> -->
                  <option v-for="star in 5" :key="star" :value="star">{{ star }}</option>
                </select>
              </div>
            </div>

            <button class="btn btn-primary py-2" type="submit">Submit comment</button>
          </form>
        </section>
      </div>

      <div class="col-md-4">
        <h4 class="my-4">Other great recipes</h4>
        <div class="pl-4">
          <RecipeCardSmallComponent v-for="r in recipes" :key="r._id" :currentRecipe="r" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted, computed, watch, reactive } from "vue";
import { useRoute, useRouter } from "vue-router";
import recipeHandler from "@/composables/recipeHandler";
import reviewHandler from "@/composables/reviewHandler";
import RecipeCardSmallComponent from "@/components/RecipeCardSmallComponent.vue";
import ReviewComponent from "@/components/ReviewComponent.vue";

export default {
  components: {
    RecipeCardSmallComponent,
    ReviewComponent
  },
  setup() {
    const { recipes, recipe, getAllRecipes, getOneRecipe, categories, getAllCategoriesOfRecipe, reviews, getAllReviewsOfRecipe } = recipeHandler()
    const { newReview } = reviewHandler()

    const route = useRoute();
    const router = useRouter();
    const recipeId = computed(() => route.params.id);
    const form = reactive({
      comment: "",
      rating: 0,
      recipeId: recipeId.value,
      createdAt: new Date(),
    });

    onMounted(() => {
      getOneRecipe(recipeId.value)
      getAllCategoriesOfRecipe(recipeId.value)
      getAllReviewsOfRecipe(recipeId.value)
      getAllRecipes(5)

      watch(recipeId, (newId) => {
        if (newId !== undefined) {
          getOneRecipe(newId)
          getAllCategoriesOfRecipe(newId)
          getAllReviewsOfRecipe(newId)
        }
      })
    })

    const submitForm = async () => {
      const response = await newReview(form);

      if (!response) {
        router.push({
          path: '/login',
          query: {
            notificationType: 'error',
            notificationText: 'You must be logged in to add a comment.'
          }
        });
      }

      // Reset the form
      form.comment = "";
      form.rating = 0;
      form.createdAt = new Date();

      // Fetch all reviews
      getAllReviewsOfRecipe(recipeId.value);
    };

    return { recipes, recipe, categories, reviews, form, submitForm }
  }
}
</script>
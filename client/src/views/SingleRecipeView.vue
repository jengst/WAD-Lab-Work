<template>
  <div>
    <h1>Recipes</h1>
    <p>{{ recipe }}</p>
  </div>
</template>

<script>
import { onMounted } from "vue";
import recipecrud from "../modules/recipecrud";

export default {
  setup() {
    const { state, editRecipe, getSpecificRecipe, recipe, recipeId } = recipecrud()

    onMounted(() => {
      getSpecificRecipe()
    })

    return { state, editRecipe, getSpecificRecipe, recipe, recipeId }
  }
}
</script>
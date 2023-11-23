import { createRouter, createWebHistory } from 'vue-router'
import userHandler from "@/composables/userHandler";
const { token } = userHandler();

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/HomeView.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/LoginView.vue')
  },
  {
    path: '/signup',
    name: 'signup',
    component: () => import('../views/SignupView.vue')
  },
  {
    path: '/recipes',
    name: 'recipes',
    component: () => import('../views/RecipesView.vue')
  },
  {
    path: '/recipe/:id',
    name: 'singleRecipe',
    component: () => import('../views/SingleRecipeView.vue')
  },
  {
    path: '/recipe/:id/edit',
    name: 'singleRecipeEdit',
    component: () => import('../views/SingleRecipeView.vue'),
    meta: { requiresAuth: true },
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !token.value) {
    // If route requires authentication and user is not logged in
    next({
      path: '/login',
      query: {
        notificationType: 'error',
        notificationText: 'You must be logged in to view that page.'
      }
    });
  } else {
    next(); // Proceed to the requested route
  }
});

export default router

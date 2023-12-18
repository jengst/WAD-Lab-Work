<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="container">
      <router-link to="/" class="navbar-brand" href="#">CookBook Connect</router-link>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbar"
        aria-controls="navbar" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbar">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item"><router-link class="nav-link" :class="isActive('/')" to="/">Home</router-link></li>
          <li class="nav-item"><router-link class="nav-link" :class="isActive('/recipes')"
              to="/recipes">Recipes</router-link></li>
          <li class="nav-item"><router-link class="nav-link" :class="isActive('/categories')"
              to="/categories">Categories</router-link></li>
          <li class="nav-item"><router-link class="nav-link" :class="isActive('/about')" to="/about">About</router-link>
          </li>
        </ul>
        <div v-if="isTokenPresent">
          <button type="button" class="btn btn-outline-light me-2" @click="logout">Logout</button>
        </div>
        <div v-else>
          <router-link to="/login"><button type="button" class="btn btn-outline-light me-2">Login</button></router-link>
          <router-link to="/signup"><button type="button" class="btn btn-warning">Signup</button></router-link>
        </div>
      </div>
    </div>
  </nav>

  <div class="container pt-5 text-center" v-if="notification.text">
    <div class="alert m-auto d-inline-block" role="alert" :class="alertClass">
      {{ notification.text }}
    </div>
  </div>

  <router-view />

  <footer class="container mt-4">
    <ul class="nav justify-content-center border-bottom pb-3 mb-3">
      <li class="nav-item"><router-link class="nav-link px-2 text-body-secondary" to="/">Home</router-link></li>
      <li class="nav-item"><router-link class="nav-link px-2 text-body-secondary" to="/create-recipe">Submit
          recipe</router-link>
      </li>
      <li class="nav-item"><router-link class="nav-link px-2 text-body-secondary" to="/admin/create-category">Admin:
          Delete
          reviews</router-link></li>
      <li class="nav-item"><router-link class="nav-link px-2 text-body-secondary" to="/admin/delete-reviews">Admin: Add
          category</router-link></li>
      <li class="nav-item"><router-link class="nav-link px-2 text-body-secondary" to="/about">About</router-link></li>
    </ul>
    <p class="text-center text-body-secondary">© 2023 CookBook Connect</p>
  </footer>
</template>

<script>
import { computed, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import userHandler from "@/composables/userHandler";

export default {
  setup() {
    const { token, logoutUser } = userHandler();
    const route = useRoute();
    const router = useRouter();
    const isTokenPresent = computed(() => !!token.value);
    const notification = ref({
      type: "",
      text: ""
    });

    watch(() => route.query, newQuery => {
      notification.value.type = newQuery.notificationType || "";
      notification.value.text = newQuery.notificationText || "";
    });

    const logout = () => {
      logoutUser();
      router.push({
        path: '/', query: {
          notificationType: 'success',
          notificationText: 'You have been logged out successfully!'
        }
      });
    };

    const alertClass = computed(() => {
      switch (notification.value.type) {
        case 'success':
          return 'alert-success';
        case 'error':
          return 'alert-danger';
        default:
          return 'alert-primary';
      }
    });

    const isActive = (path) => {
      return route.path === path ? 'active' : '';
    };

    return {
      isTokenPresent,
      logout,
      notification,
      alertClass,
      isActive
    };
  },
};
</script>

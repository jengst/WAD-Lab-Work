<template>
  <header class="p-3 text-bg-dark">
    <div class="container">
      <div class="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">

        <ul class="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
          <li><router-link class="nav-link px-2 text-white" to="/">Home</router-link></li>
          <li><router-link class="nav-link px-2 text-white" to="/recipes">Recipes</router-link></li>
          <li><router-link class="nav-link px-2 text-white" to="/categories">Categories</router-link></li>
          <li><router-link class="nav-link px-2 text-white" to="/about">About</router-link></li>
        </ul>

        <div class="text-end" v-if="isTokenPresent">
          <button type="button" class="btn btn-outline-light me-2" @click="logout">Logout</button>
        </div>
        <div class="text-end" v-else>
          <router-link to="/login"><button type="button" class="btn btn-outline-light me-2">Login</button></router-link>
          <router-link to="/signup"><button type="button" class="btn btn-warning">Signup</button></router-link>
        </div>
      </div>
    </div>
  </header>

  <div class="container pt-5 text-center" v-if="notification.text">
    <div class="alert m-auto d-inline-block" role="alert" :class="alertClass">
      {{ notification.text }}
    </div>
  </div>

  <router-view />

  <div class="container">
    <footer class="py-3 my-4">
      <ul class="nav justify-content-center border-bottom pb-3 mb-3">
        <li class="nav-item"><router-link class="nav-link px-2 text-body-secondary" to="/">Home</router-link></li>
        <li class="nav-item"><router-link class="nav-link px-2 text-body-secondary" to="/recipes">Recipes</router-link>
        </li>
        <li class="nav-item"><router-link class="nav-link px-2 text-body-secondary"
            to="/categories">Categories</router-link></li>
        <li class="nav-item"><router-link class="nav-link px-2 text-body-secondary" to="/about">About</router-link></li>
      </ul>
      <p class="text-center text-body-secondary">© 2023 CookBook Connect</p>
    </footer>
  </div>
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

    return {
      isTokenPresent,
      logout,
      notification,
      alertClass
    };
  },
};
</script>

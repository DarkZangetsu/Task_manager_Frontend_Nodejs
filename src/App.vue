<template>
  <div class="min-h-screen flex bg-gray-100">
    <!-- Sidebar -->
    <div v-if="showSidebar && isAuthenticated" class="bg-white shadow-md w-64 flex-shrink-0 flex flex-col">
      <div class="flex items-center justify-center h-16 border-b">
        <img class="h-8 w-auto" src="@/assets/logo.png" alt="Logo">
      </div>
      <nav class="mt-6 flex-1 px-2 space-y-2">
        <router-link to="/" class="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-200 rounded-lg">
          <i class="fas fa-home mr-3"></i> Accueil
        </router-link>
        <router-link v-if="isAuthenticated" to="/tasks" class="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-200 rounded-lg">
          <i class="fas fa-tasks mr-3"></i> Tâches
        </router-link>
        <router-link v-if="isAdmin" to="/users" class="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-200 rounded-lg">
          <i class="fas fa-users mr-3"></i> Utilisateurs
        </router-link>
        <a v-if="isAuthenticated" href="#" @click.prevent="logout" class="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-200 rounded-lg">
          <i class="fas fa-sign-out-alt mr-3"></i> Déconnexion
        </a>
        <router-link v-else to="/login" class="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-200 rounded-lg">
          <i class="fas fa-sign-in-alt mr-3"></i> Connexion
        </router-link>
      </nav>
    </div>

    <!-- Main Content -->
    <main :class="[showSidebar ? 'flex-1 p-6' : 'flex-1 flex items-center justify-center']">
      <router-view></router-view>
    </main>
  </div>
</template>

<script>
import { computed } from 'vue'
import { useStore } from 'vuex'
import { useRouter, useRoute } from 'vue-router'

export default {
  name: 'App',
  setup() {
    const store = useStore()
    const router = useRouter()
    const route = useRoute()
    const isAuthenticated = computed(() => store.getters['auth/isAuthenticated'])
    const isAdmin = computed(() => store.getters['auth/isAdmin'])

    const logout = () => {
      store.dispatch('auth/logout')
      router.push('/')
    }

    const showSidebar = computed(() => !['/login', '/register'].includes(route.path))

    return {
      isAuthenticated,
      isAdmin,
      logout,
      showSidebar
    }
  }
}
</script>

<style>
@import 'tailwindcss/base';
@import 'tailwindcss/components';
@import 'tailwindcss/utilities';

body {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
}

#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>

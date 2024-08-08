<template>
  <div class="home bg-gradient-to-br from-blue-50 to-indigo-100 text-gray-800 min-h-screen flex items-center justify-center p-4 sm:p-8">
    <div class="max-w-4xl w-full bg-white rounded-2xl shadow-xl overflow-hidden">
      <div class="p-8 md:p-12">
        <h1 class="text-3xl md:text-4xl font-bold text-indigo-900 mb-4">Gestion de tâches simplifiée</h1>
        
        <div v-if="isAuthenticated">
          <p class="text-xl text-indigo-600 font-semibold mb-6">
            Bienvenue, {{ user.name }} {{ user.lastname }} !
          </p>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <router-link to="/tasks" class="dashboard-card bg-blue-100 hover:bg-blue-200">
              <i class="fas fa-tasks text-3xl text-blue-600 mb-2"></i>
              <span class="text-lg font-medium">Les tâches</span>
            </router-link>
            <router-link to="/tasks" class="dashboard-card bg-green-100 hover:bg-green-200">
              <i class="fas fa-plus-circle text-3xl text-green-600 mb-2"></i>
              <span class="text-lg font-medium">Liste des tâches</span>
            </router-link>
            <router-link to="/profile" class="dashboard-card bg-purple-100 hover:bg-purple-200">
              <i class="fas fa-user text-3xl text-purple-600 mb-2"></i>
              <span class="text-lg font-medium">Mon profil</span>
            </router-link>
            <router-link v-if="isAdmin" to="/users" class="dashboard-card bg-yellow-100 hover:bg-yellow-200">
              <i class="fas fa-users text-3xl text-yellow-600 mb-2"></i>
              <span class="text-lg font-medium">Gérer les utilisateurs</span>
            </router-link>
          </div>
        </div>
        
        <div v-else>
          <p class="text-lg text-gray-600 mb-6">Commencez à organiser vos tâches dès maintenant</p>
          <div class="flex items-center justify-center flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
            <router-link to="/login" class="btn-primary">
              <i class="fas fa-sign-in-alt mr-2"></i>Se connecter
            </router-link>
            <router-link to="/register" class="btn-secondary">
              <i class="fas fa-user-plus mr-2"></i>S'inscrire
            </router-link>
          </div>
          <div class="mt-8">
            <img src="@/assets/task_manager.jpg" alt="Task Manager" class="w-full max-w-md mx-auto">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue'
import { useStore } from 'vuex'

export default {
  name: 'Home',
  setup() {
    const store = useStore()
    const isAuthenticated = computed(() => store.getters['auth/isAuthenticated'])
    const isAdmin = computed(() => store.getters['auth/isAdmin'])
    const user = computed(() => store.state.auth.user)

    return {
      isAuthenticated,
      isAdmin,
      user
    }
  }
}
</script>

<style scoped>
.btn-primary {
  @apply bg-indigo-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-indigo-700 transition duration-300 ease-in-out flex items-center justify-center;
}

.btn-secondary {
  @apply bg-white text-indigo-600 font-semibold py-3 px-6 rounded-lg border border-indigo-600 hover:bg-indigo-50 transition duration-300 ease-in-out flex items-center justify-center;
}

.dashboard-card {
  @apply flex flex-col items-center justify-center p-6 rounded-xl transition duration-300 ease-in-out;
}
</style>
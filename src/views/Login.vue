<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg transform transition-all hover:scale-105">
      <div>
        <img class="mx-auto h-12 w-auto" src="@/assets/logo.png" alt="Logo">
        <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Connexion
        </h2>
      </div>
      <form @submit.prevent="onSubmit" class="mt-8 space-y-6">
        <div class="rounded-md shadow-sm space-y-4">
          <div>
            <label for="email" class="sr-only">Email</label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <i class="fas fa-envelope text-gray-400"></i>
              </div>
              <input id="email" v-model="email" type="email" required 
                     class="appearance-none rounded-md relative block w-full px-3 py-2 pl-10 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                     placeholder="Adresse email">
            </div>
          </div>
          <div>
            <label for="password" class="sr-only">Mot de passe</label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <i class="fas fa-lock text-gray-400"></i>
              </div>
              <input :type="showPassword ? 'text' : 'password'" id="password" v-model="password" required 
                     class="appearance-none rounded-md relative block w-full px-3 py-2 pl-10 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                     placeholder="Mot de passe">
              <button type="button" @click="togglePassword" class="absolute inset-y-0 right-0 pr-3 flex items-center">
                <i :class="['fas', showPassword ? 'fa-eye-slash' : 'fa-eye', 'text-gray-400']"></i>
              </button>
            </div>
          </div>
        </div>

        <div class="flex items-center justify-between">
          <div class="flex items-center">
            <input id="remember-me" name="remember-me" type="checkbox" class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded">
            <label for="remember-me" class="ml-2 block text-sm text-gray-900">
              Se souvenir de moi
            </label>
          </div>

          <div class="text-sm">
            <a href="#" class="font-medium text-blue-600 hover:text-blue-500">
              Mot de passe oublié ?
            </a>
          </div>
        </div>

        <div>
          <button type="submit" class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-300">
            <span class="absolute left-0 inset-y-0 flex items-center pl-3">
              <i class="fas fa-sign-in-alt text-blue-500 group-hover:text-blue-400"></i>
            </span>
            Connexion
          </button>
        </div>
      </form>
      <div class="text-center mt-4">
        <span class="text-gray-600">Vous n'avez pas de compte ?</span>
        <a href="/register" class="font-medium text-blue-600 hover:text-blue-500 ml-1">Inscrivez-vous</a>
      </div>
    </div>
  </div>

  <!-- Message de dialogue -->
  <transition name="fade">
    <div v-if="showMessage" class="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div class="bg-white p-6 rounded-lg shadow-xl max-w-sm w-full mx-4">
        <p :class="{'text-green-600': messageType === 'success', 'text-red-600': messageType === 'error'}" class="text-center">
          {{ message }}
        </p>
        <button @click="closeMessage" class="mt-4 w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors duration-300">
          Fermer
        </button>
      </div>
    </div>
  </transition>
</template>

<script>
import { ref } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

export default {
  name: 'Login',
  setup() {
    const store = useStore()
    const router = useRouter()
    const email = ref('')
    const password = ref('')
    const showPassword = ref(false)
    const showMessage = ref(false)
    const message = ref('')
    const messageType = ref('success')

    const onSubmit = async () => {
      try {
        await store.dispatch('auth/login', {
          email: email.value,
          password: password.value
        })
        showDialogMessage('Connexion réussie!', 'success')
        router.push('/')
      } catch (error) {
        showDialogMessage('Erreur de connexion: ' + error.message, 'error')
      }
    }

    const togglePassword = () => {
      showPassword.value = !showPassword.value
    }

    const showDialogMessage = (msg, type) => {
      message.value = msg
      messageType.value = type
      showMessage.value = true
    }

    const closeMessage = () => {
      showMessage.value = false
    }

    return {
      email,
      password,
      onSubmit,
      showPassword,
      togglePassword,
      showMessage,
      message,
      messageType,
      closeMessage
    }
  }
}
</script>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>
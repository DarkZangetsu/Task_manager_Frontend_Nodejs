<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100">
    <div class="user-form w-full max-w-md mx-auto p-8 bg-white shadow-md rounded-lg">
      <div class="flex items-center justify-between mb-6">
        <h2 class="text-2xl font-bold text-center">
          {{ isEditing ? 'Modifier l\'utilisateur' : 'Nouvel utilisateur' }}
        </h2>
        <button @click="goBack" class="text-blue-500 hover:text-blue-600 focus:outline-none">
          <i class="fas fa-arrow-left"></i> Retour
        </button>
      </div>
      <form @submit.prevent="onSubmit" class="space-y-6">
        <div>
          <label for="name" class="block text-lg font-medium text-gray-700">Prénom :</label>
          <input
            type="text"
            id="name"
            v-model="name"
            required
            class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Entrez le prénom"
          />
        </div>
        <div>
          <label for="lastname" class="block text-lg font-medium text-gray-700">Nom :</label>
          <input
            type="text"
            id="lastname"
            v-model="lastname"
            required
            class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Entrez le nom"
          />
        </div>
        <div>
          <label for="email" class="block text-lg font-medium text-gray-700">Email :</label>
          <input
            type="email"
            id="email"
            v-model="email"
            required
            class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Entrez l'email"
          />
        </div>
        <div v-if="!isEditing">
          <label for="password" class="block text-lg font-medium text-gray-700">Mot de passe :</label>
          <input
            type="password"
            id="password"
            v-model="password"
            required
            class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Entrez le mot de passe"
          />
        </div>
        <div>
          <label for="role" class="block text-lg font-medium text-gray-700">Rôle :</label>
          <select
            id="role"
            v-model="role"
            class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="normal">Normal</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        <button
          type="submit"
          class="w-full bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {{ isEditing ? 'Mettre à jour' : 'Créer' }}
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue'
import { useStore } from 'vuex'
import { useRouter, useRoute } from 'vue-router'

export default {
  name: 'UserForm',
  setup() {
    const store = useStore()
    const router = useRouter()
    const route = useRoute()
    const name = ref('')
    const lastname = ref('')
    const email = ref('')
    const password = ref('')
    const role = ref('normal')
    const isEditing = computed(() => !!route.params.id)

    onMounted(async () => {
      if (isEditing.value) {
        const user = store.getters['users/allUsers'].find(u => u.id === parseInt(route.params.id))
        if (user) {
          name.value = user.name
          lastname.value = user.lastname
          email.value = user.email
          role.value = user.role
        }
      }
    })

    const onSubmit = async () => {
      const userData = {
        name: name.value,
        lastname: lastname.value,
        email: email.value,
        role: role.value
      }

      if (!isEditing.value) {
        userData.password = password.value
      }

      try {
        if (isEditing.value) {
          await store.dispatch('users/updateUser', { id: route.params.id, ...userData })
        } else {
          await store.dispatch('users/addUser', userData)
        }
        router.push('/users')
      } catch (error) {
        console.error('Erreur lors de la sauvegarde de l\'utilisateur:', error)
      }
    }

    const goBack = () => {
      router.push('/users')
    }

    return {
      name,
      lastname,
      email,
      password,
      role,
      isEditing,
      onSubmit,
      goBack
    }
  }
}
</script>

<style scoped>
.user-form {
  max-width: 400px;
  width: 100%;
  background-color: #fff;
  border-radius: 0.5rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  padding: 2rem;
}

.user-form h2 {
  color: #4a5568;
  font-weight: bold;
  margin-bottom: 1.5rem;
}

.user-form label {
  color: #718096;
  font-weight: medium;
}

.user-form input,
.user-form select {
  border-color: #e2e8f0;
  border-radius: 0.375rem;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
  padding: 0.5rem 1rem;
  font-size: 1rem;
  line-height: 1.5;
}

.user-form input:focus,
.user-form select:focus {
  border-color: #4a90e2;
  box-shadow: 0 0 0 3px rgba(74, 144, 226, 0.5);
  outline: none;
}

.user-form button {
  background-color: #4a90e2;
  color: #fff;
  font-weight: bold;
  border-radius: 0.375rem;
  padding: 0.5rem 1rem;
  transition: background-color 0.3s ease;
}

.user-form button:hover {
  background-color: #3d7abe;
}
</style>
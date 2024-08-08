<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100">
    <div class="task-form w-full max-w-lg mx-auto p-8 bg-white shadow-md rounded-lg">
      <div class="flex items-center justify-between mb-6">
        <h2 class="text-2xl font-bold text-center">
          {{ isEditing ? 'Modifier la tâche' : 'Nouvelle tâche' }}
        </h2>
        <button @click="goBack" class="text-blue-500 hover:text-blue-600 focus:outline-none">
          <i class="fas fa-arrow-left"></i> Retour
        </button>
      </div>
      <form @submit.prevent="onSubmit" class="space-y-6">
        <!-- Champ Nom -->
        <div>
          <label for="name" class="block text-lg font-medium text-gray-700">Nom :</label>
          <input
            type="text"
            id="name"
            v-model="name"
            :disabled="!isAdmin && isEditing"
            required
            class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Entrez le nom de la tâche"
          />
        </div>
        <!-- Champ Description -->
        <div>
          <label for="description" class="block text-lg font-medium text-gray-700">Description :</label>
          <textarea
            id="description"
            v-model="description"
            :disabled="!isAdmin && isEditing"
            class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Entrez la description de la tâche"
          ></textarea>
        </div>
        <!-- Champ Utilisateur -->
        <div v-if="isAdmin">
          <label for="user" class="block text-lg font-medium text-gray-700">Utilisateur :</label>
          <select
            id="user"
            v-model="selectedUserId"
            :disabled="!isAdmin && isEditing"
            class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option v-for="user in users" :key="user.id" :value="user.id">
              {{ user.name }}
            </option>
          </select>
        </div>
        <!-- Champ Statut -->
        <div>
          <label for="status" class="block text-lg font-medium text-gray-700">Statut :</label>
          <select
            id="status"
            v-model="status"
            class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="à faire">À faire</option>
            <option value="en cours">En cours</option>
            <option value="terminé">Terminé</option>
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
  name: 'TaskForm',
  setup() {
    const store = useStore()
    const router = useRouter()
    const route = useRoute()
    const name = ref('')
    const description = ref('')
    const status = ref('à faire')
    const selectedUserId = ref(null)
    const users = computed(() => store.getters['users/allUsers'])
    const isAdmin = computed(() => store.getters['auth/isAdmin'])
    const isEditing = computed(() => !!route.params.id)

    onMounted(async () => {
      try {
        await store.dispatch('users/fetchUsers')
      } catch (error) {
        console.error('Erreur lors de la récupération des utilisateurs:', error)
      }

      if (isEditing.value) {
        const task = store.getters['tasks/allTasks'].find(t => t.id === parseInt(route.params.id))
        if (task) {
          name.value = task.name
          description.value = task.description
          status.value = task.status
          selectedUserId.value = task.Pid_person
        }
      }
    })

    const onSubmit = async () => {
      const taskData = {
        name: name.value,
        description: description.value,
        status: status.value,
        Pid_person: selectedUserId.value
      }

      try {
        if (isEditing.value) {
          await store.dispatch('tasks/updateTask', { id: route.params.id, ...taskData })
        } else {
          await store.dispatch('tasks/addTask', taskData)
        }
        router.push('/tasks')
      } catch (error) {
        console.error('Erreur lors de la sauvegarde de la tâche:', error)
      }
    }

    const goBack = () => {
      router.push('/tasks')
    }

    return {
      name,
      description,
      status,
      selectedUserId,
      users,
      isEditing,
      isAdmin,
      onSubmit,
      goBack
    }
  }
}
</script>
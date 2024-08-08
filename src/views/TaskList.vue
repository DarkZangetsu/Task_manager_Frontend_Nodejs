<template>
  <div class="task-list p-4 flex flex-col items-center">
    <h2 class="text-3xl font-bold mb-6">Gestion des Tâches</h2>
    <router-link
      v-if="isAdmin"
      to="/tasks/new"
      class="inline-block mb-6 bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600"
    >
      + Créer une Nouvelle Tâche
    </router-link>
    <p class="mb-6 text-lg">Tâches affichées : {{ displayedTasks.length }}</p>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-8 justify-center">
      <div
        v-for="task in displayedTasks"
        :key="task.id"
        class="bg-white shadow-lg rounded-lg p-6 border border-gray-300 w-80"
      >
        <div class="flex items-center mb-4">
          <h3 class="text-xl font-semibold flex-1">{{ task.name }}</h3>
          <span class="text-sm bg-gray-200 text-gray-800 py-1 px-3 rounded-full">
            {{ task.status }}
          </span>
        </div>
        <p class="mb-4 text-gray-700">Assignée à : {{ getUserNameById(task.Pid_person) }}</p>
        <div class="flex space-x-3">
          <button
            @click="editTask(task.id)"
            class="flex items-center bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="2"
              stroke="currentColor"
              class="w-5 h-5 mr-2"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M15.232 5.232l3.536 3.536M9 13h6m2 2H9m0 0l-3-3m3 3v6m6-6l3-3m-3 3v6m6-6H9m3-6h6m-6 0V7m0 3V7m-3-3h6m-6 0L9 3m3 3l-3-3m3 3L9 3m0 3h6"
              />
            </svg>
            Modifier
          </button>
          <button
            v-if="isAdmin"
            @click="deleteTask(task.id)"
            class="flex items-center bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="2"
              stroke="currentColor"
              class="w-5 h-5 mr-2"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
            Supprimer
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, onMounted } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

export default {
  name: 'TaskList',
  setup() {
    const store = useStore();
    const router = useRouter();
    const allTasks = computed(() => store.getters['tasks/allTasks']);
    const allUsers = computed(() => store.getters['users/allUsers']);
    const isAdmin = computed(() => store.getters['auth/isAdmin']);
    const currentUser = computed(() => store.state.auth.user);

    const displayedTasks = computed(() => {
      if (isAdmin.value) {
        return allTasks.value;  
      } else if (currentUser.value && currentUser.value.id) {
        return allTasks.value.filter(task => task.Pid_person === currentUser.value.id);
      } else {
        return [];
      }
    });

    const getUserNameById = (id) => {
      const user = allUsers.value.find(user => user.id === id);
      return user ? user.name : 'Utilisateur non valide'; 
    };

    onMounted(async () => {
      try {
        await store.dispatch('tasks/fetchTasks');
        await store.dispatch('users/fetchUsers');
      } catch (error) {
        console.error('Erreur lors de la récupération des données:', error);
      }
    });

    const editTask = (id) => {
      router.push(`/tasks/${id}`);
    };

    const deleteTask = async (id) => {
      if (confirm('Êtes-vous sûr de vouloir supprimer cette tâche ?')) {
        try {
          await store.dispatch('tasks/deleteTask', id);
        } catch (error) {
          console.error('Erreur lors de la suppression de la tâche:', error);
        }
      }
    };

    return {
      displayedTasks,
      isAdmin,
      editTask,
      deleteTask,
      getUserNameById
    };
  }
};
</script>


<style scoped>
.task-list {
  max-width: 1200px;
  margin: auto;
}
</style>

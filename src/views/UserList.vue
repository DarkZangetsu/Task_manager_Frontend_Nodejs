<template>
  <div class="min-h-screen bg-gradient-to-br flex items-start justify-center bg-gray-100 p-6">
    <div class="w-full max-w-4xl bg-white shadow-md rounded-lg overflow-hidden">
      <div class="flex justify-between items-center p-6 border-b bg-blue-100">
        <h2 class="text-2xl font-bold text-gray-800">Liste des utilisateurs</h2>
        <router-link
          to="/users/new"
          class="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600 transition duration-300"
        >
          + Nouvel utilisateur
        </router-link>
      </div>
      <div class="overflow-x-auto">
        <table class="min-w-full bg-white">
          <thead>
            <tr class="w-full bg-gray-50 text-gray-700 uppercase text-sm leading-normal">
              <th class="py-4 px-6 text-left">Nom</th>
              <th class="py-4 px-6 text-left">Prénom</th>
              <th class="py-4 px-6 text-left">Email</th>
              <th class="py-4 px-6 text-left">Rôle</th>
              <th class="py-4 px-6 text-left w-48">Actions</th> <!-- Colonne Actions élargie -->
            </tr>
          </thead>
          <tbody class="text-gray-600 text-sm font-light">
            <tr
              v-for="user in users"
              :key="user.id"
              class="border-b border-gray-200 hover:bg-gray-100 transition duration-200"
            >
              <td class="py-4 px-6 text-left whitespace-nowrap">{{ user.name }}</td>
              <td class="py-4 px-6 text-left">{{ user.lastname }}</td>
              <td class="py-4 px-6 text-left">{{ user.email }}</td>
              <td class="py-4 px-6 text-left">{{ user.role }}</td>
              <td class="py-4 px-6 text-left">
                <div class="flex gap-3"> <!-- Utilisation de gap-3 pour espacer les boutons -->
                  <button
                    @click="editUser(user.id)"
                    class="bg-yellow-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-yellow-600 transition duration-300 flex items-center"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="2"
                      stroke="currentColor"
                      class="w-5 h-5 inline-block mr-2"
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
                    @click="deleteUser(user.id)"
                    class="bg-red-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-red-600 transition duration-300 flex items-center"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="2"
                      stroke="currentColor"
                      class="w-5 h-5 inline-block mr-2"
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
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, onMounted } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

export default {
  name: 'UserList',
  setup() {
    const store = useStore()
    const router = useRouter()
    const users = computed(() => store.getters['users/allUsers'])

    onMounted(() => {
      store.dispatch('users/fetchUsers')
    })

    const editUser = (id) => {
      router.push(`/users/${id}`)
    }

    const deleteUser = async (id) => {
      if (confirm('Êtes-vous sûr de vouloir supprimer cet utilisateur ?')) {
        await store.dispatch('users/deleteUser', id)
      }
    }

    return {
      users,
      editUser,
      deleteUser
    }
  }
}
</script>

<style>
.table-row:hover {
  background-color: #f5f5f5;
  transition: background-color 0.3s ease;
}

button {
  transition: background-color 0.3s ease;
}

button:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
</style>

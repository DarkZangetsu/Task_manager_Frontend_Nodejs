import axios from 'axios'

const state = {
  tasks: []
}

const getters = {
  allTasks: state => state.tasks
}

const actions = {
  async fetchTasks({ commit }) {
    const response = await axios.get('http://localhost:3000/api/tasks')
    commit('setTasks', response.data)
  },
  async addTask({ commit }, task) {
    const response = await axios.post('http://localhost:3000/api/tasks', task)
    commit('newTask', response.data)
  },
  async updateTask({ commit }, task) {
    const response = await axios.put(`http://localhost:3000/api/tasks/${task.id}`, task)
    commit('updateTask', response.data)
  },
  async deleteTask({ commit }, id) {
    await axios.delete(`http://localhost:3000/api/tasks/${id}`)
    commit('removeTask', id)
  }
}

const mutations = {
  setTasks: (state, tasks) => (state.tasks = tasks),
  newTask: (state, task) => state.tasks.unshift(task),
  updateTask: (state, updatedTask) => {
    const index = state.tasks.findIndex(task => task.id === updatedTask.id)
    if (index !== -1) {
      state.tasks.splice(index, 1, updatedTask)
    }
  },
  removeTask: (state, id) => (state.tasks = state.tasks.filter(task => task.id !== id))
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
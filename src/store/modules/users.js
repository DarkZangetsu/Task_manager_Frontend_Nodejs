import axios from 'axios'

const state = {
  users: []
}

const getters = {
  allUsers: state => state.users
}

const actions = {
  async fetchUsers({ commit }) {
    const response = await axios.get('http://localhost:3000/api/users')
    commit('setUsers', response.data)
  },
  async addUser({ commit }, user) {
    const response = await axios.post('http://localhost:3000/api/users', user)
    commit('newUser', response.data)
  },
  async updateUser({ commit }, user) {
    const response = await axios.put(`http://localhost:3000/api/users/${user.id}`, user)
    commit('updateUser', response.data)
  },
  async deleteUser({ commit }, id) {
    await axios.delete(`http://localhost:3000/api/users/${id}`)
    commit('removeUser', id)
  }
}

const mutations = {
  setUsers: (state, users) => (state.users = users),
  newUser: (state, user) => state.users.unshift(user),
  updateUser: (state, updatedUser) => {
    const index = state.users.findIndex(user => user.id === updatedUser.id)
    if (index !== -1) {
      state.users.splice(index, 1, updatedUser)
    }
  },
  removeUser: (state, id) => (state.users = state.users.filter(user => user.id !== id))
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
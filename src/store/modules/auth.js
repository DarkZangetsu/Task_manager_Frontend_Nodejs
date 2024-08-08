import axios from 'axios'

const state = {
  token: localStorage.getItem('token') || null,
  user: JSON.parse(localStorage.getItem('user')) || null
}

const getters = {
  isAuthenticated: state => !!state.token,
  isAdmin: state => state.user && state.user.role === 'admin'
}

const actions = {
  async login({ commit }, credentials) {
    const response = await axios.post('http://localhost:3000/api/auth/login', credentials)
    const { token, user } = response.data
    localStorage.setItem('token', token)
    localStorage.setItem('user', JSON.stringify(user))
    commit('setToken', token)
    commit('setUser', user)
  },
  async register(_, userData) {
    await axios.post('http://localhost:3000/api/auth/register', userData)
  },
  logout({ commit }) {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    commit('setToken', null)
    commit('setUser', null)
  }
}

const mutations = {
  setToken(state, token) {
    state.token = token
  },
  setUser(state, user) {
    state.user = user
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
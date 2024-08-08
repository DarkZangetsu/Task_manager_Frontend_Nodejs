import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import TaskList from '../views/TaskList.vue'
import TaskForm from '../views/TaskForm.vue'
import UserList from '../views/UserList.vue'
import UserForm from '../views/UserForm.vue'
import store from '../store'

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/login', name: 'Login', component: Login },
  { path: '/register', name: 'Register', component: Register },
  { path: '/tasks', name: 'TaskList', component: TaskList, meta: { requiresAuth: true } },
  { path: '/tasks/new', name: 'NewTask', component: TaskForm, meta: { requiresAuth: true } },
  { path: '/tasks/:id', name: 'EditTask', component: TaskForm, meta: { requiresAuth: true } },
  { path: '/users', name: 'UserList', component: UserList, meta: { requiresAuth: true, requiresAdmin: true } },
  { path: '/users/new', name: 'NewUser', component: UserForm, meta: { requiresAuth: true, requiresAdmin: true } },
  { path: '/users/:id', name: 'EditUser', component: UserForm, meta: { requiresAuth: true, requiresAdmin: true } },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  const isAuthenticated = store.getters['auth/isAuthenticated']
  const isAdmin = store.getters['auth/isAdmin']

  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!isAuthenticated) {
      next({ name: 'Login' })
    } else if (to.matched.some(record => record.meta.requiresAdmin) && !isAdmin) {
      next({ name: 'Home' })
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router
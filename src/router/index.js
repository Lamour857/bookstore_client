import { createRouter, createWebHistory } from 'vue-router'
import Layout from '../views/layout/index.vue'
import Auth from '../views/login/index.vue'
import Login from '../views/login/component/Login.vue'
import Register from '../views/login/component/Register.vue'
import Admin from '../views/admin/index.vue'
import AdminHome from '../views/admin/component/Home.vue'
import Category from '../views/admin/book/Category.vue'
import Book from '../views/admin/book/Book.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'layout',
      component: Layout,
    },

    {
      path: '/login',
      component: Auth,
      children: [
        {
          path: '',
          component: Login
        },
        {
          path: 'register',
          component: Register
        },
        {
          path: 'admin',
          component: Login
        },
      ]
    },
    {
      path: '/admin',
      name: 'admin',
      component: Admin,
      children: [
        {
          path: '',
          component: AdminHome
        },
        {
          path: 'book',
          component: Book
        },
        {
          path: 'category',
          component: Category
        },
        {
          path: 'order',
        },
        {
          path: 'user',
        }
      ]
    },
  ],
})

export default router

import { createRouter, createWebHistory } from 'vue-router'
import Projects from '../views/Projects.vue'
import Partners from '../views/Partners.vue'
import Contacts from '../views/Contacts.vue'
import Documents from '../views/Documents.vue'
import Login from '../views/Login.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/projects',
      meta: { requiresAuth: true }
    },
    {
      path: '/projects',
      name: 'projects',
      component: Projects,
      meta: { requiresAuth: true }
    },
    {
      path: '/projects/:id',
      name: 'project',
      component: () => import('../views/Project.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/partners',
      name: 'partners',
      component: Partners,
      meta: { requiresAuth: true }
    },
    {
      path: '/partners/:id',
      name: 'partner',
      component: () => import('../views/Partner.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/contacts',
      name: 'contacts',
      component: Contacts,
      meta: { requiresAuth: true }
    },
    {
      path: '/contacts/:id',
      name: 'contact',
      component: () => import('../views/Contact.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/documents',
      name: 'documents',
      component: Documents,
      meta: { requiresAuth: true }
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
    },
    {
      path: '/:pathMatch(.*)*',
      component: () => import('../views/PageNotFound.vue'),
      meta: { requiresAuth: true }
    }
  ],
  linkActiveClass: 'is-active',
  linkExactActiveClass: 'is-exact-active',
})

router.beforeEach(to => {
  if (to.meta.requiresAuth && !localStorage.getItem('token')) {
    return {
      path: '/login',
    }
  }
})

export default router

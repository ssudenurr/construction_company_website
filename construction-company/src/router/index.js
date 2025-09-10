import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ProjectsPage from '../views/ProjectsPage.vue'
import ProjectDetail from '../views/ProjectDetail.vue'

const routes = [
  { 
    path: '/', 
    name: 'home', 
    component: HomeView 
  },
  {
    path: '/projects/:type?',
    name: 'projects',
    component: ProjectsPage,
    props: route => ({ type: route.params.type || 'all' }) // ✅ return düzeltildi
  },
  {
    path: '/project-detail/:id',
    name: 'project-detail',
    component: ProjectDetail
  }
]

const router = createRouter({
  history: createWebHistory(), // ✅ SPA routing (history mode)
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (to.hash) return { el: to.hash, behavior: 'smooth' }
    else if (savedPosition) return savedPosition
    else return { top: 0 }
  },
})

router.afterEach((to) => {
  if (to.hash) history.replaceState(null, '', to.path)
})

export default router

import { createRouter, createWebHashHistory } from 'vue-router'
import EnvelopePage from '../views/EnvelopePage.vue'
import EditPage from '../views/EditPage.vue'

const routes = [
  { path: '/', component: EnvelopePage },
  { path: '/edit', component: EditPage }
]

export default createRouter({
  history: createWebHashHistory('/KeyMessage/'),
  routes
})
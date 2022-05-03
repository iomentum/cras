import { createWebHistory, createRouter } from "vue-router";
import MainView from '@/views/MainView.vue';
import PrintView from '@/views/PrintView.vue';

const routes = [
  {
    path: "/",
    name: "Home",
    component: MainView
  },
  {
    path: "/print",
    name: "PrintView",
    component: PrintView
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;

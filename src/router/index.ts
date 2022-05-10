import { createWebHistory, createRouter } from "vue-router";
import MainView from '@/views/MainView.vue';
import PrintView from '@/views/PrintView.vue';
import LogAndRegister from '@/components/LogAndRegister.vue';

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
  },
  {
    path: "/register",
    name: "Register",
    component: LogAndRegister
  },
  {
    path: "/login",
    name: "Login",
    component: LogAndRegister
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;

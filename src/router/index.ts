import { createWebHistory, createRouter } from "vue-router";
import MainView from '@/views/MainView.vue';
import PrintView from '@/views/PrintView.vue';
import Login from '@/views/Login.vue';
import EditProfile from '@/components/EditProfile.vue';

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
    path: "/login",
    name: "Login",
    component: Login
  },
  {
    path: "/edit-profile",
    name: "Profile",
    component: EditProfile
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;

import { createWebHistory, createRouter } from "vue-router";
import MainView from '@/views/MainView.vue';
import PrintView from '@/views/PrintView.vue';
import Login from '@/views/Login.vue';
import EditProfile from '@/components/User/EditProfile.vue';
import UsersCras from '@/components/Cra/UsersCras.vue';

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
  },
  {
    path: "/cras",
    name: "My cras",
    component: UsersCras
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;

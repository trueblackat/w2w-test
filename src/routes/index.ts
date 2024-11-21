import {createWebHistory, createRouter, RouteRecordRaw} from 'vue-router'

import DoctorsPage from '../pages/doctors.vue'
import NursesPage from '../pages/nurses.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Main',
    redirect: {
      name: 'Doctors',
    },
    meta: {
      title: 'Главная',
    },
    children: [
      {
        path: '/doctors',
        name: 'Doctors',
        component: DoctorsPage,
        meta: {
          title: 'Врачи',
        },
      },

      {
        path: '/nurses',
        name: 'Nurses',
        component: NursesPage,
        meta: {
          title: 'Медсестры',
        },
      },
    ]
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;

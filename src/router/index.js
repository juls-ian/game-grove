import SignIn from '@/components/user/SignIn.vue';
import Dashboard from '@/components/user/dashboard/Dashboard.vue';
import Articles from '@/components/user/admin/Articles.vue';
import AddArticle from '@/components/user/admin/AddArticle.vue';
import EditArticle from '@/components/user/admin/EditArticle.vue';
import UserProfile from '@/components/user/dashboard/UserProfile.vue';
import { createRouter, createWebHistory } from 'vue-router';
import { isAuthenticated, isLoggedIn } from '@/composables/authentication';
import Error404 from '@/components/404/Error404.vue';
import Home from '@/components/home/Home.vue';
import HomeArticle from '@/components/home/HomeArticle.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/article/:id',
      component: HomeArticle,
      name: 'home-article',
    },
    {
      path: '/signin',
      name: 'signin',
      component: SignIn,
      beforeEnter: isLoggedIn,
    },
    {
      path: '/user/dashboard',
      component: () => import('@/layouts/DashboardLayout.vue'),
      beforeEnter: isAuthenticated,
      children: [
        { path: '', component: Dashboard, name: 'dashboard' },
        { path: 'profile', component: UserProfile, name: 'user-profile' },
        { path: 'articles', component: Articles, name: 'articles' }, // admin articles
        { path: 'articles/add-article', component: AddArticle, name: 'add-article' },
        { path: 'articles/edit-article/:id', component: EditArticle, name: 'edit-article' },
      ],
    },
    { path: '/:notFound(.*)*', component: Error404, name: '404' },
  ],
});

export default router;

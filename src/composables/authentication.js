import { useUserStore } from '@/stores/user';
import { AUTH } from '@/firebase/config';
import { onAuthStateChanged } from 'firebase/auth';
import { ref } from 'vue';

export const firstLoad = () => {
  const userStore = useUserStore();
  const loading = ref(true);

  onAuthStateChanged(AUTH, async (user) => {
    if (user) {
      await userStore.autoLogin(user.uid);
    }
    loading.value = false;
  });
  return { loading };
};

export const isAuthenticated = () => {
  let user = AUTH.currentUser;
  // block user is none auth
  if (!user) return '/signin';
  return true;
};

export const isLoggedIn = () => {
  let user = AUTH.currentUser;
  if (user) return '/';
  console.log(user);
  return true;
};

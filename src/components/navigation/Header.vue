<script setup>
  import { useUserStore } from '@/stores/user';
  const userStore = useUserStore();
</script>

<template>
  <header>
    <div class="container header-container">
      <div class="logo">
        <RouterLink :to="{ name: 'home' }">GameGrove</RouterLink>
      </div>

      <div>
        <ul>
          <li><RouterLink :to="{ name: 'signin' }">Sign in</RouterLink></li>
          <span>
            <li>
              <RouterLink :to="{ name: 'dashboard' }">Dashboard</RouterLink>
            </li>
            <li @click="userStore.logout()" v-if="userStore.auth"><span>Logout</span></li>
          </span>
        </ul>
      </div>
    </div>
  </header>
</template>

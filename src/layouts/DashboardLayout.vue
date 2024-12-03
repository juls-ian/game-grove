<template>
  <div class="container-fluid">
    <div class="row">
      <nav id="sidebarMenu" class="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse">
        <div class="position-sticky pt-3">
          <ul class="nav flex-column">
            <li class="nav-item">
              <RouterLink :to="{ name: 'dashboard' }" class="nav-link">
                <v-icon icon="mdi-view-dashboard" />
                Dashboard
              </RouterLink>
            </li>
            <li class="nav-item">
              <RouterLink :to="{ name: 'user-profile' }" class="nav-link">
                <v-icon icon="mdi-account-tie"></v-icon>
                UserProfile</RouterLink
              >
            </li>
            <li class="nav-item" v-show="userStore.user.isAdmin">
              <RouterLink :to="{ name: 'articles' }" class="nav-link">
                <v-icon icon="mdi-newspaper" />

                Articles</RouterLink
              >
            </li>
            <li class="nav-item" v-show="userStore.user.isAdmin">
              <RouterLink :to="{ name: 'add-article' }" class="nav-link">
                <v-icon icon="mdi-newspaper-plus" />

                Add Articles</RouterLink
              >
            </li>
          </ul>
        </div>
      </nav>

      <main id="admin-body" class="col-md-9 ms-sm-auto col-lg-10 px-md-4">
        <div>
          <RouterView />
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
  import { useUserStore } from '@/stores/user';
  const userStore = useUserStore();
</script>

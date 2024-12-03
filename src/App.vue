<script setup>
  import Header from '@/components/navigation/Header.vue';
  import { firstLoad } from './composables/authentication';

  const { loading } = firstLoad();
</script>

<template>
  <div class="text-center m3" v-if="loading">
    <v-progress-circular indeterminate color="primary" class="loader" />
  </div>
  <div v-else>
    <Header />
    <RouterView />
  </div>
</template>

<style scoped>
  .loader {
    margin-top: 20rem;
  }
</style>

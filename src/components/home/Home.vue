<template>
  <main class="container">
    <Carousel class="carousel" />
    <HomeArticles class="articles" />
  </main>
</template>

<script setup>
  import Carousel from '@/components/carousel/Carousel.vue';
  import HomeArticles from '@/components/home/HomeArticles.vue';
  import { useArticleStore } from '@/stores/articles';

  const articleStore = useArticleStore();
  //   only load articles once
  if (!articleStore.homeArticles) {
    articleStore.fetchHomeArticles(10);
  }
</script>

<style lang="scss" scoped>
  .carousel {
    margin-bottom: 2rem;
  }
</style>

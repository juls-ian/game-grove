<template>
  <div v-if="articleStore.getFeaturedArticles">
    <Carousel :items-to-show="1" :wrap-around="true" class="p-top">
      <Slide v-for="featured in articleStore.getFeaturedArticles" :key="featured.id">
        <div class="slider-bck" :style="{ background: `url(${featured.image})` }">
          <div class="slide-content">
            <div class="item">
              <div>{{ featured.title }}</div>
              <div>{{ featured.excerpt }}</div>
            </div>
          </div>
        </div>
      </Slide>

      <template #addons>
        <Pagination />
      </template>
    </Carousel>
  </div>
</template>

<script setup>
  import 'vue3-carousel/dist/carousel.css';
  import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel';

  import { useArticleStore } from '@/stores/articles';
  const articleStore = useArticleStore();
</script>

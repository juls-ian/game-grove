<template>
  <div class="container p-top">
    <div class="text-center m-3" v-if="loading">
      <v-progress-circular indeterminate color="primary" />
    </div>

    <div class="article-page" v-else>
      <div class="game-tag">{{ article.game }}</div>

      <div class="article-featured" :style="{ backgroundImage: `url(${article.image})` }"></div>

      <div class="article-content">
        <div class="owner">
          Article written by
          <b>{{ article.owner.firstName }} {{ article.owner.lastName }}</b>
        </div>

        <hr />

        <h1>{{ article.title }}</h1>
        <div class="editor" v-html="article.editor"></div>
        <hr />
        <div class="article-rating">
          Our rating is: <b>{{ article.rating }}</b>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { useArticleStore } from '@/stores/articles';
  import { ref } from 'vue';
  import { useRoute } from 'vue-router';

  const articleStore = useArticleStore();
  const route = useRoute();

  const loading = ref(true);
  const article = ref('');

  articleStore
    .fetchArticle(route.params.id)
    .then((response) => {
      article.value = response;
      console.log(route.params.id);
    })
    .finally(() => {
      loading.value = false;
    });
</script>

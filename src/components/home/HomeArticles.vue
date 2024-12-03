<template>
  <div class="container">
    <v-row v-masonry transition-duration="0.4s">
      <v-col
        v-masonry-title
        v-for="(article, index) in articleStore.getHomeArticles"
        :key="article.id"
        sm="4"
      >
        <v-card>
          <v-img height="200" :src="article.image" cover class="text-white"></v-img>
          <v-card-item>
            <v-card-title>
              {{ article.title }}
            </v-card-title>
            <v-card-subtitle>
              {{ article.game }}
            </v-card-subtitle>
          </v-card-item>
          <v-card-text>
            {{ article.excerpt }}
          </v-card-text>

          <v-card-actions>
            <router-link :to="{ name: 'home-article', params: { id: article.id } }">
              <v-btn>Read Article</v-btn>
            </router-link>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script setup>
  import { useArticleStore } from '@/stores/articles';
  const articleStore = useArticleStore();
</script>

<style lang="scss" scoped></style>

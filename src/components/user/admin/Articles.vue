<template>
  <div class="text-center m-3" v-show="loading">
    <v-progress-circular indeterminate color="primary" />
  </div>

  <div v-show="!loading">
    <v-table theme="dark">
      <thead>
        <tr>
          <th class="text-left">Name</th>
          <th class="text-left">Owner</th>
          <th class="text-left">Rating</th>
          <th class="text-left">Date</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="article in articleStore.adminArticles">
          <td>{{ article.game }}</td>
          <td>{{ article.owner.firstName }} {{ article.owner.lastName }}</td>
          <td>{{ article.rating }}</td>
          <td>{{ article.timestamp.toDate().toDateString() }}</td>

          <td>
            <v-btn variant="outlined" color="red" size="small" @click="deleteHandler(article.id)">
              Delete
            </v-btn>
          </td>
          <td>
            <v-btn
              variant="outlined"
              color="yellow"
              size="small"
              @click="router.push({ name: 'edit-article', params: { id: article.id } })"
            >
              Edit
            </v-btn>
          </td>
        </tr>
      </tbody>
    </v-table>
    <div class="text-center m-3" v-if="btnLoad">
      <v-progress-circular indeterminate color="primary" />
    </div>
    <v-btn v-else variant="outlined" class="mt-3" @click="loadMoreHandler()">More articles</v-btn>
  </div>
</template>

<script setup>
  import router from '@/router';
  import { useArticleStore } from '@/stores/articles';
  import { ref } from 'vue';
  import { useRoute } from 'vue-router';
  const articleStore = useArticleStore();

  const route = useRoute();
  const loading = ref(false);
  const btnLoad = ref(false);

  // Only fetch once || reload to fetch new
  if (!articleStore.adminArticles || route.query.reload) {
    // Fetch 1st article
    loading.value = true;
    articleStore.fetchAdminArticles(10).finally(() => {
      loading.value = false;
    });
  }

  // Sort of pagination
  const loadMoreHandler = () => {
    btnLoad.value = true;
    articleStore.fetchMoreArticles(3).finally(() => {
      btnLoad.value = false;
    });
  };

  // Remove article
  const deleteHandler = (id) => {
    loading.value = true;

    articleStore.removeArticle(id).finally(() => {
      loading.value = false;
    });
  };
</script>

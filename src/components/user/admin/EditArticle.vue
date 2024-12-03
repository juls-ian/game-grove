<template>
  <h1>Edit Article</h1>
  <hr />
  <Form class="mb-5" @submit="onUpdate" :validation-schema="articleSchema">
    <!-- Game Name -->
    <div class="mb-4">
      <Field name="game" v-model="article.game" v-slot="{ field, errors, errorMessage }">
        <input
          type="text"
          placeholder="Game name"
          v-bind="field"
          class="form-control"
          :class="{ 'is-invalid': errors.length !== 0 }"
        />
        <div class="input-alert" v-if="errors.length !== 0">
          {{ errorMessage }}
        </div>
      </Field>
    </div>

    <!-- Article Title -->
    <div class="mb-4">
      <Field name="title" v-model="article.title" v-slot="{ field, errors, errorMessage }">
        <input
          type="text"
          placeholder="Article title"
          v-bind="field"
          class="form-control"
          :class="{ 'is-invalid': errors.length !== 0 }"
        />

        <div class="input-alert" v-if="errors.length !== 0">
          {{ errorMessage }}
        </div>
      </Field>
    </div>

    <!-- Excerpt -->
    <div class="mb-4">
      <Field name="excerpt" v-model="article.excerpt" v-slot="{ field, errors, errorMessage }">
        <textarea
          rows="4"
          placeholder="Article excerpt"
          v-bind="field"
          class="form-control"
          :class="{ 'is-invalid': errors.length !== 0 }"
        />
        <div class="input-alert" v-if="errors.length !== 0">
          {{ errorMessage }}
        </div>
      </Field>
    </div>

    <!-- WYSIWYG -->
    <div class="mb-4">
      <TiptapEditor @update="updateEditor" :content="article.editor" />
      <Field name="editor" v-model="tiptapEditor" v-slot="{ field, errors, errorMessage }">
        <input type="hidden" id="tiptapEditor" v-bind="field" />
        <div class="input-alert" v-if="errors.length !== 0">
          {{ errorMessage }}
        </div>
      </Field>
    </div>

    <!-- Rating -->
    <div class="mb-4">
      <Field
        name="rating"
        v-model="article.rating"
        value="Select a rating"
        v-slot="{ field, errors, errorMessage }"
      >
        <select class="form-select" v-bind="field" :class="{ 'is-invalid': errors.length !== 0 }">
          <option disabled>Select a rating</option>
          <option v-for="(rating, index) in ratings" :key="index" :value="rating">
            {{ rating }}
          </option>
        </select>
        <div class="input-alert" v-if="errors.length !== 0">
          {{ errorMessage }}
        </div>
      </Field>
    </div>

    <!-- Image -->
    <div class="mb-4">
      <Field name="image" v-model="article.image" v-slot="{ field, errors, errorMessage }">
        <input
          type="text"
          placeholder="Add image"
          v-bind="field"
          class="form-control"
          :class="{ 'is-invalid': errors.length !== 0 }"
        />

        <div class="input-alert" v-if="errors.length !== 0">
          {{ errorMessage }}
        </div>
      </Field>
    </div>
    <!-- Button -->
    <v-btn type="submit" variant="outlined" :disabled="loading" :loading="loading"
      >Update article</v-btn
    >
  </Form>
</template>

<script setup>
  import { Field, Form } from 'vee-validate';
  import articleSchema from '@/composables/articleSchema';
  import TiptapEditor from '@/components/tiptap/TiptapEditor.vue';
  import { onMounted, ref } from 'vue';
  import { useArticleStore } from '@/stores/articles';
  import { useToast } from 'vue-toast-notification';
  import { useRoute } from 'vue-router';

  const articleStore = useArticleStore();
  const ratings = [1, 2, 3, 4, 5];
  const tiptapEditor = ref('');
  const loading = ref(false); //loader
  const $toast = useToast();
  const route = useRoute();
  const article = ref({}); // article ref object

  const updateEditor = (value) => {
    // update the ref
    tiptapEditor.value = value;
  };

  const onUpdate = async (formValues, { formReset }) => {
    loading.value = true;

    articleStore
      .updateArticle(route.params.id, formValues)
      .catch((error) => {
        $toast.error(error.message);
      })
      .finally(() => {
        loading.value = false;
      });
  };

  //   POPULATE FIELDS
  onMounted(async () => {
    try {
      // route from route index.js
      const response = await articleStore.fetchArticle(route.params.id);
      article.value = { ...response };
      updateEditor(response.editor);
      loading.value = false;
    } catch (error) {
      $toast.error(error.message);
    }
  });
  /*
  articleStore
    //   route from route index.js
    .getArticleById(route.params.id)
    .then((response) => {
      article.value = { ...response };
      loading.value = false;
    })
    .catch((error) => {
      $toast.error(error.message);
    });
    */
</script>

<style lang="scss">
  textarea {
    resize: none;
  }
</style>

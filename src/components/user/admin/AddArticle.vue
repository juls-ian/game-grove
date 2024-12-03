<template>
  <h1>Add Article</h1>
  <hr />
  <!-- LOADER -->
  <div class="text-center m-3" v-show="loading">
    <v-progress-circular indeterminate color="primary" />
  </div>
  <Form class="mb-5" @submit="onSubmit" :validation-schema="articleSchema">
    <!-- Game Name -->
    <div class="mb-4">
      <Field name="game" v-slot="{ field, errors, errorMessage }">
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
      <Field name="title" v-slot="{ field, errors, errorMessage }">
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
      <Field name="excerpt" v-slot="{ field, errors, errorMessage }">
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
      <TiptapEditor @update="updateEditor" />
      <Field name="editor" v-model="tiptapEditor" v-slot="{ field, errors, errorMessage }">
        <input type="hidden" id="tiptapEditor" v-bind="field" />
        <div class="input-alert" v-if="errors.length !== 0">
          {{ errorMessage }}
        </div>
      </Field>
    </div>

    <!-- Rating -->
    <div class="mb-4">
      <Field name="rating" value="Select a rating" v-slot="{ field, errors, errorMessage }">
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
      <Field name="image" v-slot="{ field, errors, errorMessage }">
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
    <v-btn type="submit" variant="outlined">Add article</v-btn>
  </Form>
</template>

<script setup>
  import { Field, Form } from 'vee-validate';
  import articleSchema from '@/composables/articleSchema';
  import TiptapEditor from '@/components/tiptap/TiptapEditor.vue';
  import { ref } from 'vue';
  import { useArticleStore } from '@/stores/articles';
  import { useToast } from 'vue-toast-notification';

  const articleStore = useArticleStore();
  const ratings = [1, 2, 3, 4, 5];
  const tiptapEditor = ref('');
  const loading = ref(false); //loader
  const $toast = useToast();

  const onSubmit = async (formValues, { formReset }) => {
    loading.value = true;

    articleStore
      .addArticle(formValues)
      .then(() => {
        $toast.success('Article has been added');
      })
      .catch((error) => {
        $toast.error(error.message);
      })
      .finally(() => {
        loading.value = false;
      });

    /*
    try {
      await articleStore.addArticle(formValues);
      $toast.success('Article added');
    } catch (error) {
      $toast.error(error.message);
    } finally {
      loading.value = false;
    }
      */
  };

  const updateEditor = (value) => {
    // update the ref
    tiptapEditor.value = value;
  };
</script>

<style lang="scss">
  textarea {
    resize: none;
  }
</style>

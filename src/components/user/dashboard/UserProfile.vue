<template>
  <h1>User Profile</h1>
  <hr />
  <Form class="mb-5 col-md-5" :submit="onUpdate" :validation-schema="formSchema">
    <div class="mb-4">
      <Field name="firstName" v-model="firstName" v-slot="{ field, errors, errorMessage }">
        <input
          type="text"
          class="form-control"
          placeholder="Enter your first name"
          v-bind="field"
          :class="{ 'is-invalid': errors.length !== 0 }"
        />
        <div class="input-alert" v-if="errors.length !== 0">
          {{ errorMessage }}
        </div>
      </Field>
    </div>

    <div class="mb-4">
      <Field name="lastName" v-model="lastName" v-slot="{ field, errors, errorMessage }">
        <input
          type="text"
          class="form-control"
          placeholder="Enter your last name"
          v-bind="field"
          :class="{ 'is-invalid': errors.length !== 0 }"
        />
        <div class="input-alert" v-if="errors.length !== 0">
          {{ errorMessage }}
        </div>
      </Field>
    </div>

    <v-btn type="submit" variant="outlined" :disabled="loading" :loading="loading"
      >Update profile</v-btn
    >
  </Form>
</template>

<script setup>
  import { Field, Form } from 'vee-validate';
  import { updateProfile } from '@/composables/userprofile';

  const { firstName, lastName, loading, formSchema, onUpdate } = updateProfile();
</script>

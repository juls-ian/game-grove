<template>
  <div class="signin-container">
    <!-- Loader -->
    <div class="text-center" v-show="userStore.loading">
      <v-progress-circular indeterminate color="primary" />
    </div>
    <Form @submit="onSubmit" :validation-schema="formSchema" v-show="!userStore.loading">
      <h1 v-text="isLoginMode ? 'Login' : 'Register'"></h1>

      <div class="form-group" v-if="!isLoginMode">
        <Field name="firstName" v-slot="{ field, errors, errorMessage }">
          <input
            type="text"
            class="form-control"
            placeholder="Enter first name"
            v-bind="field"
            :class="{ 'is-invalid': errors.length !== 0 }"
          />
          <div class="input-alert" v-if="errors.length !== 0">
            {{ errorMessage }}
          </div>
        </Field>
      </div>

      <div class="form-group" v-if="!isLoginMode">
        <Field name="lastName" v-slot="{ field, errors, errorMessage }">
          <input
            type="text"
            class="form-control"
            placeholder="Enter last name"
            v-bind="field"
            :class="{ 'is-invalid': errors.length !== 0 }"
          />
          <div class="input-alert" v-if="errors.length !== 0">
            {{ errorMessage }}
          </div>
        </Field>
      </div>

      <div class="form-group">
        <Field name="email" v-slot="{ field, errors, errorMessage }">
          <input
            type="text"
            class="form-control"
            placeholder="Enter email"
            v-bind="field"
            :class="{ 'is-invalid': errors.length !== 0 }"
          />
          <div class="input-alert" v-if="errors.length !== 0">
            {{ errorMessage }}
          </div>
        </Field>
      </div>

      <div class="form-group">
        <Field name="password" v-slot="{ field, errors, errorMessage }">
          <input
            type="password"
            class="form-control"
            placeholder="Enter Password"
            v-bind="field"
            :class="{ 'is-invalid': errors.length !== 0 }"
          />
          <div class="input-alert" v-if="errors.length !== 0">
            {{ errorMessage }}
          </div>
        </Field>
      </div>

      <div class="form-group" v-if="!isLoginMode">
        <Field name="passwordConfirmation" v-slot="{ field, errors, errorMessage }">
          <input
            type="password"
            class="form-control"
            placeholder="Confirm Password"
            v-bind="field"
            :class="{ 'is-invalid': errors.length !== 0 }"
          />
          <div class="input-alert" v-if="errors.length !== 0">
            {{ errorMessage }}
          </div>
        </Field>
      </div>

      <button
        type="submit"
        class="btn mb-3 btn-block"
        v-text="isLoginMode ? 'Login' : 'Register'"
      ></button>

      <hr />
      <div class="form-swap" @click="isLoginMode = !isLoginMode">
        <span v-if="isLoginMode">I want to <b>Register</b></span>
        <span v-else>I want to <b>Login</b></span>
      </div>
    </Form>
  </div>
</template>

<script setup>
  import { Field, Form } from 'vee-validate';
  import { computed, ref } from 'vue';
  import { useToast } from 'vue-toast-notification';
  import { useUserStore } from '@/stores/user';
  import * as yup from 'yup';
  import YupPassword from 'yup-password';
  YupPassword(yup);

  const userStore = useUserStore();
  const $toast = useToast();
  const isLoginMode = ref(true);

  const formSchema = computed(() => {
    return yup.object({
      email: yup.string().required('The email is required').email('Not a valid email'),
      password: yup
        .string()
        .required('Password is required')
        .min(6, 'Password must be at least 6 characters')
        .minUppercase(1, 'Password must contain at least 1 uppercase')
        .minLowercase(1, 'Password must contain at least 1 lowercase')
        .minSymbols(1, 'Password must contain at least 1 special character'),
      passwordConfirmation: !isLoginMode.value
        ? yup.string().oneOf([yup.ref('password'), null], 'Password must match')
        : yup.string().nullable(),
      firstName: !isLoginMode.value
        ? yup.string().required('First name is required')
        : yup.string().nullable().max(15, 'First name is too long'),
      lastName: !isLoginMode.value
        ? yup.string().required('Last name is required')
        : yup.string().nullable().max(15, 'Last name is too long'),
    });
  });
  /*
  const formSchema = yup.object({
    email: yup.string().required('The email us required').email('Not a valid email'),
    password: yup
      .string()
      .required('Password is required')
      .min(6, 'Password must be at least 6 characters')
      .minUppercase(1, 'Password must contain at least 1 uppercase')
      .minLowercase(1, 'Password must contain at least 1 lowercase')
      .minSymbols(1, 'Password must contain at least 1 special character'),
    passwordConfirmation: yup.string().oneOf([yup.ref('password'), null], 'Password must match'),
    // rules
    firstName: yup.string().required('First name is required'),
    lastName: yup.string().required('Last name is required'),
  });
  */

  const onSubmit = (formValues, { formReset }) => {
    if (!isLoginMode.value) {
      // Register
      userStore.register(formValues);
    } else {
      // Login
      userStore.login(formValues);
    }
  };

  userStore.$onAction(({ name, after, onError }) => {
    //        store action              store action
    if (name === 'login' || name === 'register') {
      after(() => {
        $toast.success('Welcome!');
      });
      onError((error) => {
        $toast.error(error.message);
      });
    }
  });
</script>

import * as yup from 'yup';
import { ref } from 'vue';

import { useUserStore } from '@/stores/user';

export const updateProfile = () => {
  const userStore = useUserStore();
  // get current names
  const firstName = ref(userStore.user.firstName);
  const lastName = ref(userStore.user.lastName);

  const loading = ref(false);
  const formSchema = yup.object(
    {
      firstName: yup.string().required('First name is required').max(15, 'First name is too long'),
    },
    {
      lastName: yup.string().required('Last name is required').max(15, 'Last name is too long'),
    },
  );

  const onUpdate = (formValue, { formReset }) => {
    loading.value = true;
    userStore.updateProfile(formValue).finally(() => {
      loading.value = false;
    });
  };

  return { firstName, lastName, loading, formSchema, onUpdate };
};

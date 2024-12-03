import { defineStore } from 'pinia';
import router from '@/router';

import { AUTH, DB } from '@/firebase/config';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { getDoc, doc, setDoc, updateDoc } from 'firebase/firestore';
import { isAdmin } from '@firebase/util';
import authErrors from '@/firebase/authErrors';
import { useToast } from 'vue-toast-notification';

const $toast = useToast();
const DEFAULT_USER = {
  uid: null,
  email: null,
  firstName: null,
  lastName: null,
  isAdmin: null,
};

export const useUserStore = defineStore('user', {
  // configs
  state: () => ({
    loading: false,
    user: DEFAULT_USER,
    auth: false,
  }),
  getters: {
    getUserData(state) {
      return state.user;
    },
    getUserID() {
      return this.user.uid;
    },
  },
  actions: {
    // Updating nulls
    setUser(user) {
      // Merge     preserve default  param
      this.user = { ...this.user, ...user };
      this.auth = true;
    },
    // Verify user
    async fetchUserProfile(uid) {
      try {
        //                       db  collection id to get
        const user = await getDoc(doc(DB, 'users', uid));
        if (!user.exists()) {
          throw new Error('User does not exist');
        }
        return user.data();
      } catch (error) {
        throw new Error(error);
      }
    },
    // Auto Login
    async autoLogin(uid) {
      try {
        const userData = await this.fetchUserProfile(uid);
        this.setUser(userData);
        return true;
      } catch (error) {
        console.log(error);
      }
    },
    // Login User
    async login(formData) {
      try {
        this.loading = true;
        // login user
        const response = await signInWithEmailAndPassword(AUTH, formData.email, formData.password);

        // get user data
        const userData = await this.fetchUserProfile(response.user.uid);
        // update local state
        this.setUser(userData);
        router.push({ name: 'dashboard' });
      } catch (error) {
        $toast.error(error.message);
        throw new Error(authErrors(error.code));
      } finally {
        this.loading = false;
      }
    },

    // Register user
    async register(formData) {
      try {
        this.loading = true;
        // register user
        const response = await createUserWithEmailAndPassword(
          AUTH,
          formData.email,
          formData.password,
        );
        // new user properties
        const newUser = {
          uid: response.user.uid,
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: response.user.email,
          isAdmin: true,
        };
        //   doc instance(database, collection, id) output
        await setDoc(doc(DB, 'users', response.user.uid), newUser); // store to db
        router.push({ name: 'dashboard' });
      } catch (error) {
        throw new Error(authErrors(error.code));
      } finally {
        this.loading = false;
      }
    },

    async logout() {
      await signOut(AUTH);
      this.user = DEFAULT_USER; //reset to default
      this.auth = false;
      router.push({ name: 'home' });
    },

    async updateProfile(formData) {
      try {
        const userRef = doc(DB, 'users', this.getUserID);
        await updateDoc(userRef, { ...formData });

        // update local state
        this.setUser(formData);
        $toast.success('Profile updated');
        return true;
      } catch (error) {
        $toast.error(error.message);
      }
    },
  },
});

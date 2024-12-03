import { defineStore } from 'pinia';
import router from '@/router';
import { useUserStore } from './user';
import { DB } from '@/firebase/config';
import { useToast } from 'vue-toast-notification';
import {
  collection,
  getDoc,
  doc,
  setDoc,
  serverTimestamp,
  updateDoc,
  query,
  orderBy,
  getDocs,
  limit,
  startAfter,
  deleteDoc,
} from 'firebase/firestore';

let articlesCollection = collection(DB, 'articles');
const $toast = useToast();

export const useArticleStore = defineStore('article', {
  state: () => ({
    homeArticles: '',
    adminArticles: '',
    adminLastVisible: '',
  }),
  getters: {
    getFeaturedArticles(articles) {
      return articles.homeArticles.slice(0, 3);
    },
    getHomeArticles(articles) {
      return articles.homeArticles;
    },
  },
  actions: {
    async fetchAdminArticles(articleLimit) {
      try {
        const articlesQuery = query(
          articlesCollection,
          orderBy('timestamp', 'desc'),
          limit(articleLimit),
        );
        // Fetching documents matching query
        const articlesSnapshot = await getDocs(articlesQuery);
        // last loaded article
        const lastVisible = articlesSnapshot.docs[articlesSnapshot.docs.length - 1];
        // convert snapshot
        const articles = articlesSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        // Update articles state
        this.adminArticles = articles;
        this.adminLastVisible = lastVisible;
      } catch (error) {
        $toast.error(error.message);
      }
    },
    async fetchHomeArticles(articleLimit) {
      try {
        const articleQuery = query(
          articlesCollection,
          orderBy('timestamp', 'desc'),
          limit(articleLimit),
        );
        const articleSnapshot = await getDocs(articleQuery);
        // doc in each iteration
        const articles = articleSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        this.homeArticles = articles;
      } catch (error) {
        throw new Error(error);
      }
    },
    async fetchArticle(id) {
      try {
        const article = await getDoc(doc(DB, 'articles', id));

        if (!article.exists()) {
          throw new Error('Could not find article');
        } else {
          return article.data();
        }
      } catch (error) {
        router.push({ name: '404' });
      }
    },
    async fetchMoreArticles(articleLimit) {
      try {
        if (this.adminLastVisible) {
          let oldArticles = this.adminArticles;

          const articleQuery = query(
            articlesCollection,
            orderBy('timestamp', 'desc'),
            startAfter(this.adminLastVisible),
            limit(articleLimit),
          );
          const querySnapshot = await getDocs(articleQuery);
          const lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];
          const newArticles = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));

          this.adminArticles = [...oldArticles, ...newArticles];
          this.adminLastVisible;
        }
      } catch (error) {
        throw new Error(error);
      }
    },
    async addArticle(formData) {
      try {
        // Get User
        const userStore = useUserStore();
        const user = userStore.getUserData;

        // Doc reference (prepares unique id)
        const newArticle = doc(articlesCollection);
        // Storing new article
        await setDoc(newArticle, {
          // properties to be posted
          timestamp: serverTimestamp(),
          owner: {
            // properties from user store
            user: user.uid,
            firstName: user.firstName,
            lastName: user.lastName,
          },
          // expand what we get from formData
          ...formData,
        });

        router.push({ name: 'articles', query: { reload: true } });
        return true;
      } catch (error) {
        throw new Error(error);
      }
    },
    async updateArticle(id, formData) {
      try {
        // Get article from db
        const article = doc(DB, 'articles', id);
        // Updating

        await updateDoc(article, { ...formData });
        $toast.success('Articles updated');
        return true;
      } catch (error) {
        $toast.error(error.message);
        throw new Error(error);
      }
    },
    async removeArticle(id) {
      try {
        await deleteDoc(doc(DB, 'articles', id));
        //  each el in this.adminArticles array
        const newList = this.adminArticles.filter((x) => {
          return x.id !== id;
        });
        this, (this.adminArticles = newList);
        $toast.success('Article removed');
      } catch (error) {
        $toast.error(error.message);
        throw new Error(error);
      }
    },
  },
});

import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut as firebaseAuthSignOut,
} from "firebase/auth";
import { inject, provide, reactive, toRefs } from "vue";

export const authStore = () => {
  const state = reactive({
    user: null,
  });

  const signIn = (email, password) => {
    return signInWithEmailAndPassword(getAuth(), email, password);
  };

  const signOut = () => {
    firebaseAuthSignOut(getAuth());
  };

  onAuthStateChanged(getAuth(), (user) => {
    if (user) {
      state.user = user;
    } else {
      state.user = null;
    }
  });

  return {
    ...toRefs(state),
    signIn,
    signOut,
  };
};

export const authStoreKey = Symbol("authStore");

export const provideAuth = () => {
  provide(authStoreKey, authStore());
};

export const useAuth = () => {
  const store = inject(authStoreKey);
  if (!store) {
    throw new Error("authStore is unavailable.");
  }
  return store;
};

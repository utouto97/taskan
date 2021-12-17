<template>
  <button @click="signOut()">ログアウト</button>
</template>

<script>
import { getAuth, signOut as firebaseAuthSignOut } from "firebase/auth";
import { useRouter } from "vue-router";

export default {
  name: "Signout",
  setup() {
    const router = useRouter();

    const signOut = () => {
      firebaseAuthSignOut(getAuth());
      router.push({ name: "Signin" });
    };

    return {
      signOut,
    };
  },
};
</script>

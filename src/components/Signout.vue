<template>
  <button @click="signOut()">ログアウト</button>
</template>

<script>
import { useRouter } from "vue-router";
import { useAuth } from "@/store/auth";

export default {
  name: "Signout",
  setup() {
    const router = useRouter();
    const { signOut: _signOut } = useAuth();

    const signOut = () => {
      _signOut();
      router.push({ name: "Signin" });
    };

    return {
      signOut,
    };
  },
};
</script>

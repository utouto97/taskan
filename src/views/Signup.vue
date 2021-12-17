<template>
  <form @submit.prevent>
    <div>
      <label for="email">Email </label>
      <input type="text" id="email" v-model="email" />
    </div>
    <div>
      <label for="password">Password </label>
      <input type="password" id="password" v-model="password" />
    </div>
    <div>
      <button @click="signUp()">新規登録</button>
    </div>
  </form>
</template>

<script>
import { ref } from "vue";
import { useRouter } from "vue-router";
import {
  createUserWithEmailAndPassword,
  getAuth,
  sendEmailVerification,
} from "firebase/auth";

export default {
  name: "Signin",
  setup() {
    const email = ref("");
    const password = ref("");

    const router = useRouter();

    const signUp = () => {
      createUserWithEmailAndPassword(getAuth(), email.value, password.value)
        .then((userCredential) => {
          const user = userCredential.user;
          console.log("signUp success: ", user);
          if (!user.emailVerified) {
            sendEmailVerification(user);
          }
          router.push("/");
        })
        .catch((e) => {
          console.log("signUp error: ", e);
        });
    };

    return {
      email,
      password,
      signUp,
    };
  },
};
</script>

<style>
* {
  margin: 4px;
}
</style>

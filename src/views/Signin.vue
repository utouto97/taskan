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
      <button @click="signIn()">ログイン</button>
    </div>
  </form>
</template>

<script>
import { ref } from "vue";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "vue-router";

export default {
  name: "Signin",
  setup() {
    const email = ref("");
    const password = ref("");

    const router = useRouter();

    const signIn = () => {
      console.log(email.value, password.value);
      signInWithEmailAndPassword(getAuth(), email.value, password.value)
        .then((userCredential) => {
          const user = userCredential.user;
          console.log("signin success: ", user);
          router.push("/");
        })
        .catch((e) => {
          console.log("signin error: ", e);
        });
    };

    return {
      email,
      password,
      signIn,
    };
  },
};
</script>

<style>
* {
  margin: 4px;
}
</style>

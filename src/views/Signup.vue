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
import {
  addDoc,
  collection,
  doc,
  getFirestore,
  setDoc,
} from "firebase/firestore";

export default {
  name: "Signin",
  setup() {
    const email = ref("");
    const password = ref("");

    const router = useRouter();
    const db = getFirestore();

    const signUp = () => {
      createUserWithEmailAndPassword(getAuth(), email.value, password.value)
        .then(async (userCredential) => {
          const user = userCredential.user;
          console.log("signUp success: ", user);

          // create doc for new user
          const task1 = await addDoc(
            collection(db, "users", user.uid, "tasks"),
            {
              title: "Sample Task 1",
              description: "This is a sample task (1).",
            }
          );
          const task2 = await addDoc(
            collection(db, "users", user.uid, "tasks"),
            {
              title: "Sample Task 2",
              description: "This is a sample task (2).",
            }
          );
          const task3 = await addDoc(
            collection(db, "users", user.uid, "tasks"),
            {
              title: "Sample Task 3",
              description: "This is a sample task (3).",
            }
          );

          await setDoc(doc(db, "users", user.uid), {
            taskOrder: [task1.id, task2.id, task3.id],
          });

          // send email for verification if not emailVerified
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

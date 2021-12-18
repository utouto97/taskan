<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js App" />
    <div v-for="task in tasks" v-bind:key="task.id">
      <h1>{{ task.data().title }}</h1>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import { onMounted, ref } from "vue";
import { collection, getDocs, getFirestore } from "firebase/firestore";
import HelloWorld from "@/components/HelloWorld.vue";
import { useAuth } from "@/store/auth";

export default {
  name: "Home",
  components: {
    HelloWorld,
  },
  setup() {
    const db = getFirestore();
    const tasks = ref([]);
    const { user } = useAuth();

    onMounted(async () => {
      const snapshot = await getDocs(
        collection(db, "users", user.value.uid, "tasks")
      );
      tasks.value = snapshot.docs;
    });

    return {
      tasks,
    };
  },
};
</script>

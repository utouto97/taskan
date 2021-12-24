<template>
  <div>
    <TaskCard
      :loading="loading"
      :task="loading ? {} : headTask"
      class="mx-auto"
    />
  </div>
  <div>
    <div
      v-for="key in orderedKeys"
      :key="key"
      class="w-min mx-auto mt-2 px-4 py-2 border rounded text-sm text-gray-600"
    >
      <p class="text-lg text-black">{{ key }}</p>
      <p>title: {{ tasks[key].title }}</p>
      <p>description: {{ tasks[key].description }}</p>
      <p>prev: {{ tasks[key].prev }}</p>
      <p>next: {{ tasks[key].next }}</p>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { collection, getDocs, getFirestore } from "firebase/firestore";
import { useAuth } from "@/store/auth";
import TaskCard from "@/components/TaskCard";

export default {
  name: "Home",
  components: {
    TaskCard,
  },
  setup() {
    const tasks = ref([]);
    const loading = ref(true);
    const headTask = ref({});
    const orderedKeys = ref([]);

    const db = getFirestore();
    const { user } = useAuth();

    (async () => {
      const snapshot = await getDocs(
        collection(db, "users", user.value.uid, "tasks")
      );
      tasks.value = Object.assign(
        {},
        ...snapshot.docs.map((doc) => ({ [doc.id]: doc.data() }))
      );
      loading.value = false;
      const headKey = Object.keys(tasks.value).filter(
        (key) => tasks.value[key].prev == "head"
      )[0];
      headTask.value = tasks.value[headKey];

      for (var key = headKey; key != "tail"; key = tasks.value[key].next) {
        orderedKeys.value.push(key);
      }
    })();

    return {
      tasks,
      loading,
      headTask,
      orderedKeys,
    };
  },
};
</script>

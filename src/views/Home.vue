<template>
  <div>
    <TaskCard
      :loading="loading"
      :task="loading ? {} : headTask"
      class="mx-auto"
    />
  </div>
  <TaskList :loading="loading" :tasks="tasks" />
</template>

<script>
import { ref } from "vue";
import { collection, getDocs, getFirestore } from "firebase/firestore";
import { useAuth } from "@/store/auth";
import TaskCard from "@/components/TaskCard";
import TaskList from "@/components/TaskList";

export default {
  name: "Home",
  components: {
    TaskCard,
    TaskList,
  },
  setup() {
    const tasks = ref([]);
    const loading = ref(true);
    const headTask = ref({});

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
    })();

    return {
      tasks,
      loading,
      headTask,
    };
  },
};
</script>

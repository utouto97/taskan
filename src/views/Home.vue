<template>
  <div>
    <TaskCard
      :loading="loading"
      :task="loading ? {} : headTask"
      class="mx-auto"
    />
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
    const db = getFirestore();
    const tasks = ref([]);
    const loading = ref(true);
    const headTask = ref({});
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
      headTask.value =
        tasks.value[
          Object.keys(tasks.value).filter(
            (key) => tasks.value[key].prev == "head"
          )[0]
        ];
    })();

    return {
      tasks,
      loading,
      headTask,
    };
  },
};
</script>

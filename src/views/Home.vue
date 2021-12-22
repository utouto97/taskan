<template>
  <div>
    <TaskCard
      :loading="loading"
      :task="loading ? {} : tasks[0].data()"
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
    const { user } = useAuth();

    (async () => {
      const snapshot = await getDocs(
        collection(db, "users", user.value.uid, "tasks")
      );
      tasks.value = snapshot.docs;
      loading.value = false;
    })();

    return {
      tasks,
      loading,
    };
  },
};
</script>

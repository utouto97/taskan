<template>
  <div>
    <TaskCard
      :loading="loading"
      :task="loading ? {} : tasks[taskOrder[0]]"
      class="mx-auto"
    />
  </div>
  <TaskList :loading="loading" :tasks="tasks" :taskOrder="taskOrder" />
</template>

<script>
import { ref } from "vue";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
} from "firebase/firestore";
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
    const taskOrder = ref([]);

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
      taskOrder.value = (
        await getDoc(doc(db, "users", user.value.uid))
      ).data().taskOrder;
      loading.value = false;
    })();

    return {
      tasks,
      loading,
      taskOrder,
    };
  },
};
</script>

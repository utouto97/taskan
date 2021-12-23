<template>
  <div>
    <div>
      <label for="title">タイトル</label>
      <input type="text" id="title" v-model="title" />
    </div>
    <div>
      <label for="description">説明</label>
      <input type="text" id="description" v-model="description" />
    </div>
    <button @click="addTask()">追加</button>
  </div>
</template>

<script>
import { ref } from "vue";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getFirestore,
  updateDoc,
} from "firebase/firestore";
import { useAuth } from "@/store/auth";

export default {
  name: "AddTask",
  setup() {
    const title = ref("");
    const description = ref("");
    const db = getFirestore();
    const { user } = useAuth();

    const addTask = async () => {
      const userDoc = await getDoc(doc(db, "users", user.value.uid));
      const headTask = userDoc.data().headTask;
      const newTask = await addDoc(
        collection(db, "users", user.value.uid, "tasks"),
        {
          title: title.value,
          description: description.value,
          prev: "head",
          next: headTask,
        }
      );
      await updateDoc(doc(db, "users", user.value.uid, "tasks", headTask), {
        prev: newTask.id,
      });
      await updateDoc(doc(db, "users", user.value.uid), {
        headTask: newTask.id,
      });
    };

    return {
      title,
      description,
      addTask,
    };
  },
};
</script>

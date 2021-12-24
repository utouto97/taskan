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
    <div>
      <label for="order">いつやる？</label>
      <select v-model="order">
        <option disabled value="">Please select one</option>
        <option value="first">今</option>
        <option value="last">後で</option>
      </select>
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
    const order = ref("");

    const db = getFirestore();
    const { user } = useAuth();

    const addTask = async () => {
      const taskOrder = (await getDoc(doc(db, "users", user.value.uid))).data()
        .taskOrder;

      const newTask = await addDoc(
        collection(db, "users", user.value.uid, "tasks"),
        {
          title: title.value,
          description: description.value,
        }
      );

      if (order.value == "first") {
        taskOrder.unshift(newTask.id);
      } else if (order.value == "last") {
        taskOrder.push(newTask.id);
      }

      await updateDoc(doc(db, "users", user.value.uid), {
        taskOrder: taskOrder,
      });
    };

    return {
      title,
      description,
      order,
      addTask,
    };
  },
};
</script>

<template>
  <div v-if="!loading">
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
import { ref, watch } from "vue";
export default {
  name: "TaskList",
  props: {
    loading: {
      type: Boolean,
    },
    tasks: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    const orderedKeys = ref([]);

    watch(
      () => props.loading,
      () => {
        const headKey = Object.keys(props.tasks).filter(
          (key) => props.tasks[key].prev == "head"
        )[0];

        for (var key = headKey; key != "tail"; key = props.tasks[key].next) {
          orderedKeys.value.push(key);
        }
      }
    );

    return {
      orderedKeys,
    };
  },
};
</script>

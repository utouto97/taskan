<template>
  <div class="max-w-sm rounded-xl overflow-hidden shadow-lg mb-8 border">
    <div v-if="!loading">
      <div class="h-60 px-6 py-4">
        <h1 class="font-bold text-xl mb-2">{{ task.title }}</h1>
        <p class="text-sm text-gray-600">{{ task.description }}</p>
      </div>
      <div class="w-full h-36">
        <div class="w-full h-1/2">
          <button
            class="w-full h-full bg-green-300 font-bold border-t-2 border-b-2 border-white"
          >
            完了
          </button>
        </div>
        <div class="w-full h-1/2 flex">
          <button
            class="w-1/2 h-full bg-gray-300 font-bold border-r-2 border-white"
          >
            途中まで
          </button>
          <button class="w-1/2 h-full bg-gray-300 font-bold">後で</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "TaskCard",
  props: {
    loading: {
      type: Boolean,
      default: true,
      required: true,
    },
    task: {
      type: Object,
      required: true,
    },
  },
  setup() {},
};
</script>

<template>
  <div class="about">
    <h1>This is an about page</h1>
    <div>
      {{ user }}
    </div>
  </div>
</template>

<script>
import { useAuth } from "@/store/auth";

export default {
  name: "About",
  setup() {
    const { user } = useAuth();

    return {
      user,
    };
  },
};
</script>

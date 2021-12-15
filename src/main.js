import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

import { initializeApp } from "firebase/app";
import firebaseConfig from "@/firebaseConfig";

initializeApp(firebaseConfig);

createApp(App).use(router).mount("#app");

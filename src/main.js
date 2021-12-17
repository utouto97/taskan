import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

import { initializeApp } from "firebase/app";
import firebaseConfig from "./firebaseConfig";
import { provideAuth } from "./store/auth";

initializeApp(firebaseConfig);

createApp({
  ...App,
  setup() {
    provideAuth();
  },
})
  .use(router)
  .mount("#app");

import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { Quasar } from "quasar";
import quasarUserOptions from "./quasar-user-options";
import { OktaAuth } from "@okta/okta-auth-js";
import OktaVue from "@okta/okta-vue";
import "./polyfills";

let { VUE_APP_issuer, VUE_APP_clientid } = process.env;

let redirectUri = `${window.location.origin}/login/callback`;

const oktaAuth = new OktaAuth({
  issuer: VUE_APP_issuer,
  clientId: VUE_APP_clientid,
  redirectUri: redirectUri,
  scopes: ["openid", "profile", "email", "execute-api"],
  pkce: true,
});

createApp(App)
  .use(Quasar, quasarUserOptions)
  .use(store)
  .use(router)
  .use(OktaVue, { oktaAuth })
  .mount("#app");

/* eslint-disable no-constant-condition */
<template>
  <q-layout view="hHh Lpr fFf">
    <q-header elevated class="glossy">
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          v-if="authState && authState.isAuthenticated"
          @click="leftDrawerOpen = !leftDrawerOpen"
          aria-label="Menu"
          icon="menu"
        />

        <q-toolbar-title>
          <router-link to="/" style="text-decoration: none; color: inherit">
            <q-avatar>
              <img
                src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg"
              />
            </q-avatar>
            Builder's Creed
          </router-link>
        </q-toolbar-title>
        <q-banner
          rounded
          dense
          inline-actions
          class="glossy bg-primary text-white"
        >
          <q-input
            v-if="authState && authState.isAuthenticated"
            v-model="text"
            bg-color="white"
            rounded
            outlined
            maxlength="12"
            dense
          >
            <template v-slot:append>
              <q-icon
                v-if="text !== ''"
                name="close"
                @click="text = ''"
                class="cursor-pointer"
              ></q-icon>
              <q-icon name="search" @click="search_string(text)"></q-icon>
            </template>
          </q-input>
          <template v-slot:action>
            <q-btn
              flat
              label="Blogs"
              v-if="authState && authState.isAuthenticated"
              @click="$router.push({ path: '/blogs' })"
            ></q-btn>
            <q-btn
              flat
              label="Login"
              v-if="authState && !authState.isAuthenticated"
              @click="login()"
            ></q-btn>
            <q-btn
              flat
              label="Logout"
              @click="logout()"
              v-if="authState && authState.isAuthenticated"
            ></q-btn>
          </template>
        </q-banner>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" bordered class="bg-grey-2">
      <q-list>
        <q-item-label header>Essential Links</q-item-label>
        <q-item clickable tag="a" target="_blank" href="https://quasar.dev">
          <q-item-section avatar>
            <q-icon name="school" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Docs</q-item-label>
            <q-item-label caption>quasar.dev</q-item-label>
          </q-item-section>
        </q-item>
        <q-item
          clickable
          tag="a"
          target="_blank"
          href="https://github.com/quasarframework/"
        >
          <q-item-section avatar>
            <q-icon name="code" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Github</q-item-label>
            <q-item-label caption>github.com/quasarframework</q-item-label>
          </q-item-section>
        </q-item>
        <q-item
          clickable
          tag="a"
          target="_blank"
          href="https://chat.quasar.dev"
        >
          <q-item-section avatar>
            <q-icon name="chat" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Discord Chat Channel</q-item-label>
            <q-item-label caption>chat.quasar.dev</q-item-label>
          </q-item-section>
        </q-item>
        <q-item
          clickable
          tag="a"
          target="_blank"
          href="https://forum.quasar.dev"
        >
          <q-item-section avatar>
            <q-icon name="forum" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Forum</q-item-label>
            <q-item-label caption>forum.quasar.dev</q-item-label>
          </q-item-section>
        </q-item>
        <q-item
          clickable
          tag="a"
          target="_blank"
          href="https://twitter.com/quasarframework"
        >
          <q-item-section avatar>
            <q-icon name="rss_feed" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Twitter</q-item-label>
            <q-item-label caption>@quasarframework</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { ref } from "vue";
const axios = require("axios");

export default {
  name: "LayoutDefault",
  methods: {
    searchHitToResult(hit) {
      let id = hit._id;
      let content = this.$store.state.analog.flat();
      let result = content.filter((item) => item._id.$oid == id);
      console.log(result);
      return result;
    },
    search_string(payload) {
      // this.$router.push({
      //   path: "/blogs/",
      // });
      axios({
        method: "get",
        url: "https://egc18xe6uh.execute-api.ap-northeast-2.amazonaws.com/Prod/blogs/search",
        headers: {
          // eslint-disable-next-line prettier/prettier
          "Authorization": `Bearer ${this.$auth.getAccessToken()}`,
        },
        params: {
          search_string: payload,
        },
      }).then((res) => {
        // console.log(res);
        console.log(res.data);
        console.log("analog content follow");
        console.log(this.$store.state.analog);
        let result = res.data.hits.hits.map(this.searchHitToResult);
        this.$store.commit("input_result", result);
        console.log("the store result follows");
        console.log(this.$store.state.result);
      });
      this.$router.push({
        path: "/blogs/search",
      });
    },
    login() {
      this.$auth.signInWithRedirect({ originalUri: "/" });
    },
    async logout() {
      const publicPath = this.$route.href.replace(
        new RegExp(this.$route.fullPath + "$"),
        ""
      );
      await this.$auth.signOut({
        postLogoutRedirectUri: `${window.location.origin}${publicPath}`,
      });
    },
  },
  setup() {
    return {
      leftDrawerOpen: ref(false),
      text: ref(""),
    };
  },
};
</script>

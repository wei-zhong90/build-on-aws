<template>
  <img
    alt="Quasar logo"
    src="../assets/logo.svg"
    style="width: 200px; height: 200px"
    @click="showToken()"
    v-if="authState && authState.isAuthenticated"
  />
  <div class="col-6 self-start q-gutter-x-sm" v-if="showIt">
    <q-card bordered style="width: 600px; overflow-wrap: break-word">
      <q-card-section>
        {{ token }}
      </q-card-section>
    </q-card>
  </div>
</template>

<style></style>

<script>
export default {
  name: "blogCard",
  data() {
    return {
      token: "",
      showIt: false,
    };
  },
  methods: {
    showToken() {
      if (this.authState && this.authState.isAuthenticated) {
        this.token = this.$auth.getAccessToken();
      }
      this.showIt = !this.showIt;
    },
  },
};
</script>

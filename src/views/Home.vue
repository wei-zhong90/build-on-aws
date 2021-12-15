<template>
  <div class="home">
    <div class="q-pa-md flex flex-center q-gutter-md">
      <img
        alt="Quasar logo"
        src="../assets/logo.svg"
        style="width: 200px; height: 200px"
        v-if="authState && authState.isAuthenticated"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: "Home",
  mounted() {
    console.log(this.$auth.getAccessToken());
  },
};
</script>

<template>
  <!-- <img
    alt="Quasar logo"
    src="../assets/logo.svg"
    style="width: 200px; height: 200px"
    @click="showToken()"
    v-if="authState && authState.isAuthenticated"
  /> -->
  <q-card bordered class="my-card shadow-8">
    <q-img src="https://cdn.quasar.dev/img/parallax2.jpg"></q-img>
    <q-card-section>
      <div class="text-overline text-orange-9">blog</div>
      <div class="text-h5 q-mt-sm q-mb-xs">{{ title }}</div>
      <div
        class="text-body1 text-grey"
        style="display: inline-block; height: 150px; overflow-wrap: break-word"
      >
        {{ post }}
      </div>
    </q-card-section>
    <q-separator></q-separator>
    <q-card-section>
      <div class="text-subtitle1">
        written by <b>{{ author }}</b>
      </div>
      <div class="text-subtitle2">{{ timestamp }}</div>
    </q-card-section>
  </q-card>
</template>

<style></style>

<script>
export default {
  name: "blogCard",
  props: {
    title: String,
    author: String,
    timestamp: String,
    post: String,
  },
};
</script>

<style>
.my-card {
  width: 100%;
  max-width: 350px;
  overflow-wrap: break-word;
}
</style>

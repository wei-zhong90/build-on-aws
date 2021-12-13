<template>
  <div class="home">
    <q-page class="flex flex-center">
      <blogCard msg="Welcome to Your Vue.js App" />
    </q-page>
  </div>
</template>

<script>
// @ is an alias to /src
import blogCard from "@/components/blogCard.vue";

export default {
  name: "Home",
  components: {
    blogCard,
  },
};
</script>

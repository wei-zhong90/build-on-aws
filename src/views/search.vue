<template>
  <div class="search">
    <div class="q-pa-md row flex q-gutter-md">
      <blog-card
        v-for="(post, index) in content"
        :key="index"
        :title="post[0].title"
        :author="post[0].author"
        :timestamp="post[0].timestamp"
        :post="post[0].blog"
      />
    </div>
    <!-- <div class="q-pa-md row flex flex-center q-gutter-md">
      <q-pagination
        v-model="current"
        :max="total_page"
        :max-pages="total_page > 10 ? 10 : 0"
        boundary-numbers
        direction-links
      ></q-pagination>
    </div> -->
  </div>
</template>

<script>
// @ is an alias to /src
import blogCard from "@/components/blogCard.vue";

export default {
  name: "search",
  components: {
    blogCard,
  },
  props: ["search_text"],
  data() {
    return {
      token: "",
      current: 1,
      total_page: 1,
    };
  },
  computed: {
    content() {
      return this.$store.state.result;
    },
  },
  mounted() {
    if (this.authState && this.authState.isAuthenticated) {
      this.token = this.$auth.getAccessToken();
    } else {
      this.$auth.signInWithRedirect({ originalUri: "/" });
    }
    console.log("this is the content from search vue");
    console.log(this.content);
  },
};
</script>

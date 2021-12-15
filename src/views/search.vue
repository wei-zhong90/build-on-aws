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
  computed: {
    content() {
      return this.$store.state.result;
    },
  },
  mounted() {
    console.log("this is the content from search vue");
    console.log(this.content);
  },
};
</script>

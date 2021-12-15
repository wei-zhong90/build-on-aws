<template>
  <div class="blogs">
    <div class="q-pa-md row flex q-gutter-md">
      <blog-card
        v-for="(post, index) in content[current - 1]"
        :key="index"
        :title="post.title"
        :author="post.author"
        :timestamp="post.timestamp"
        :post="post.blog"
      />
    </div>
    <div class="q-pa-md row flex flex-center q-gutter-md">
      <q-circular-progress
        indeterminate
        size="50px"
        color="primary"
        class="q-ma-md"
        v-if="!content"
      ></q-circular-progress>
      <q-pagination
        v-else
        v-model="current"
        :max="total_page"
        :max-pages="total_page > 10 ? 10 : 0"
        boundary-numbers
        direction-links
        @update:model-value="animateScroll"
      ></q-pagination>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import blogCard from "@/components/blogCard.vue";
const axios = require("axios");

export default {
  name: "blogs",
  components: {
    blogCard,
  },
  data() {
    return {
      token: "",
      current: 1,
      total_page: 1,
      content: "",
    };
  },
  methods: {
    animateScroll() {
      // console.log("activated in pager");
      window.scrollTo(0, 0);
    },
  },
  mounted() {
    if (this.authState && this.authState.isAuthenticated) {
      this.token = this.$auth.getAccessToken();
    } else {
      this.$auth.signInWithRedirect({ originalUri: "/" });
    }
    console.log(this.token);
    axios({
      method: "get",
      url: process.env.VUE_APP_blogsurl,
      headers: {
        // eslint-disable-next-line prettier/prettier
        "Authorization": `Bearer ${this.token}`,
      },
    }).then((res) => {
      // console.log(res);
      this.content = res.data;
      console.log(this.content);
      this.$store.commit("input_analog", this.content);
      this.total_page = this.content.length;
    });
  },
};
</script>

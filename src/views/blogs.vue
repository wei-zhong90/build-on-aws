<template>
  <div class="allblogs">
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
      <q-pagination
        v-model="current"
        :max="total_page"
        :max-pages="total_page > 10 ? 10 : 0"
        boundary-numbers
        direction-links
      ></q-pagination>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import blogCard from "@/components/blogCard.vue";
const axios = require("axios");

export default {
  name: "allblogs",
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
  mounted() {
    if (this.authState && this.authState.isAuthenticated) {
      this.token = this.$auth.getAccessToken();
    } else {
      this.$auth.signInWithRedirect({ originalUri: "/" });
    }
    console.log(this.token);
    axios({
      method: "get",
      url: "https://egc18xe6uh.execute-api.ap-northeast-2.amazonaws.com/Prod/blogs",
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

// 새로고침하면 목록 사라져버림

<template>
  <div>
    <!-- 검색창 -->
    <form @submit.prevent>
      <input
        class="view"
        type="text"
        :value="keyword"
        @input="search((keyword = $event.target.value))"
        placeholder="검색어를 입력하세요."
      />
      <input class="btn" type="button" value="검색" />
    </form>
    <!-- 영상 목록 -->
    <div style="display: flex; flex-wrap: wrap">
      <router-link
        v-for="(photo, idx) in result"
        v-bind:key="idx"
        style="display: inline-block; height: 250px"
        :to="`/vdetail/${photo.id}`"
      >
        <div>
          <img :src="photo.url" alt="" style="width: 200px" />
        </div>
        <span style="width: 200px; display: inline-block">{{
          photo.title
        }}</span>
      </router-link>
    </div>
  </div>
</template>

<script>
// import VideoInf from "@/components/common/VideoInf.vue";
import lodash from "lodash";
import { mapState } from "vuex";

export default {
  name: "SearchVideo",
  components: {
    // VideoInf,
  },
  data() {
    return {
      keyword: "",
      result: [],
    };
  },
  props: { option: Object, rerender: Number },
  computed: {
    ...mapState(["videos"]),
  },
  methods: {
    search(keyword) {
      let ans = [];
      console.log(keyword);
      for (let video of this.videos) {
        if (video.title.toLowerCase().includes(keyword.toLowerCase())) {
          ans.push(video);
        }
      }
      this.result = ans;
    },
    init() {
      this.$store.dispatch(this.option.action).then(() => {
        for (let video of this.videos) {
          video.title = lodash.unescape(video.title);
        }
        this.result = this.videos;
        sessionStorage.setItem("videos", JSON.stringify(this.videos));
        console.log("load videos for search");
      });
    },
  },
  created() {
    if (!sessionStorage.getItem("videos")) {
      // alert("init");
      this.init();
    } else {
      // alert("no init");
      this.result = JSON.parse(sessionStorage.getItem("videos"));
    }
  },
  beforeDestroy() {
    sessionStorage.removeItem("videos");
  },
};
</script>

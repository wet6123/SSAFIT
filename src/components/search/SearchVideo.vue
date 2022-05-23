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
        style="display: inline-block; height: 250px; color: black"
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
      let add = [];
      console.log(keyword);
      for (let video of this.videos) {
        if (video.title.toLowerCase().includes(keyword.toLowerCase())) {
          let { title, ...rest } = video;
          title = this.textLengthOverCut(title, 25, "...");
          add.push({ title, ...rest });
        }
      }
      this.result = add;
    },
    textLengthOverCut(txt, len, lastTxt) {
      if (len == "" || len == null) {
        // 기본값
        len = 20;
      }
      if (lastTxt == "" || lastTxt == null) {
        // 기본값
        lastTxt = "...";
      }
      if (txt.length > len) {
        txt = txt.substr(0, len) + lastTxt;
      }
      return txt;
    },
  },
  created() {
    this.$store.dispatch(this.option.action).then(() => {
      this.search("");
    });
  },
};
</script>

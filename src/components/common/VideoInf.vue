<template>
  <div style="max-width: 1190px">
    <div style="display: flex; flex-wrap: wrap">
      <router-link
        v-for="(photo, idx) in shownPhotos"
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
    <v-btn v-intersect="onIntersect" @click="getPhotos">더 보기</v-btn>
  </div>
</template>

<script>
// import lodash from "lodash";
import { mapState } from "vuex";

export default {
  name: "VideoInf",
  data() {
    return {
      photos: [], //서버 통신으로 받아오는 비디오 배열
      shownPhotos: [], //보여주는 비디오 배열
      current: 0, //지금 보여주는 비디오 개수
      loaded: 0, //지금까지 로딩된 비디오 배열의 비디오 수 => 이거를 howMany씩 잘라서 shownPhotos에 넣는다
      howMany: 15, //한번에 몇개 영상 갱신?
    };
  },
  props: {
    option: {
      type: [Object],
    },
    part: {
      type: [String],
      default: "",
    },
  },
  computed: {
    ...mapState(["videos"]), //여기에 state 더 불러와줘야함
  },
  methods: {
    getPhotos: function () {
      this.$store.dispatch(this.option.action).then(() => {
        console.log("load videos");
        let add = [];
        //data
        console.log(this.part);
        for (let video of this.videos) {
          if (video.part.includes(this.part)) {
            add.push(video);
          }
        }
        this.photos = [...this.photos, ...add];
        this.loaded += add.length;
        // console.log(this.photos.length);
        this.addFromLoaded();
      });
    },
    onIntersect(entries, observer, isIntersecting) {
      if (isIntersecting) {
        // console.log(isIntersecting);
        if (this.current == this.loaded) {
          this.getPhotos();
        } else {
          this.addFromLoaded();
        }
      }
    },
    addFromLoaded() {
      let added = this.howMany;
      if (this.howMany > this.photos.length) added = this.photos.length;
      this.shownPhotos.splice(this.current, 0, ...this.photos.splice(0, added));
      console.log("loaded: " + this.loaded + " current: " + this.current);
      // console.log(this.shownPhotos.length);
      this.current += added;
    },
  },
  created() {
    this.getPhotos();
  },
  mounted() {
    this.onIntersect();
  },
  updated() {
    this.onIntersect();
  },
};
</script>

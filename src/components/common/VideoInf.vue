<template>
  <div style="max-width: 1190px">
    <div style="display: flex; flex-wrap: wrap">
      <span
        v-for="(photo, idx) in shownPhotos"
        v-bind:key="idx"
        style="display: inline-block; height: 250px"
      >
        <div>
          <img :src="photo.url" alt="" style="width: 200px" />
        </div>
        <span style="width: 200px; display: inline-block">{{
          photo.title
        }}</span>
      </span>
    </div>
    <v-btn v-intersect="onIntersect">더 보기</v-btn>
  </div>
</template>

<script>
import axios from "axios";
import lodash from "lodash";
export default {
  name: "VideoInf",
  data() {
    return {
      photos: [], //서버 통신으로 받아오는 비디오 배열
      shownPhotos: [], //보여주는 비디오 배열
      current: 0, //지금 보여주는 비디오 개수
      loaded: 0, //지금까지 로딩된 비디오 배열의 비디오 수
      howMany: 15, //한번에 몇개 영상 갱신?
    };
  },
  methods: {
    getPhotos: function () {
      axios.get("http://localhost:9999/video/all").then((res) => {
        //title 특문 디코딩
        for (let video of res.data) {
          console.log("load videos");
          video.title = lodash.unescape(video.title);
        }
        //data
        this.photos = [...this.photos, ...res.data];
        this.loaded += res.data.length;
        console.log(this.photos.length);
        console.log("loaded: " + this.loaded + " current: " + this.current);
        this.addFromLoaded();
      });
    },
    onIntersect(entries, observer, isIntersecting) {
      if (isIntersecting) {
        console.log(isIntersecting);
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
      console.log(this.shownPhotos.length);
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

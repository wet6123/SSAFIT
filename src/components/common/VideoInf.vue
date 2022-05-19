<template>
  <div style="max-width: 1190px">
    <div style="display: flex; flex-wrap: wrap">
      <span
        v-for="photo in photos"
        v-bind:key="photo.title"
        style="display: inline-block; height: 250px"
      >
        <div>
          <img :src="photo.thumbnailUrl" alt="" />
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
export default {
  name: "VideoInf",
  data() {
    return {
      photos: [],
      page: 1,
    };
  },
  methods: {
    getPhotos: function () {
      const options = {
        params: {
          _page: this.page++,
          _limit: 20,
        },
      };
      axios
        .get("https://jsonplaceholder.typicode.com/photos", options)
        .then((res) => {
          this.photos = [...this.photos, ...res.data];
        });
    },
    onIntersect(entries, observer, isIntersecting) {
      if (isIntersecting) {
        console.log(isIntersecting);
        setTimeout(() => {
          this.getPhotos();
        }, 300);
      }
    },
  },
  created() {
    this.getPhotos();
  },
  mounted: function () {
    this.onIntersect();
  },
  updated: function () {
    this.onIntersect();
  },
};
</script>

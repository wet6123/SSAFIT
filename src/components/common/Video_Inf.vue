<template>
  <div>
    <div v-for="photo in photos" v-bind:key="photo.title">
      <h5>{{ photo.title }}</h5>
      <img :src="photo.thumbnailUrl" alt="" />
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
          _limit: 5,
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

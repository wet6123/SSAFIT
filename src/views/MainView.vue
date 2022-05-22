<template>
  <div class="container">
    <div>여기는 mainview입니다</div>
    <main-carousel></main-carousel>
    <!-- 여기서 변수 내려줘서 props로 받던, VideoInf에서 url path로 식별하던, 찜리스트 받아올 수 있도록 mode 고려 -->
    <video-inf :option="{ state: 'videos', action: 'getVideos' }"></video-inf>
  </div>
</template>

<script>
import MainCarousel from "@/components/main/MainCarousel.vue";
import VideoInf from "@/components/common/VideoInf.vue";
export default {
  components: {
    MainCarousel,
    VideoInf,
  },
};
</script>

<template>
  <div>
    <div></div>
    <!-- 여기서 변수 내려줘서 props로 받던, VideoInf에서 url path로 식별하던, 찜리스트 받아올 수 있도록 mode 고려 -->
    <video-inf
      :option="{ state: 'videos', action: 'getVideos' }"
      :part="part"
    ></video-inf>
  </div>
</template>

<script>
import VideoInf from "@/components/common/VideoInf.vue";
export default {
  components: {
    VideoInf,
  },
  data() {
    return {
      part: "",
    };
  },
};
</script>

<style></style>

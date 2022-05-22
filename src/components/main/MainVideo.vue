<template>
  <div>
    <div>
      <button @click="part = ''" style="border: solid; margin: 5px">
        전체
      </button>
      <button
        v-for="(partName, idx) in parts"
        v-bind:key="idx"
        @click="part = partName"
        style="border: solid; margin: 5px"
      >
        {{ partName }}
      </button>
    </div>
    <!-- 여기서 변수 내려줘서 props로 받던, VideoInf에서 url path로 식별하던, 찜리스트 받아올 수 있도록 mode 고려 -->
    <video-inf
      :option="{ state: 'videos', action: 'getVideos' }"
      :part="part"
    ></video-inf>
  </div>
</template>

<script>
import axios from "axios";
import VideoInf from "@/components/common/VideoInf.vue";
export default {
  components: {
    VideoInf,
  },
  data() {
    return {
      parts: [],
      part: "",
    };
  },
  created() {
    //이녀석 vuex로 보내버려~
    axios.get("http://localhost:9999/video/part").then((res) => {
      this.parts = [...this.parts, ...res.data];
    });
  },
};
</script>

<style></style>

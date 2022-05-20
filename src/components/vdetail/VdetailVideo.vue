<template>
  <div class="container">
      <iframe
            width="700"
            height="440"
            :src="`https://www.youtube.com/embed/${video.videoKey}`"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
            ></iframe>
  </div>
</template>

<script>
import {mapState} from "vuex";
export default {
    name: "VdetatilVideo",
    computed: {
        ...mapState(['video'])
    }
}
</script>

<style>

</style>
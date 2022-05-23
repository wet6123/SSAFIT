<template>
  <div>
    <div>MainCarousel</div>
    <div class="carousel-container">
      <div ref="imgBlock" class="carousel-slide">
        <router-link
          v-for="photo in recommend"
          :key="photo.idx"
          :class="[{ lastImgs: photo.last }, { firstImgs: photo.first }]"
          :to="`/vdetail/${photo.id}`"
          style="color: black"
        >
          <img :src="photo.url" alt="" class="oneSlide" />
          <span style="width: 200px; display: inline-block">{{
            photo.title
          }}</span>
        </router-link>
      </div>
      <button id="prevBtn" ref="prevBtn" @click="clickBefore">Prev</button>
      <button id="nextBtn" ref="nextBtn" @click="clickNext">Next</button>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "MainCarousel",
  data() {
    return {
      // photos: [],
      page: 1,
      size: 200, //이미지 하나 크기 (width)
      numberOfImgs: 3,
      counter: 1,
    };
  },
  computed: {
    ...mapState(["recommend"]), //여기에 state 더 불러와줘야함
  },
  methods: {
    getPhotos: function () {
      this.$store.dispatch("getRecommend").then(() => {
        console.log("recommend");
        console.log(this.recommend);
      });
    },
    transformImg() {
      this.$refs.imgBlock.style.transform = `translateX(${
        -this.size * this.numberOfImgs * this.counter
      }px)`;
    },
    clickNext() {
      console.log(this.counter);
      if (this.counter > this.recommend.length / this.numberOfImgs - 2) {
        return;
      }
      this.$refs.imgBlock.style.transition = "transform .3s ease-in-out";
      this.counter++;
      this.transformImg();
    },
    clickBefore() {
      console.log(this.counter);
      if (this.counter <= 0) {
        return;
      }
      this.$refs.imgBlock.style.transition = "transform .3s ease-in-out";
      this.counter--;
      this.transformImg();
    },
    transitionEnd() {
      //여기 내 코드에 맞게 수정할 필요가 있음, 처음 <-> 마지막 왔다갔다 하는 부분
      if (this.$imgs[this.counter * this.numberOfImgs].class === "firstImgs") {
        this.$imgBlock.style.transition = "none";
        this.counter = this.$imgs.length - this.counter;
        this.transformImg();
      } else if (this.$imgs[this.counter].id === "last-img") {
        this.$imgBlock.style.transition = "none";
        this.counter = this.$imgs.length - 2;
        this.transformImg();
      }
    },
  },
  mounted() {
    this.getPhotos();
    this.transformImg();
  },
};
</script>

<style>
:root {
  /* 이미지 사이즈 지정해서 캐러샐 크기 조정 가능*/
  --img-size: 200;
}

.carousel-container {
  width: calc(var(--img-size) * 3px);
  height: calc(var(--img-size) * 3 / 4 * 1px + 48px);
  margin: 30px auto;
  border: 0px solid #000;
  overflow: hidden;
  position: relative;
}
.carousel-slide {
  display: flex;
  height: calc(var(--img-size) * 3 / 4 * 1px);
  width: calc(var(--img-size) * 1px);
}
.oneSlide {
  height: calc(var(--img-size) * 3 / 4 * 1px);
  width: calc(var(--img-size) * 1px);
}

#prevBtn {
  position: absolute;
  top: 50%;
  left: 0;
  transform: translate(0%, -50%);
  width: 20px;
  height: 36px;
  text-indent: -9999px;
  background-color: black;
}
#nextBtn {
  position: absolute;
  top: 50%;
  right: 0;
  transform: translate(0%, -50%);
  width: 20px;
  height: 36px;
  text-indent: -9999px;
  background-color: black;
}
</style>

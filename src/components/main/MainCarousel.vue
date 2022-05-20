<template>
  <div>
    <div>MainCarousel</div>
    <div class="carousel-container">
      <div ref="imgBlock" class="carousel-slide">
        <img
          v-for="photo in photos"
          :key="photo.idx"
          :src="photo.thumbnailUrl"
          :class="[{ lastImgs: photo.last }, { firstImgs: photo.first }]"
          alt=""
        />
      </div>
      <button id="prevBtn" ref="prevBtn" @click="clickBefore">Prev</button>
      <button id="nextBtn" ref="nextBtn" @click="clickNext">Next</button>
    </div>
    <!-- 테스트용입니다 이 아래는 나중에 삭제하세요 -->
    <!-- <div>
      <img
        v-for="photo in photos"
        :key="photo.idx"
        :src="photo.thumbnailUrl"
        :class="[{ lastImgs: photo.last }, { firstImgs: photo.first }]"
        alt=""
      />
    </div> -->
    <!-- 테스트용입니다 이 위는 나중에 삭제하세요 -->
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "MainCarousel",
  data() {
    return {
      photos: [],
      page: 1,
      size: 150, //이미지 하나 크기 (width)
      numberOfImgs: 3,
      counter: 1,
    };
  },
  methods: {
    getPhotos: function () {
      const options = {
        params: {
          _page: this.page++,
          _limit: 9,
        },
      };
      axios
        .get("https://jsonplaceholder.typicode.com/photos", options)
        .then((res) => {
          this.photos = [
            //딥카피 위해서 json.parse... 등 쓴거임
            //딥카피 안하면 밑에서 key값 꼬여서 id 지정 고장남
            JSON.parse(JSON.stringify(res.data[6])),
            JSON.parse(JSON.stringify(res.data[7])),
            JSON.parse(JSON.stringify(res.data[8])),
            ...res.data,
            JSON.parse(JSON.stringify(res.data[0])),
            JSON.parse(JSON.stringify(res.data[1])),
            JSON.parse(JSON.stringify(res.data[2])),
          ];
          let cnt = 0;
          this.photos.forEach((element) => {
            cnt++;
            element.id = cnt;
            if (cnt < 4) element.last = true;
            else element.last = false;
            if (cnt > 12) element.first = true;
            else element.first = false;
          });
          // console.log(this.photos);
        });
    },
    transformImg() {
      this.$refs.imgBlock.style.transform = `translateX(${
        -this.size * this.numberOfImgs * this.counter
      }px)`;
    },
    clickNext() {
      console.log(this.counter);
      if (this.counter > this.photos.length / this.numberOfImgs - 2) {
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
  --img-size: 150;
}

.carousel-container {
  width: calc(var(--img-size) * 3px);
  margin: 30px auto;
  border: 0px solid #000;
  overflow: hidden;
  position: relative;
}
.carousel-slide {
  display: flex;
  width: 100%;
  height: calc(var(--img-size) * 1px);
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

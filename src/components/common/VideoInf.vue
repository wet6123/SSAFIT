<template>
  <div style="max-width: 1190px">
    <div class="cardContainer">
      <span v-for="(photo, idx) in shownPhotos" v-bind:key="idx" class="card">
        <router-link :to="`/vdetail/${photo.id}`">
          <img :src="photo.url" alt="" />
          <span>{{ photo.title }}</span>
        </router-link>
        <button>
          <font-awesome-icon icon="fa-solid fa-heart" id="likeBtn" />
        </button>
      </span>
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
      type: Object,
    },
    part: {
      type: String,
      default: "",
    },
  },
  watch: {
    part: function (val) {
      console.log(val);
      this.reset();
    },
  },
  computed: {
    ...mapState(["videos"]), //여기에 state 더 불러와줘야함
    ...mapState(["watched"]), //여기에 state 더 불러와줘야함
    ...mapState(["liked"]), //여기에 state 더 불러와줘야함
  },
  methods: {
    getPhotos: function () {
      this.$store.dispatch(this.option.action).then(() => {
        let add = [];
        //data
        console.log(this.part);
        if (this.option.state == "videos") {
          console.log("load videos");
          for (let video of this.videos) {
            if (video.part.includes(this.part)) {
              let { title, ...rest } = video;
              title = this.textLengthOverCut(title, 18, "...");
              add.push({ title, ...rest });
            }
          }
        } else if (this.option.state == "watched") {
          console.log("load watched");
          for (let video of this.watched) {
            if (video.part.includes(this.part)) {
              let { title, ...rest } = video;
              title = this.textLengthOverCut(title, 18, "...");
              add.unshift({ title, ...rest });
            }
          }
        } else if (this.option.state == "liked") {
          console.log("load liked");
          for (let video of this.liked) {
            if (video.part.includes(this.part)) {
              let { title, ...rest } = video;
              title = this.textLengthOverCut(title, 18, "...");
              add.unshift({ title, ...rest });
            }
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
          // this.getPhotos(); //무한히 같은 영상 목록 로드
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
    reset() {
      // alert(this.part); //현재 부위 출력, 전체는 ""
      this.photos = [];
      this.shownPhotos = [];
      this.loaded = 0;
      this.current = 0;
      this.getPhotos();
    },
    textLengthOverCut(txt, len, lastTxt) {
      if (len == "" || len == null) {
        // 기본값
        len = 20;
      }
      if (lastTxt == "" || lastTxt == null) {
        // 기본값
        lastTxt = "...";
      }
      if (txt.length > len) {
        txt = txt.substr(0, len) + lastTxt;
      }
      return txt;
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

<style>
.card {
  flex-grow: 1;
  display: inline-block;
  width: auto;
  flex-basis: 223px;
  transition: 0.5s;
  padding: 10px;
  border: 0 !important;
}

.card:hover {
  flex-grow: 4;
  flex-basis: 270px;
  transition: 0.5s;
}

.card img {
  width: 100%;
  transition: 0.3s;
}

.card:hover img {
  width: 100%;
  filter: brightness(50%);
  transition: 0.3s;
}

.card span {
  transition: 0.3s;
  color: black;
}

.card:hover span {
  position: absolute;
  width: 80%;
  top: 60%;
  left: 10%;
  color: white;
  font-size: 23px;
  font-weight: bold;
  transition: 0.3s;
}

.card button {
  position: absolute;
  top: 45%;
  left: 10%;
  z-index: 2;
  visibility: hidden;
  opacity: 0;
  transition-property: visibility, opacity;
  transition-duration: 0.5s;
}

.card:hover button {
  opacity: 1;
  visibility: visible;
  transition: 0.5s;
}

#likeBtn {
  color: white;
  font-size: 30px;
  transition: 0.3s;
}

#likeBtn:hover {
  color: #f82f62;
  transition: 0.3s;
}

.cardContainer {
  display: flex;
  box-sizing: border-box;
  flex-wrap: wrap;
  justify-content: space-between;
}
</style>

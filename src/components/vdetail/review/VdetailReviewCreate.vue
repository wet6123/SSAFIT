<template>
  <v-container>
    <div class="review">
      <div>
        <v-icon>mdi-account-circle</v-icon>
      </div>

      <div class="review-write">
        <star-rating
          v-model="rating"
          :increment="0.5"
          :star-size="20"
        ></star-rating>
        <v-text-field
          v-model="content"
          label="리뷰를 작성해주세요"
        ></v-text-field>
      </div>
    </div>
    <div class="btn">
      <b-button variant="outline-secondary" @click="createReview"
        >등록</b-button
      >
    </div>
  </v-container>
</template>

<script>
import { mapState } from "vuex";
import StarRating from "vue-star-rating";
export default {
  data() {
    return {
      content: "",
      rating: 0,
    };
  },
  computed: {
    ...mapState(["video", "userinfo"]),
  },
  components: {
    StarRating,
  },
  methods: {
    createReview() {
      let newReview = {
        uid: 0,
        vid: this.video.id,
        rate: this.rating,
        content: this.content,
      };

      this.$store.dispatch("createReview", newReview);
      this.content = "";
    },
    setRating: function (rating) {
      this.rating = rating;
    },
  },
};
</script>

<style scoped>
.review {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.btn {
  display: flex;
  justify-content: flex-end;
  margin-right: 20px;
}
.review-write {
  margin-left: 20px;
  width: 90%;
}
</style>
>

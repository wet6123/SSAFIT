<template>
  <div class="container">
    <div v-if="reviews.length">
      <b-table-simple hover responsive>
        <b-tbody>
          <b-tr v-for="review in reviews" :key="review.id">
            <b-td>(프로필)</b-td>
            <b-td>{{ userinfo.nickname }}</b-td>
            <b-td>
              <b-tr>{{ review.content }}</b-tr>
            </b-td>
            <b-td><b-link :to="`/review/${review.id}`">답글</b-link> </b-td>
            <div v-if="userinfo.userid === review.writer">
              <b-td>
                <v-btn class="mx-2">
                  <v-icon dark> mdi-pencil </v-icon>
                </v-btn>
                <v-btn class="mx-2">
                  <v-icon dark> mdi-delete </v-icon>
                </v-btn>
              </b-td>
            </div>
            <div v-else><v-btn class="mx-2"> 신고하기 </v-btn></div>
            <router-view />
          </b-tr>
        </b-tbody>
      </b-table-simple>
    </div>
    <div v-else>등록된 리뷰가 없습니다.</div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "VdetailReviewList",
  //   data() {
  //     //   createReply: {false};
  //   },
  computed: {
    ...mapState(["reviews", "userinfo"]),
  },
  methods: {
    deleteReview() {
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

  // methods: {
  //   search() {
  //     const payload = {
  //       // 나중에 백엔드 확인 후 삭제
  //       mode: this.mode,
  //       keyword: this.keyword,
  //     };
  //     this.$store.dispatch("getReviews", payload);
  //   },
  // },
};
</script>

<style></style>

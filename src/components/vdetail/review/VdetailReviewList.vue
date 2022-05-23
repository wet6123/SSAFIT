<template>
  <div class="container">
    <div v-if="reviews.length">
      <b-table-simple hover responsive>
        <b-tbody>
          <b-tr v-for="(review, index) in reviews" :key="index">
            <div :id="reviewid" @click="clickReview">
              <b-td>(프로필)</b-td>
              <b-td>{{ userinfo.nickname }}</b-td>
              <b-td>
                <b-tr>{{ review.content }}</b-tr>
                <b-tr>{{ userinfo.id }}</b-tr>
                <b-tr>{{ review.uid }}</b-tr>
              </b-td>
              <b-td><b-link :to="`/review/${review.id}`">답글</b-link> </b-td>
              <div v-if="userinfo.id === review.uid">
                <b-td>
                  <v-btn class="mx-2">
                    <v-icon dark> mdi-pencil </v-icon>
                  </v-btn>
                  <v-btn class="mx-2">
                    <v-icon dark> mdi-delete </v-icon>
                  </v-btn>
                </b-td>
              </div>
              <div v-else><v-btn class="mx-2"> 신고 </v-btn></div>
            </div>
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
  data() {
    return {
      reviewid: "",
    };
  },
  computed: {
    ...mapState(["reviews", "userinfo"]),
  },
  methods: {
    getReview() {},
    deleteReview() {
      this.$store.dispatch("deleteReview");
      this.content = "";
    },
    setRating: function (rating) {
      this.rating = rating;
    },
    clickReview() {
      this.reviewid = document.getElementById();
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

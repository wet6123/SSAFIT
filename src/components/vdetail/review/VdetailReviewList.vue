<template>
  <div class="container">
    <div v-if="reviews.length">
      <b-table-simple hover responsive>
        <b-tr v-for="(review, index) in reviews" :key="index">
          <b-td>(프로필)</b-td>
          <b-tr>
            <b-td>{{ userinfo.nickname }}</b-td>
            <b-td>{{ review.rate }}</b-td>
            <b-td><b-link @click="toggleCreateReply(index)">답글</b-link></b-td>
            <b-td
              ><div v-if="userinfo.id === review.uid">
                <v-btn class="mx-2">
                  <v-icon dark> mdi-pencil </v-icon>
                </v-btn>
                <v-btn class="mx-2">
                  <v-icon dark> mdi-delete </v-icon>
                </v-btn>
              </div></b-td
            >
          </b-tr>
          <b-tr>
            <b-td>
              <b-tr>{{ review.content }}</b-tr>
            </b-td>
          </b-tr>
          <b-tr>
            <div class="review" :id="index" style="display: none">
              <div>
                <v-icon>mdi-account-circle</v-icon>
              </div>
              <div class="review-write">
                <v-text-field
                  v-model="content"
                  label="답글을 작성해주세요"
                ></v-text-field>
              </div>
              <div class="btn">
                <b-button
                  variant="outline-secondary"
                  @click="toggleCreateReply(index)"
                  >취소</b-button
                >
                <b-button variant="outline-secondary" @click="createReview"
                  >등록</b-button
                >
              </div>
            </div>
          </b-tr>
          <b-tr>
            <b-link @click="toggleShowReply(review.id)">답글 {{replies.length}}개</b-link>
            <div class="review" :id="review.id" style="display: none">
              <b-tr v-for="(reply, index) in replies" :key="index">
                <b-td>(프로필)</b-td>
                <b-tr>
                  <b-td>{{ reply.nickname }}</b-td>
                  <b-td>{{ reply.rate }}</b-td>
                  <b-td
                    ><b-link @click="toggleCreateReply(index)"
                      >답글</b-link
                    ></b-td
                  >
                  <b-td
                    ><div v-if="userinfo.id === reply.uid">
                      <v-btn class="mx-2">
                        <v-icon dark> mdi-pencil </v-icon>
                      </v-btn>
                      <v-btn class="mx-2">
                        <v-icon dark> mdi-delete </v-icon>
                      </v-btn>
                    </div></b-td
                  >
                </b-tr>
                <b-tr>
                  <b-td>
                    <b-tr>{{ reply.content }}</b-tr>
                  </b-td>
                </b-tr>
              </b-tr>
            </div>
          </b-tr>
        </b-tr>
      </b-table-simple>
    </div>
    <div v-else>등록된 리뷰가 없습니다.</div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "VdetailReviewList",
  // data() {
  //   return {
  //   };
  // },
  computed: {
    ...mapState(["video","reviews", "userinfo", "replies"]),
  },
  methods: {
    toggleCreateReply(index) {
      let e = document.getElementById(index);
      e.style.display = e.style.display != "none" ? "none" : "block";
    },
    toggleShowReply(reviewid) {
      let e = document.getElementById(reviewid);
      e.style.display = e.style.display != "none" ? "none" : "block";
    },
    // createReply() {
    //   let newReply = {
    //     uid: 0,
    //     vid: this.video.id,
    //     content: this.content,
    //     depth: 1,
    //   };

    //   this.$store.dispatch("createReview", newReply);
    //   this.content = "";
    // },


    // getReview() {},
    // deleteReview() {
    //   this.$store.dispatch("deleteReview");
    //   this.content = "";
    // },
    // setRating: function (rating) {
    //   this.rating = rating;
    // },
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

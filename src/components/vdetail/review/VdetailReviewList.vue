<template>
  <div class="container">
    <div v-if="reviews.length">
      <b-table-simple hover responsive>
        <b-tr v-for="(review, index) in reviews" :key="index+'p'">
          <b-td>
            (프로필)
          </b-td>
          <b-td>
            <b-tr>
              <b-td>{{ userinfo.nickname }}</b-td>
              <b-td>{{ review.rate }}</b-td>
            </b-tr>
            <b-tr>
              {{ review.content }}
            </b-tr>
            <b-tr class="review" :id="index+'p'" style="display: none">
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
                <b-button variant="outline-secondary" @click="createReply"
                  >등록</b-button
                >
              </div>
            </b-tr>
            <br/>
            <b-tr>
            <b-link @click="[toggleShowReply(review.id), numOfReplies(review.id)]">답글 보기</b-link>
            <div class="reply" :id="review.id" style="display: none">
              <div v-if="nums[review.id] == 0">
                등록된 답글이 없습니다.
              </div>
              <b-tr v-for="(reply, index) in replies" :key="index+'c'">
                <div v-if="review.id === reply.re_id">
                  <b-td>
                    (프로필)
                  </b-td>
                  <b-td>
                    <b-tr>{{ reply.nickname }}</b-tr>
                    <b-tr>{{ reply.content }}</b-tr>
                  </b-td>
                  <b-td>
                    <div v-if="userinfo.id === reply.uid">
                        <v-btn class="mx-2">
                          <v-icon dark> mdi-pencil </v-icon>
                        </v-btn>
                        <v-btn class="mx-2">
                          <v-icon dark> mdi-delete </v-icon>
                        </v-btn>
                      </div>
                  </b-td>
                </div>
              </b-tr>
            </div>
          </b-tr>
          </b-td>
          <b-td>
              <v-btn @click="toggleCreateReply(index+'p')">답글</v-btn>
          </b-td>
          <b-td>
              <div v-if="userinfo.id === review.uid">
              <v-btn class="mx-2">
                <v-icon dark> mdi-pencil </v-icon>
              </v-btn>
              <v-btn class="mx-2">
                <v-icon dark> mdi-delete </v-icon>
              </v-btn>
            </div>
          </b-td>
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
  data() {
    return {
      content: "",
      num: [],
    };
  },
  computed: {
    ...mapState(["video","reviews", "userinfo", "replies"]),
    nums() {
      return this.num;
    }
  },
  methods: {
    numOfReplies(reviewid) {
      let cnt = 0;
      for(let i=0; i < this.replies.length; i++) {
         if(this.replies[i].re_id == reviewid)
          cnt++;
       }

      this.num.splice(reviewid, 0, cnt);
    },
    toggleCreateReply(index) {
      let e = document.getElementById(index);
      e.style.display = e.style.display != "none" ? "none" : "block";
    },
    toggleShowReply(reviewid) {
      let e = document.getElementById(reviewid);
      e.style.display = e.style.display != "none" ? "none" : "block";
    },
    createReply() {
      let newReply = {
        uid: 0,
        vid: this.video.id,
        content: this.content,
        depth: 1,
      };

      this.$store.dispatch("createReview", newReply);
      this.content = "";
    },


    // getReview() {},
    // deleteReview() {
    //   this.$store.dispatch("deleteReview");
    //   this.content = "";
    // },
    // setRating: function (rating) {
    //   this.rating = rating;
    // },
  },
  created() {
    const pathName = new URL(document.location).pathname.split("/");
    const id = pathName[pathName.length - 1];
    this.$store.dispatch("getReplies", id);
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

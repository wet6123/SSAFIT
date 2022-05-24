<template>
  <div class="container">
    <div v-if="reviews.length">
      <b-table-simple hover responsive>
        <b-tr v-for="(review, index) in reviews" :key="index + 'p'">
          <b-td> (프로필) </b-td>
          <b-td>
            <b-row>
              <b-col>{{ review.writer }}</b-col>
              <b-col
                ><star-rating
                  :rating="review.rate / 2"
                  :read-only="true"
                  :increment="0.5"
                  :star-size="20"
                ></star-rating
              ></b-col>
            </b-row>
            <b-tr>
              {{ review.content }}
            </b-tr>
            <b-tr class="review" :id="index + 'p'" style="display: none">
              <br />
              <b-row>
                <b-col cols="1">
                  <v-icon>mdi-account-circle</v-icon>
                </b-col>
                <b-col class="review-write" cols="7">
                  <v-text-field
                    v-model="content[index]"
                    label="답글을 작성해주세요"
                    @keyup.enter="createReply(review.id, index)"
                  ></v-text-field>
                </b-col>
                <b-col class="btn" cols="4">
                  <b-button
                    variant="outline-secondary"
                    @click="createReply(review.id, index)"
                    class="btn-sm"
                    >등록</b-button
                  >
                  <b-button
                    class="btn-sm"
                    variant="outline-secondary"
                    @click="toggleCreateReply(index + 'p')"
                    >취소</b-button
                  >
                </b-col>
              </b-row>
            </b-tr>
            <br />
            <b-tr>
              <b-link @click="toggleShowReply(review.id)"
                >답글 {{ replyNum[review.id] }}개</b-link
              >
              <div class="reply" :id="review.id" style="display: none">
                <div v-if="replyNum[review.id] == 0">
                  등록된 답글이 없습니다.
                </div>
                <b-tr v-for="(reply, index) in replies" :key="index + 'c'">
                  <div v-if="review.id === reply.re_id">
                    <b-td> (프로필) </b-td>
                    <b-td>
                      <b-tr>{{ reply.writer }}</b-tr>
                      <b-tr>{{ reply.content }}</b-tr>
                    </b-td>
                    <b-td>
                      <div v-if="userinfo.id === reply.uid">
                        <v-btn small class="mx-2">
                          <v-icon dark> mdi-pencil </v-icon>
                        </v-btn>
                        <v-btn
                          small
                          class="mx-2"
                          @click="deleteReview(reply.id)"
                          >{{ reply.id }}
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
            <v-btn @click="toggleCreateReply(index + 'p')">답글</v-btn>
          </b-td>
          <b-td>
            <div v-if="userinfo.id === review.uid">
              <v-btn class="mx-2">
                <v-icon dark> mdi-pencil </v-icon>
              </v-btn>
              <v-btn class="mx-2" @click="deleteReview(review.id)"
                >{{ review.id }}
                <v-icon dark>mdi-delete </v-icon>
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
import StarRating from "vue-star-rating";
export default {
  name: "VdetailReviewList",
  data() {
    return {
      content: [],
      num: [],
    };
  },
  computed: {
    ...mapState(["video", "reviews", "userinfo", "replies", "replyNum"]),
  },
  components: {
    StarRating,
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
    createReply(re_id, index) {
      let newReply = {
        uid: 0,
        vid: this.video.id,
        content: this.content[index],
        depth: 1,
        re_id,
      };

      this.$store.dispatch("createReview", newReply);
      this.content[index] = "";
    },
    deleteReview(id) {
      this.$store.dispatch("deleteReview", id);
      router;
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
    // const pathName = new URL(document.location).pathname.split("/");
    // const id = pathName[pathName.length - 1];
    // this.$store.dispatch("getReplies", id);
    for (let i = 0; i < this.reviews.length; i++) {
      this.content[i] = "";
    }
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

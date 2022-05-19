<template>
  <div class="container">
    
    <div v-if="reviews.length">
      <b-table-simple
        hover
        responsive
      >
        <b-tbody>
          <b-tr v-for="review in reviews" :key="review.id">
            <b-td>(프로필)</b-td>
            <b-td>
                <b-tr>
                    {{review.writer}}
                    <b-icon icon="star-fill"></b-icon>
                    <b-icon icon="star-fill"></b-icon>
                    <b-icon icon="star-fill"></b-icon>
                    <b-icon icon="star-fill"></b-icon>
                    <b-icon icon="star-fill"></b-icon>
                </b-tr>
                <b-tr>{{review.content}}</b-tr>
            </b-td>
            <b-td><b-link :to="`/board/${review.id}`">답글</b-link></b-td>
            <router-view />
          </b-tr>
        </b-tbody>
      </b-table-simple>
    </div>
    <div v-else>
      등록된 리뷰가 없습니다.
    </div>
  </div>

</template>

<script>
import {mapState} from 'vuex'

export default {
  name: "VdetailReviewList",
//   data() {
//     //   createReply: {false};
//   },
  computed: {
    ...mapState([
      "reviews"
    ]),
  },
  created() {
    this.$store.dispatch('getReviews')
  },
  methods: {
    search(){
      const payload = {
          // 나중에 백엔드 확인 후 삭제
        mode: this.mode,
        keyword: this.keyword
      }
      this.$store.dispatch("getReviews", payload)
    }
  }
};
</script>

<style></style>

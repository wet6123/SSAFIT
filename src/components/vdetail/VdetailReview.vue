<template>
    <div class="container">
        <div>
            <h2>유저 리뷰 </h2>
            <h4> {{nums}}개</h4>
        </div>
        <hr>
        <!-- <div v-if="로그인상태">
            리뷰 작성
        </div> -->
        <vdetail-review-list></vdetail-review-list>
    </div>
</template>

<script>
import VdetailReviewList from "@/components/vdetail/review/VdetailReviewList.vue"
import {mapState} from 'vuex'

export default {
    name: "VdetailReview",
    components: {
        VdetailReviewList
    },
    computed: {
        ...mapState([
        "reviews"
        ]),
        nums(){
        return this.reviews.length
        },
    },
}
</script>

<style>

</style>
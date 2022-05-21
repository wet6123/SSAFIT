import Vue from "vue";
import Vuex from "vuex";
import router from "@/router";
import axios from "axios";

Vue.use(Vuex);

const REST_API = `http://localhost:9999`;

export default new Vuex.Store({
  state: {
    // 비디오 관련
    videos: [],
    video: {},

    // 리뷰 관련
    reviews: [],
    review: {},

    // 로그인 관련
    isLogin: false,
  },
  getters: {},
  mutations: {
    // 비디오 관련
    GET_VIDEOS(state, payload) {
      state.videos = payload;
    },
    GET_VIDEO(state, payload) {
      state.video = payload;
    },

    // 리뷰 관련
    GET_REVIEWS(state, payload) {
      state.reviews = payload;
    },
    GET_REVIEW(state, payload) {
      state.review = payload;
    },
    CREATE_REVIEW(state, payload) {
      state.reviews.push(payload);
    },
    UPDATE_REVIEW(state, payload) {
      state.review = payload;
    },

    // 로그인 관련
    USER_LOGIN(state) {
      state.isLogin = true;
    },
  },
  actions: {
    //비디오 관련
    getVideos({ commit }, payload) {
      let params = null;

      if (payload) {
        params = payload;
      }
      const API_URL = `${REST_API}/video/all`; // 백엔드 참고
      axios({
        url: API_URL,
        method: "GET",
        params,
      })
        .then((res) => {
          console.log(res);
          commit("GET_VIDEOS", res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getVideo({ commit }, id) {
      const API_URL = `${REST_API}/video/detail/${id}`;
      axios({
        url: API_URL,
        method: "GET",
      })
        .then((res) => {
          commit("GET_VIDEO", res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    },

    //리뷰 관련
    getReviews({ commit }, payload) {
      let params = null;

      if (payload) {
        params = payload;
      }
      const API_URL = `${REST_API}/board`; // 백엔드 참고
      axios({
        url: API_URL,
        method: "GET",
        params,
      })
        .then((res) => {
          console.log(res);
          commit("GET_REVIEWS", res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getReview({ commit }, id) {
      const API_URL = `${REST_API}/board/${id}`; // 백엔드 참고
      axios({
        url: API_URL,
        method: "GET",
      })
        .then((res) => {
          commit("GET_REVIEW", res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    createReview({ commit }, review) {
      const API_URL = `${REST_API}/board`; // 백엔드 참고
      axios({
        url: API_URL,
        method: "POST",
        params: review,
      })
        .then(() => {
          commit("CREATE_REVIEW", review);
          router.push("/board");
        })
        .catch((err) => {
          console.log(err);
        });
    },
    updateReview({ commit }, review) {
      const API_URL = `${REST_API}/board`; // 백엔드 참고
      axios({
        url: API_URL,
        method: "PUT",
        params: review,
      })
        .then(() => {
          commit("UPDATE_REVIEW", review);
          router.push({ name: "vdetail", params: { id: review.id } });
        })
        .catch((err) => {
          console.log(err);
        });
    },
    deleteReview(context, id) {
      context;
      const API_URL = `${REST_API}/board/${id}`; // 백엔드 참고
      axios({
        url: API_URL,
        method: "DELETE",
      })
        .then(() => {
          router.push({ name: "vdetail" });
        })
        .catch((err) => {
          console.log(err);
        });
    },

    // 로그인 관련
    userLogin({ commit }, user) {
      const API_URL = `${REST_API}/user/login`;
      axios({
        url: API_URL,
        method: "POST",
        params: user,
      })
        .then((res) => {
          console.log(res);
          commit("USER_LOGIN");
          sessionStorage.setItem("access-token", res.data["access-token"]);
          router.push({ name: "main" });
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  modules: {},
});

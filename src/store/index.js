import Vue from "vue";
import Vuex from "vuex";
import router from "@/router";
import axios from "axios";
import lodash from "lodash";

Vue.use(Vuex);

const REST_API = `http://localhost:9999`;

export default new Vuex.Store({
  state: {
    // 비디오 관련
    videos: [],
    video: {},

    // 추천 비디오 관련
    recommend: [],

    // 찜 기록 관련
    liked: [],

    // 시청 기록 관련
    watched: [],

    // 리뷰 관련
    reviews: [],
    review: {},

    // 로그인 관련
    isLogin: false, // 로그인 상태
    userinfo: {}, // 로그인된 user의 정보
    // 회원가입 관련
    checkedId: false, // id 중복체크완료 여부
    checkedEmail: false, // eamil 중복체크완료 여부
    compare_id: "", // 중복확인 완료 id값 임시저장
    compare_email: "", // 중복확인 완료 email값 임시저장
    // 비밀번호 재설정 관련
    isAuthPw: false, // 재설정 권한
    tmp_userid: "", // 임시 저장 아이디
  },
  getters: {
    getIsLogin(state) {
      return state.isLogin;
    },
    getPwAuth(state) {
      return state.isAuthPw;
    },
  },
  mutations: {
    // 비디오 관련
    GET_VIDEOS(state, payload) {
      state.videos = payload;
    },
    GET_VIDEO(state, payload) {
      state.video = payload;
    },

    // 추천 비디오 관련
    GET_RECOMMEND(state, payload) {
      state.recommend = payload;
    },

    // 찜 기록 관련
    GET_LIKED(state, payload) {
      state.liked = payload;
    },

    // 시청 기록 관련
    GET_WATCHED(state, payload) {
      state.watched = payload;
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
    USER_LOGIN(state, user) {
      state.isLogin = true;
      state.userinfo = user;
    },
    //로그아웃 관련
    USER_LOGOUT(state) {
      state.isLogin = false;
      state.userinfo = {};
    },
    // 회원가입관련
    CHECK_DUPL_ID(state, userid) {
      state.checkedId = true;
      state.compare_id = userid;
    },
    CHECK_DUPL_EMAIL(state, email) {
      state.checkedEmail = true;
      state.compare_email = email;
    },
    DUPL_RESET(state) {
      state.checkedId = false;
      state.compare_id = "";
      state.checkedEmail = false;
      state.compare_email = "";
    },
    // 비밀번호 재설정 권한
    SET_AUTH_PW_T(state) {
      state.isAuthPw = true;
    },
    SET_AUTH_PW_F(state) {
      state.isAuthPw = false;
    },
    TMP_USER_ID(state, id) {
      state.tmp_userid = id;
    },
  },
  actions: {
    //비디오 관련
    getVideos({ commit }, payload) {
      return new Promise((resolve, reject) => {
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
            for (let video of res.data) {
              video.title = lodash.unescape(video.title);
            }
            console.log(res);
            commit("GET_VIDEOS", res.data);
            resolve();
          })
          .catch((err) => {
            console.log(err);
            reject();
          });
      });
    },
    getVideo({ commit }, id) {
      const API_URL = `${REST_API}/video/detail/${id}`;
      axios({
        url: API_URL,
        method: "GET",
        headers: {
          "access-token": localStorage.getItem("access-token"),
        },
      })
        .then((res) => {
          commit("GET_VIDEO", res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    },

    //추천 비디오 관련
    getRecommend({ commit }, payload) {
      return new Promise((resolve, reject) => {
        let params = null;

        if (payload) {
          params = payload;
        }
        const API_URL = `${REST_API}/video/recommended`; // 백엔드 참고
        axios({
          url: API_URL,
          method: "GET",
          params,
          headers: {
            "access-token": localStorage.getItem("access-token"),
          },
        })
          .then((res) => {
            const ans = [
              JSON.parse(JSON.stringify(res.data[6])),
              JSON.parse(JSON.stringify(res.data[7])),
              JSON.parse(JSON.stringify(res.data[8])),
              ...res.data.slice(0, 9),
              JSON.parse(JSON.stringify(res.data[0])),
              JSON.parse(JSON.stringify(res.data[1])),
              JSON.parse(JSON.stringify(res.data[2])),
            ];
            let cnt = 0;
            ans.forEach((element) => {
              cnt++;
              element.idx = cnt;
              if (cnt < 4) element.last = true;
              else element.last = false;
              if (cnt > 12) element.first = true;
              else element.first = false;
              element.title = lodash.unescape(element.title); //title decoding
            });
            res.data = ans;

            console.log(res);
            commit("GET_RECOMMEND", res.data);
            resolve();
          })
          .catch((err) => {
            console.log(err);
            reject();
          });
      });
    },

    //찜 기록 관련
    getLiked({ commit }, payload) {
      return new Promise((resolve, reject) => {
        let params = null;

        if (payload) {
          params = payload;
        }
        const API_URL = `${REST_API}/video/liked`; // 백엔드 참고
        axios({
          url: API_URL,
          method: "GET",
          params,
          headers: {
            "access-token": localStorage.getItem("access-token"),
          },
        })
          .then((res) => {
            for (let video of res.data) {
              video.title = lodash.unescape(video.title);
            }
            console.log(res);
            commit("GET_LIKED", res.data);
            resolve();
          })
          .catch((err) => {
            console.log(err);
            reject();
          });
      });
    },

    //시청 기록 관련
    getWatched({ commit }, payload) {
      return new Promise((resolve, reject) => {
        let params = null;

        if (payload) {
          params = payload;
        }
        const API_URL = `${REST_API}/video/watched`; // 백엔드 참고
        axios({
          url: API_URL,
          method: "GET",
          params,
          headers: {
            "access-token": localStorage.getItem("access-token"),
          },
        })
          .then((res) => {
            for (let video of res.data) {
              video.title = lodash.unescape(video.title);
            }
            console.log(res);
            commit("GET_WATCHED", res.data);
            resolve();
          })
          .catch((err) => {
            console.log(err);
            reject();
          });
      });
    },

    //리뷰 관련
    getReviews({ commit }, id) {
      let params = null;

      if (id) {
        params = id;
      }
      const API_URL = `${REST_API}/review/all/${id}`; // 백엔드 참고
      axios({
        url: API_URL,
        method: "GET",
        params,
        headers: {
          "access-token": localStorage.getItem("access-token"),
        },
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
      const API_URL = `${REST_API}/review/${id}`; // 백엔드 참고
      axios({
        url: API_URL,
        method: "GET",
        headers: {
          "access-token": localStorage.getItem("access-token"),
        },
      })
        .then((res) => {
          commit("GET_REVIEW", res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    createReview({ commit }, review) {
      const API_URL = `${REST_API}/review/write`; // 백엔드 참고
      axios({
        url: API_URL,
        method: "POST",
        params: review,
        headers: {
          "access-token": localStorage.getItem("access-token"),
        },
      })
        .then(() => {
          commit("CREATE_REVIEW", review);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    updateReview({ commit }, review) {
      const API_URL = `${REST_API}/review/update`; // 백엔드 참고
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
    deleteReview(context, reviewid) {
      context;
      const API_URL = `${REST_API}/review/delete`; // 백엔드 참고
      axios({
        url: API_URL,
        method: "DELETE",
        params: reviewid,
      })
        .then(() => {
          router.push({ name: "vdetail" });
        })
        .catch((err) => {
          console.log(err);
        });
    },

    // 로그인 관련
    userLogin({ dispatch }, user) {
      const API_URL = `${REST_API}/user/login`;
      axios({
        url: API_URL,
        method: "POST",
        params: user,
      })
        .then((res) => {
          console.log(res);
          if (res.data.message == "success") {
            //commit("USER_LOGIN");
            localStorage.setItem("access-token", res.data["access-token"]);
            dispatch("getUserInfo");
            //router.push({ name: "main" });
          } else {
            alert("아이디 또는 비밀번호가 올바르지 않습니다.");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getUserInfo({ commit }) {
      const API_URL = `${REST_API}/user/getUser`;
      if (localStorage.getItem("access-token")) {
        axios({
          url: API_URL,
          method: "GET",
          headers: {
            "access-token": localStorage.getItem("access-token"),
          },
        })
          .then((res) => {
            console.log(res);
            commit("USER_LOGIN", res.data);
            router.push({ name: "main" });
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
    // 회원가입 관련
    DuplicateId({ commit }, userid) {
      const API_URL = `${REST_API}/user/join/id/${userid}`;
      axios({
        url: API_URL,
        method: "GET",
      })
        .then((res) => {
          console.log(res);
          if (res.data == "success") {
            commit("CHECK_DUPL_ID", userid);
            alert("사용가능한 아이디 입니다.");
          }
        })
        .catch((err) => {
          console.log(err);
          if (err.response.status == 500) alert("중복된 아이디 입니다.");
          else alert("서버가 응답하지 않습니다.");
        });
    },
    DuplicateEmail({ commit }, email) {
      const API_URL = `${REST_API}/user/join/email/${email}`;
      axios({
        url: API_URL,
        method: "GET",
      })
        .then((res) => {
          console.log(res);
          if (res.data == "success") {
            commit("CHECK_DUPL_EMAIL", email);
            alert("사용가능한 이메일 입니다.");
          }
        })
        .catch((err) => {
          console.log(err);
          if (err.response.status == 500) alert("중복된 이메일 입니다.");
          else alert("서버가 응답하지 않습니다.");
        });
    },
    userSignup({ commit }, user) {
      const API_URL = `${REST_API}/user/join`;
      axios({
        url: API_URL,
        method: "POST",
        params: user,
      })
        .then((res) => {
          console.log(res);
          alert(`${user.nickname}님, 회원가입을 축하드립니다!`);
          commit("DUPL_RESET");
          router.push({ name: "userlogin" });
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 아이디, 비밀번호 찾기
    getUserId(context, user) {
      context;
      const API_URL = `${REST_API}/user/find-id`;
      axios({
        url: API_URL,
        method: "GET",
        params: user,
      })
        .then((res) => {
          console.log(res);
          alert(`${user.nickname}님의 id는 "${res.data}" 입니다.`);
        })
        .catch((err) => {
          console.log(err);
          alert(`일치하는 회원 정보가 없습니다.`);
        });
    },
    getAuthPw({ commit }, user) {
      const API_URL = `${REST_API}/user/change-pw/auth`;
      axios({
        url: API_URL,
        method: "GET",
        params: user,
      })
        .then((res) => {
          console.log(res);
          commit("SET_AUTH_PW_T");
          commit("TMP_USER_ID", user.userid);
          router.push({ name: "userpw" });
        })
        .catch((err) => {
          console.log(err);
          alert(`일치하는 회원 정보가 없습니다.`);
        });
    },
    setPw({ commit }, user) {
      commit;
      const API_URL = `${REST_API}/user/change-pw`;
      axios({
        url: API_URL,
        method: "PUT",
        params: user,
      })
        .then((res) => {
          console.log(res);
          alert("비밀번호 재설정이 완료되었습니다.");
          router.push({ name: "userlogin" });
        })
        .catch((err) => {
          console.log(err);
          alert(`잘못된 요청입니다.`);
        });
    },
  },
  modules: {},
});

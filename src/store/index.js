import Vue from 'vue'
import Vuex from 'vuex'
import router from '@/router'
import axios from 'axios'

Vue.use(Vuex)

const REST_API = `http://localhost:9999/api`

export default new Vuex.Store({
  state: {
    reviews: [],
    review: {},
    
    videos: [],
    video: {id: "u5OgcZdNbMo"}  // 더미. 백엔드 연결해서 받아오기
  },
  getters: {
  },
  mutations: {
    GET_REVIEWS(state, payload) {
      state.reviews = payload
    },
    GET_REVIEW(state, payload) {
      state.review = payload 
    },
    CREATE_REVIEW(state, payload) {
      state.reviews.push(payload)
    },
    UPDATE_REVIEW(state, payload) {
      state.review = payload
    },

  },
  actions: {
    getReviews({ commit }, payload) {
      let params = null

      if (payload) {
       params = payload 
      }
      const API_URL = `${REST_API}/board` // 백엔드 참고
      axios({
        url: API_URL,
        method: 'GET',
        params
      }).then((res) => {
        console.log(res)
        commit('GET_REVIEWS', res.data)
        
      }).catch((err) => {
        console.log(err)
      })
    },
    getReview({ commit }, id) {
      const API_URL = `${REST_API}/board/${id}` // 백엔드 참고
      axios({
        url: API_URL,
        method: 'GET',
      }).then(res => {
        commit('GET_REVIEW', res.data)
      }).catch((err) => {
        console.log(err)
      })
    },
    createReview({ commit }, review) {
      const API_URL = `${REST_API}/board` // 백엔드 참고
      axios({
        url: API_URL,
        method: 'POST',
        params: review
      }).then(() => {
        commit('CREATE_REVIEW', review)
        router.push("/board")
      }).catch((err) => {
        console.log(err)
      })
    },
    updateReview({ commit }, review) {
      const API_URL = `${REST_API}/board` // 백엔드 참고
      axios({
        url: API_URL,
        method: 'PUT',
        params: review
      }).then(() => {
        commit('UPDATE_REVIEW', review)
        router.push({ name: 'vdetail', params: { id: review.id } })
      }).catch((err) => {
        console.log(err)
      })
    },
    deleteReview(context, id) {
      context
      const API_URL = `${REST_API}/board/${id}` // 백엔드 참고
      axios({
        url: API_URL,
        method: 'DELETE',
      }).then(() => {
        router.push({name: 'vdetail'})
      }).catch((err) => {
        console.log(err)
      })
    },
  },
  modules: {
  }
})

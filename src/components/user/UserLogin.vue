<template>
  <main class="form-signin">
    <div class="container">
      <div style="margin-top: 100px">
        <h2 class="text-center">LOG IN</h2>
        <b-form @submit.stop.prevent>
           <b-form-group label="feedback-user">User ID
            <b-form-input
              type="text"
              v-model="userId"
              :state="validation"
              placeholder="Enter id">
            </b-form-input>
            <b-form-invalid-feedback :state="validation">
            ID는 최소 5글자에서 12글자로 작성해주세요.
          </b-form-invalid-feedback>
          <b-form-valid-feedback :state="validation">
            Looks Good.
          </b-form-valid-feedback>
        </b-form-group>
         <b-form-group label="feedback-user">User ID
          <b-form-input
            type="password"
            v-model="userPw"
            :state="validation2"
            id="feedback-Pw"
          ></b-form-input>
          <b-form-invalid-feedback :state="validation2">
            PW는 최소 5글자에서 12글자로 작성해주세요.
          </b-form-invalid-feedback>
          <b-form-valid-feedback :state="validation2">
            Looks Good.
          </b-form-valid-feedback>
          </b-form-group>
          <b-button
            class="w-100 btn btn-lg btn-outline-secondary login-btn"
            type="submit"
            @click="loginCheck"
            >로그인</b-button>
        </b-form>
      </div>
    </div>
  </main>
</template>

<script>
export default {
  data() {
    return {
      userId: "",
      userPw: "",
    };
  },
  computed: {
    validation() {
      return this.userId.length > 4 && this.userId.length < 13;
    },
    validation2() {
      return this.userPw.length > 4 && this.userPw.length < 13;
    },
  },
  methods: {
    loginCheck() {
      
      if (this.validation && this.validation2) {
        // vuex에 action으로 구현하기!
        this.$router.push({name: "main"})
      }
      else {
        alert("올바른 값을 입력해주세요")
        this.$router.push({name: "userlogin"})
      }
    },
  },
};
</script>

<style scoped>
body {
  display: flex;
  padding-top: 60px;
  padding-bottom: 60px;
  align-items: center;
  background-color: #f6f6f6;
}
.form-signin {
  width: 50%;
  /* max-width: 600px; */
  margin: auto;
}
label {
  font-weight: 600;
}
.login-btn {
  color: black;
  text-decoration: none;
}
</style>
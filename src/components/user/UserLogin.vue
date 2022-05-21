<template>
  <main class="form-signin">
    <div class="container">
      <div style="margin-top: 100px">
        <h2 class="text-center">로그인</h2>
        <b-form @submit.stop.prevent class="login-signup">
          <b-form-group
            >ID
            <b-form-input
              type="text"
              v-model="userId"
              :state="validation"
              placeholder="ID를 입력해주세요"
            >
            </b-form-input>
            <b-form-invalid-feedback :state="validation">
              ID는 최소 5글자에서 12글자로 작성해주세요.
            </b-form-invalid-feedback>
            <b-form-valid-feedback :state="validation">
              Looks Good.
            </b-form-valid-feedback>
          </b-form-group>
          <b-form-group style="margin-top: 20px"
            >Password
            <b-form-input
              type="password"
              v-model="userPw"
              :state="validation2"
              placeholder="Password를 입력해주세요"
            ></b-form-input>
            <b-form-invalid-feedback :state="validation2">
              PW는 최소 5글자에서 12글자로 작성해주세요.
            </b-form-invalid-feedback>
            <b-form-valid-feedback :state="validation2">
              Looks Good.
            </b-form-valid-feedback>
          </b-form-group>

          <div class="login-signup">
            <b-button
              class="w-100 btn btn-lg btn-outline-secondary login-btn"
              type="submit"
              @click="loginCheck"
              >로그인</b-button
            >
            <p style="text-align: center">
              <a href="/user/id">아이디 설정</a> /
              <a href="/user/check"> 비밀번호 재설정</a>
            </p>
          </div>
          <div class="login-signup">
            <p style="text-align: center">아직 회원이 아니신가요?</p>
            <b-button
              class="w-100 btn btn-lg btn-outline-secondary signup-btn"
              type="submit"
              :to="{ path: '/user/signup' }"
              >회원가입</b-button
            >
          </div>
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
        this.$router.push({ name: "main" });
      } else {
        alert("올바른 값을 입력해주세요");
        this.$router.push({ name: "userlogin" });
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

.login-signup {
  margin-top: 50px;
}
.login-btn {
  color: black;
  text-decoration: none;
}
.signup-btn {
  color: black;
  text-decoration: none;
}
a {
  color: black;
  text-decoration: none;
}
</style>

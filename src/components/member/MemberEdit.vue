<template>
  <main class="form-signup">
    <div class="container">
      <h2><b>회원정보 수정</b></h2>
      <b-container class="inner-form">
        <h3>기본정보 수정</h3>
        <hr style="width: 30%" />
        <b-form @submit.stop.prevent class="form-text-color">
          <v-carousel class="profile">
            <div>마음에 드는 프로필 사진을 클릭해주세요</div>
            <v-carousel-item
              style="text-align: center"
              v-for="i in 5"
              :key="i"
              reverse-transition="fade-transition"
              transition="fade-transition"
              @click="profileClick(i)"
              ><img :src="require(`@/assets/images/${i}.png`)" width="400px"
            /></v-carousel-item>
          </v-carousel>
          <!-- 아이디 -->
          <b-row>
            <b-col cols="9">
              <b-form-group label="아이디">{{ user.userid }}</b-form-group>
            </b-col>
            <b-col> </b-col>
          </b-row>
          <!-- 이름 -->
          <b-row>
            <b-col cols="9">
              <b-form-group label="이름">
                <b-form-input
                  type="text"
                  v-model="user.nickname"
                  :state="validName"
                  trim
                ></b-form-input>
                <b-form-invalid-feedback :state="validName">
                  닉네임을 입력해주세요.
                </b-form-invalid-feedback>
                <b-form-valid-feedback :state="validName" />
              </b-form-group>
            </b-col>
            <b-col> </b-col>
          </b-row>
          <!-- 이메일 -->
          <b-row>
            <b-col cols="9">
              <b-form-group label="이메일">
                <b-form-input
                  type="email"
                  v-model="user.email"
                  :state="validEmail"
                  required
                  trim
                ></b-form-input>
                <b-form-invalid-feedback :state="validEmail">
                  이메일 형식이 올바르지 않습니다.
                </b-form-invalid-feedback>
                <b-form-valid-feedback :state="validEmail" />
              </b-form-group>
            </b-col>
            <b-col class="mt-8">
              <b-button @click="emailDuplicateCheck" size="sm"
                >중복확인</b-button
              >
            </b-col>
          </b-row>
          <br />
          <!-- 수정버튼 -->
          <b-row>
            <b-col cols="9">
              <b-button
                class="w-100 btn btn-lg btn-outline-secondary login-btn"
                type="submit"
                @click="signup"
                :disabled="isDisabled"
                >기본정보수정</b-button
              >
            </b-col>
            <b-col> </b-col>
          </b-row>
        </b-form>
      </b-container>
      <b-container class="inner-form">
        <h3>비밀번호 변경</h3>
        <hr style="width: 30%" />
        <b-form @submit.stop.prevent>
          <!-- 비밀번호 -->
          <b-row>
            <b-col cols="9">
              <b-form-group label="비밀번호">
                <b-form-input
                  type="password"
                  v-model="user.pw"
                  :state="validPw"
                  trim
                ></b-form-input>
                <b-form-invalid-feedback :state="validPw">
                  비밀번호는 4 ~ 12 글자로 작성해주세요.
                </b-form-invalid-feedback>
                <b-form-valid-feedback :state="validPw" />
              </b-form-group>
            </b-col>
            <b-col> </b-col>
          </b-row>
          <!-- 비밀번호 재확인 -->
          <b-row>
            <b-col cols="9">
              <b-form-group label="비밀번호 재확인">
                <b-form-input
                  type="password"
                  v-model="pw2"
                  :state="validPw_Re"
                  trim
                ></b-form-input>
                <b-form-invalid-feedback :state="validPw_Re">
                  동일한 암호를 입력하세요.
                </b-form-invalid-feedback>
                <b-form-valid-feedback :state="validPw_Re" />
              </b-form-group>
            </b-col>
            <b-col> </b-col>
          </b-row>
          <!-- 가입버튼 -->
          <b-row>
            <b-col cols="9">
              <b-button
                class="w-100 btn btn-lg btn-outline-secondary login-btn"
                type="submit"
                @click="signup"
                :disabled="isDisabled"
                >비밀번호수정</b-button
              >
            </b-col>
            <b-col> </b-col>
          </b-row>
        </b-form>
      </b-container>
    </div>
  </main>
</template>

<script>
export default {
  data() {
    return {
      user: {
        profile: null,
        userid: "",
        nickname: "",
        pw: "",
        email: "",
      },
      pw2: "",

      // vuex로 보내야함!!!!!!!!! && id랑 email 값 바뀌면 false로 바꿀 로직 구현
      checkedId: false,
      checkedEmail: false,
    };
  },
  computed: {
    // 유효성 검사
    validID() {
      //this.checkedID = false; // 확인해보기
      return this.user.userid.length > 4 && this.user.userid.length < 13;
    },
    validName() {
      return this.user.nickname.length > 0;
    },
    validPw() {
      return this.user.pw.length > 3 && this.user.pw.length < 13;
    },
    validPw_Re() {
      return this.user.pw == this.pw2 && this.user.pw.length > 0;
    },
    validEmail() {
      //this.checkedEmail = false; // 확인해보기
      const exptext = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]+$/;
      return exptext.test(this.user.email);
    },

    // 버튼 활성화
    isDisabled() {
      if (this.validName && this.validEmail) {
        return false;
      } else {
        return true;
      }
    },
  },
  methods: {
    idDuplicateCheck() {},
    emailDuplicateCheck() {},
    signup() {
      // checked 변수들까지 모두 확인(안했으면 alert)
      if (this.validation && this.validation2) {
        // vuex에 action으로 구현하기!
        //this.$router.push({name: "main"})
      } else {
        alert("올바른 값을 입력해주세요");
      }
    },
    profileClick(number) {
      this.user.profile = number;
    },
  },
};
</script>

<style scoped>
.form-signup {
  padding: 50px;
  margin: auto;
}
.inner-form {
  margin-top: 50px;
  padding: 50px;
  width: 70%;
  border: dotted 2px;
  border-color: grey;
}
.form-text-color {
  color: grey;
}
.login-btn {
  color: black;
  text-decoration: none;
}
.profile {
  text-align: center;
  width: 500px;
}
</style>

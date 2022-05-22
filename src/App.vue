<template>
  <div>
    <div v-if="isLogin">
      <login-header />
    </div>
    <div v-else>
      <header-nav />
    </div>
    <footer-nav />
  </div>
</template>

<script>
import LoginHeader from "@/components/common/LoginHeader.vue";
import HeaderNav from "@/components/common/HeaderNav.vue";
import FooterNav from "@/components/common/FooterNav.vue";
import { mapState } from "vuex";
export default {
  components: {
    LoginHeader,
    HeaderNav,
    FooterNav,
  },
  computed: {
    ...mapState(["isLogin"]),
  },
};
</script>

<style></style>

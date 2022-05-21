<template>
  <div>
    <login-header />
    <!-- <header-nav /> -->
    <router-link to="/vdetail/1">테스트용</router-link>
    <footer-nav />
  </div>
</template>

<script>
import LoginHeader from "@/components/common/LoginHeader.vue";
// import HeaderNav from "@/components/common/HeaderNav.vue";
import FooterNav from "@/components/common/FooterNav.vue";

export default {
  components: {
    LoginHeader,
    // HeaderNav,
    FooterNav,
  },
};
</script>

<style></style>

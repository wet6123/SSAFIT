<template>
  <div>
    <header-nav></header-nav>
    <router-view />
    <footer-nav></footer-nav>
  </div>
</template>

<script>
import HeaderNav from "@/components/common/HeaderNav.vue";
import FooterNav from "@/components/common/FooterNav.vue";
export default {
  components: {
    HeaderNav,
    FooterNav,
  },
};
</script>

<style></style>

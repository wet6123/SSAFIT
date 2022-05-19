<template>
  <v-app>
    <v-app-bar app color="white" flat>
      <v-container class="d-flex justify-space-between py-0 fill-height">
        <v-btn to="/" text><v-icon>mdi-weight-lifter</v-icon>SSAFIT</v-btn>
        <v-btn to="/user" class="mr-10" color="grey darken-1" size="32"
          >Log In</v-btn
        >
      </v-container>
    </v-app-bar>

    <v-main class="grey lighten-3">
      <v-container class="container">
        <v-row>
          <v-col cols="2" class="absolute1" style="width: 200px">
            <v-sheet rounded="lg">
              <v-list color="transparent">
                <v-list-item v-for="link in links" :key="link" link>
                  <v-list-item-icon>
                    <v-icon>{{ link.icon }}</v-icon>
                  </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-title :to="link.router">
                      {{ link.title }}</v-list-item-title
                    >
                  </v-list-item-content>
                </v-list-item>

                <v-divider class="my-2"></v-divider>

                <v-list-item v-for="link in links2" :key="link" link>
                  <v-list-item-icon>
                    <v-icon>{{ link.icon }}</v-icon>
                  </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-title :to="link.router">
                      {{ link.title }}
                    </v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-sheet>
          </v-col>

          <v-col style="margin-left: 200px">
            <v-sheet min-height="70vh" rounded="lg">
              <span>영상 들어가는 공간</span>
            </v-sheet>
          </v-col>
        </v-row>
      </v-container>
      <footer-nav />
    </v-main>
  </v-app>
</template>

<script>
import FooterNav from "@/components/common/FooterNav.vue";
export default {
  components: {
    FooterNav,
  },
  data: () => ({
    links: [
      { title: "홈", router: "/", icon: "mdi-home" },
      { title: "검색", router: "/search", icon: "mdi-movie-search-outline" },
    ],
    links2: [
      { title: "찜리스트", router: "/vlist/like", icon: "mdi-cards-heart" },
      {
        title: "시청기록",
        router: "/vlist/watched",
        icon: "mdi-monitor-eye",
      },
    ],
  }),
};
</script>
<style>
.absolute1 {
  position: fixed;
  width: 50px;
}
.container {
  margin-left: 0px;
  margin-right: 0px;
}
</style>

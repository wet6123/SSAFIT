<template>
  <v-app>
    <div>
      <v-app-bar app color="white" flat>
        <a href="/" class="ssafit"> &nbsp;SSAFIT </a>
        <v-spacer></v-spacer>
        <v-menu left bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-btn icon v-bind="attrs" v-on="on">
              <v-icon>mdi-account-circle</v-icon>
            </v-btn>
          </template>

          <v-list>
            <v-list-item
              v-for="(link, idx) in links3"
              :key="idx + 'A'"
              :to="{ path: link.router }"
              class="router"
              link
            >
              <v-list-item-title
                ><v-icon>{{ link.icon }}</v-icon>
                {{ link.title }}</v-list-item-title
              >
            </v-list-item>
          </v-list>
        </v-menu>
      </v-app-bar>

      <v-main class="main">
        <div style="margin: 20px">
          <v-row>
            <v-col cols="2" class="absolute1" style="width: 200px">
              <v-sheet rounded="lg" style="width: 180px">
                <v-list color="transparent">
                  <v-list-item
                    v-for="(link, idx) in links"
                    :key="idx + 'I'"
                    :to="{ path: link.router }"
                    class="router"
                    link
                  >
                    <v-list-item-icon>
                      <v-icon>{{ link.icon }}</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                      {{ link.title }}
                    </v-list-item-content>
                  </v-list-item>

                  <v-divider class="my-2"></v-divider>

                  <v-list-item
                    v-for="(link, idx) in links2"
                    :key="idx + 'R'"
                    :to="{ path: link.router }"
                    class="router"
                    link
                  >
                    <v-list-item-icon>
                      <v-icon>{{ link.icon }}</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                      {{ link.title }}
                    </v-list-item-content>
                  </v-list-item>
                </v-list>
              </v-sheet>
            </v-col>

            <v-col style="margin-left: 200px">
              <v-sheet min-height="100vh" rounded="lg">
                <router-view />
              </v-sheet>
            </v-col>
          </v-row>
        </div>
      </v-main>
    </div>
  </v-app>
</template>

<script>
export default {
  data: () => ({
    links: [
      { title: "홈", router: "/", icon: "mdi-home" },
      { title: "검색", router: "/search", icon: "mdi-magnify" },
    ],
    links2: [
      { title: "찜리스트", router: "/vlist/like", icon: "mdi-cards-heart" },
      {
        title: "시청기록",
        router: "/vlist/watched",
        icon: "mdi-monitor-eye",
      },
    ],
    links3: [
      {
        title: "프로필 편집",
        router: "/member/check",
        icon: "mdi-account-edit-outline",
      },
      { title: "찜리스트", router: "/vlist/like", icon: "mdi-cards-heart" },
      {
        title: "시청기록",
        router: "/vlist/watched",
        icon: "mdi-monitor-eye",
      },
      { title: "로그아웃", router: "/", icon: "mdi-logout" },
    ],
  }),
};
</script>
<style scoped>
.absolute1 {
  position: fixed;
}
.header {
  display: flex;
  justify-content: space-between;
}
.main {
  background-color: grey;
}
.ssafit {
  color: gray;
  text-decoration: none;
  font-size: 25px;
}
.router {
  color: black;
  text-decoration: none;
}
.login {
  color: white;
  font-size: 20px;
}
</style>

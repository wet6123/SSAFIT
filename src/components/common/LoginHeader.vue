<template>
  <v-app>
    <div>
      <v-app-bar app color="white" flat>
        <a href="/" class="ssafit"> &nbsp;SSAFIT &nbsp; </a
        ><img
          style="width: 55px"
          class="run"
          src="https://img.icons8.com/stickers/100/000000/exercise-skin-type-1.png"
        />
        <v-spacer></v-spacer>
        <h6 class="mt-3" style="margin: 10px 20px">
          <img
            style="width: 40px"
            src="https://img.icons8.com/stickers/100/000000/teddy-bear.png"
          />
          {{ userinfo.nickname }}님 안녕하세요
          <b-icon
            icon="star-fill"
            animation="fade"
            font-scale="1"
            style="margin-left: 10px"
          ></b-icon>
        </h6>
        <v-menu left bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-btn icon v-bind="attrs" v-on="on">
              <img
                style="border: 2px solid; border-radius: 70%"
                :src="require(`@/assets/images/${userinfo.profile}.png`)"
                width="40px"
              />
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
                ><img :src="`${link.icon}`" style="width: 30px" />
                {{ link.title }}</v-list-item-title
              >
            </v-list-item>
            <v-list-item @click="userLogout" class="router" link>
              <v-list-item-title
                ><img
                  src="https://img.icons8.com/stickers/100/000000/exit.png"
                  style="width: 30px"
                />
                로그아웃</v-list-item-title
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
                      <img :src="`${link.icon}`" style="width: 40px" />
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
                      <img :src="`${link.icon}`" style="width: 40px" />
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
import { mapState } from "vuex";

export default {
  data: () => ({
    links: [
      {
        title: "홈",
        router: "/",
        icon: "https://img.icons8.com/stickers/100/000000/home-page.png",
      },
      {
        title: "검색",
        router: "/search",
        icon: "https://img.icons8.com/stickers/100/000000/search.png",
      },
    ],
    links2: [
      {
        title: "찜리스트",
        router: "/vlist/like",
        icon: "https://img.icons8.com/stickers/100/000000/like.png",
      },
      {
        title: "시청기록",
        router: "/vlist/watched",
        icon: "https://img.icons8.com/stickers/100/000000/laptop-play-video.png",
      },
    ],
    links3: [
      {
        title: "프로필 편집",
        router: "/member/check",
        icon: "https://img.icons8.com/stickers/100/000000/edit-user-female.png",
      },
      {
        title: "찜리스트",
        router: "/vlist/like",
        icon: "https://img.icons8.com/stickers/100/000000/like.png",
      },
      {
        title: "시청기록",
        router: "/vlist/watched",
        icon: "https://img.icons8.com/stickers/100/000000/laptop-play-video.png",
      },
    ],
  }),
  computed: {
    ...mapState(["userinfo"]),
  },
  methods: {
    userLogout() {
      this.$store.commit("USER_LOGOUT");
      this.$router.push({ name: "main" });
    },
  },
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
  background-image: linear-gradient(
    90deg,
    red,
    orange,
    yellow,
    green,
    blue,
    navy,
    purple
  );
  -webkit-background-clip: text;
  color: transparent;

  font-weight: bold;
  font-size: 40px;

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
.run:hover {
  transform: translateX(300px) scale(0.8, 1);
  transition-duration: 2s;
}
</style>

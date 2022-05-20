import Vue from "vue";
import VueRouter from "vue-router";
// view
import MainView from "@/views/MainView.vue";
import UserView from "@/views/UserView.vue";
import MemberView from "@/views/MemberView.vue";
import SearchView from "@/views/SearchView.vue";
import VlistView from "@/views/VlistView.vue";
import VdetailView from "@/views/VdetailView.vue";
// component
import UserLogin from "@/components/user/UserLogin.vue";
import UserSignup from "@/components/user/UserSignup.vue";
import UserId from "@/components/user/UserId.vue";
import UserCheck from "@/components/user/UserCheck.vue";
import UserPw from "@/components/user/UserPw.vue";

import MemberCheck from "@/components/member/MemberCheck.vue";
import MemberEdit from "@/components/member/MemberEdit.vue";

import VlistLike from "@/components/vlist/VlistLike.vue";
import VlistWatched from "@/components/vlist/VlistWatched.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "main",
    component: MainView,
  },
  {
    path: "/user",
    name: "user",
    component: UserView,
    children: [
      {
        path: "login",
        name: "userlogin",
        component: UserLogin,
      },
      {
        path: "signup",
        name: "usersignup",
        component: UserSignup,
      },
      {
        path: "id",
        name: "userid",
        component: UserId,
      },
      {
        path: "check",
        name: "usercheck",
        component: UserCheck,
      },
      {
        path: "pw",
        name: "userpw",
        component: UserPw,
      },
    ],
  },
  {
    path: "/member",
    name: "member",
    component: MemberView,
    children: [
      {
        path: "check",
        name: "membercheck",
        component: MemberCheck,
      },
      {
        path: "edit",
        name: "memberedit",
        component: MemberEdit,
      },
    ],
  },
  {
    path: "/search",
    name: "search",
    component: SearchView,
  },
  {
    path: "/vlist",
    name: "vlist",
    component: VlistView,
    children: [
      {
        path: "like",
        name: "vlistlike",
        component: VlistLike,
      },
      {
        path: "watched",
        name: "vlistwatched",
        component: VlistWatched,
        children: [],
      },
    ],
  },
  {
    path: "/vdetail/:id",
    name: "vdetail",
    component: VdetailView,
    // 추가해야함
    // children: [
    //   path: ""
    // ]
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;

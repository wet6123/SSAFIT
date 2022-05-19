import Vue from "vue";
import VueRouter from "vue-router";
// view
import MainView from "../views/MainView";
import UserView from "../views/UserView";
import MemberView from "../views/MemberView";
import SearchView from "../views/SearchView";
import VlistView from "../views/VlistView";
import VdetailView from "../views/VdetailView";
// component
import UserLogin from "../components/user/UserLogin";
import UserSignup from "../components/user/UserSignup";
import UserId from "../components/user/UserId";
import UserCheck from "../components/user/UserCheck";
import UserPw from "../components/user/UserPw";

import MemberCheck from "../components/member/MemberCheck";
import MemberEdit from "../components/member/MemberEdit";

import VlistLike from "../components/vlist/VlistLike";
import VlistWatched from "../components/vlist/VlistWatched";

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
        path: "/login",
        name: "userlogin",
        component: UserLogin,
      },
      {
        path: "/signup",
        name: "usersignup",
        component: UserSignup,
      },
      {
        path: "/id",
        name: "userid",
        component: UserId,
      },
      {
        path: "/check",
        name: "usercheck",
        component: UserCheck,
      },
      {
        path: "/pw",
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
        path: "/check",
        name: "membercheck",
        component: MemberCheck,
      },
      {
        path: "/edit",
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
        path: "/like",
        name: "vlistlike",
        component: VlistLike,
      },
      {
        path: "/watched",
        name: "vlistwatched",
        component: VlistWatched,
        children: [

        ]
      },
    ],
  },
  {
    path: "/vdetail",
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

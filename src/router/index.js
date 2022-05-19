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
import {
  UserCheck,
  UserSignup,
  UserId,
  UserCheck,
  UserPw,
} from "../components/user";
import { MemberCheck, MemberEdit } from "../components/member";
import { VlistLike, VlistWatched } from "../components/vlist";

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
      },
    ],
  },
  {
    path: "/vdetail",
    name: "vdetail",
    component: VdetailView,
    // 추가해야함
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;

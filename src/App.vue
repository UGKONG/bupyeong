<template>
  <div id="wrap">
    <title v-text="title" />

    <Header :scrollTop="scrollTop" />

    <SideMenu />

    <transition name="scroll-y-transition" mode="out-in">
      <router-view />
    </transition>

    <Footer />

    <transition name="fade-transition">
      <TopBtn v-if="$store.state.scrollTop >= 200" />
    </transition>
  </div>
</template>

<script>
import axios from "axios";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import SideMenu from "@/components/Header/SideMenu";
import TopBtn from "@/components/Footer/TopBtn";
import { useSession } from "@admin/src/hook";

export default {
  components: {
    Header,
    Footer,
    SideMenu,
    TopBtn,
  },
  data: () => ({
    scrollTop: 0,
  }),
  watch: {
    path(val, oldVal) {
      this.historyChk(val);
      window.scrollTo(0, 0);
      this.scrollTop = 0;
      this.loginCheck();
    },
    scrollTop(val) {
      this.$store.dispatch("setScrollTop", val);
    },
  },
  created() {
    this.getMenuList();
    this.historyChk();
    window.addEventListener("scroll", (e) => {
      this.scrollTop = window.scrollY;
    });
    this.loginCheck();
  },
  methods: {
    loginCheck() {
      let loginInfo = window.sessionStorage.getItem("loginInfo");
      this.$store.dispatch("setLoginYN", loginInfo ? true : false);
      this.$store.dispatch(
        "setLoginInfo",
        loginInfo ? JSON.parse(loginInfo) : null
      );
    },
    getMenuList() {
      axios
        .get(this.$store.state.dbUrl + "/menuList?type=header")
        .then(({ data }) => this.$store.dispatch("setMenuList", data));
    },
    historyChk(val = "/") {
      let history = useSession("history");
      useSession("history", history ? history + "|" + val : val);
    },
  },
  computed: {
    title() {
      return this.$route.name || "부평 스마트 커뮤니티 플랫폼";
    },
    path() {
      return this.$route.path;
    },
  },
};
</script>

<style lang="scss">
@import "@index.scss";
</style>
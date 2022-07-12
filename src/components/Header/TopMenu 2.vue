<template>
  <article sub>
    <nav>
      <button @click="openSideMenu">
        <i :class="$store.state.FontAwesome.stroke.hamburgerMenu" />
      </button>
      <ul left></ul>
      <ul right>
        <TopMenuLi :item="login[loginState]" />
        <!-- <router-link v-if="loginYN" :to="login.url" v-text="login.name" /> -->
        <TopMenuLi v-for="(item, idx) in menu.right" :key="idx" :item="item" />
      </ul>
    </nav>
  </article>
</template>

<script>
import TopMenuLi from "./TopMenuLi";
export default {
  components: {
    TopMenuLi,
  },
  data: () => ({
    login: {
      Y: { name: "로그아웃", url: "/SignIn", target: "self" },
      N: { name: "로그인", url: "/SignIn", target: "self" },
    },
    menu: {
      left: [
        {
          name: "인천광역시",
          url: "https://www.incheon.go.kr/index",
          target: "new",
        },
        { name: "부평구", url: "https://www.icbp.go.kr/", target: "new" },
      ],
      right: [
        { name: "회원가입", url: "/SignUp", target: "self" },
        { name: "관리자", url: "/admin", target: "new" },
      ],
    },
  }),
  methods: {
    openSideMenu() {
      this.$store.dispatch("setSideMenu", true);
    },
  },
  computed: {
    loginYN() {
      return this.$store.state.loginYN;
    },
    loginState() {
      return this.loginYN ? "Y" : "N";
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@index.scss";

article[sub] {
  background-color: $topMenuBarColor;
  height: 35px;
  padding: 0 6px;
  border-bottom: 1px solid $topMenuBarBorderColor;

  nav {
    @include flex(space-between);
    color: $topMenuTextColor;
    width: 100%;
    max-width: 1200px;
    height: 100%;
    margin: 0 auto;
    position: relative;

    [left],
    [right] {
      @include flex(space-between);
      height: 100%;
    }

    & > button {
      @include flex(center);
      position: absolute;
      top: 100%;
      left: 0;
      width: 70px;
      height: 70px;
      z-index: 2;
      display: none;
      background-color: transparent !important;

      &:hover {
        i,
        svg {
          color: $darkGray;
        }
      }
      i,
      svg {
        font-size: 30px;
        color: $gray;
      }
    }
  }
}

@media screen and (max-width: 900px) {
  nav > button {
    display: flex !important;
  }
}
@media screen and (max-width: 499px) {
  nav > button {
    width: 60px !important;
    height: 60px !important;
  }
}
</style>
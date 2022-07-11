<template>
  <span>
    <aside id="side-menu" :style="sideMenuPosition">
      <div header :style="{ backgroundImage: 'url(' + logo + ')' }">
        <!-- <button @click="close">
          <i :class="$store.state.FontAwesome.stroke.x" />
        </button> -->
      </div>
      <ul>
        <li parent-main>
          <router-link
            to="/"
            active-class="active"
            @click.native="menuClick"
            exact
          >
            <i :class="$store.state.FontAwesome.fill.home" />
            메인 페이지
          </router-link>
        </li>
        <SideMenuLi v-for="(item, idx) in parentMenu" :key="idx" :item="item" />
      </ul>
    </aside>
    <transition name="fade-transition">
      <div bg @click="close" v-show="$store.state.isSideMenu" />
    </transition>
  </span>
</template>

<script>
import SideMenuLi from "./SideMenuLi";
import logo from "@images/logo.png";
export default {
  components: {
    SideMenuLi,
  },
  data: () => ({
    logo,
  }),
  methods: {
    menuClick() {
      this.$store.dispatch("setSideMenu", false);
    },
    close() {
      this.$store.dispatch("setSideMenu", false);
    },
  },
  computed: {
    parentMenu() {
      return this.menuList.filter((x) => x.parentId == 0);
    },
    sideMenuPosition() {
      let num = this.$store.state.isSideMenu ? 0 : -100;
      return { transform: "translateX(" + num + "%)" };
    },
    menuList() {
      return this.$store.state.menuList;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@index.scss";

#side-menu {
  position: fixed;
  top: 0;
  left: 0;
  min-width: 220px;
  max-width: 320px;
  width: 70%;
  height: 100vh;
  z-index: 999;
  transition: 0.3s;
  background-color: #fff;
  display: none;

  $headerH: 100px;
  & > [header] {
    @include flex(flex-end);
    @include background-reset();
    background-size: 80% auto;
    height: $headerH;
    padding: 0 10px;

    button {
      @include flex(center);
      width: 30px;
      height: 30px;
      background-color: transparent !important;
      &:hover {
        i,
        svg {
          color: $darkGray;
        }
      }
      i,
      svg {
        font-size: 20px;
        color: $gray;
      }
    }
  }
  & > ul {
    /* padding: 0 10px 0; */
    height: calc(100% - $headerH);
    overflow: auto;
  }
}
[bg] {
  display: none;
}
@media screen and (max-width: 900px) {
  #side-menu,
  [bg] {
    display: block;
  }
}

[parent-main] {
  border-bottom: 1px solid #eee;
  & > a {
    @include font(15px, 500, $darkGray);
    display: block;
    padding: 14px 10px;
    svg,
    i {
      font-weight: 900;
      margin-right: 2px;
    }
    &.active {
      @include font(15px !important, 700 !important, $activeColor !important);
    }
  }
}
</style>
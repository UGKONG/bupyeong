<template>
  <div menu>
    <nav>
      <ul>
        <FooterMenuLi v-for="(item, idx) in menuList" :key="idx" :item="item" />
      </ul>
    </nav>
  </div>
</template>

<script>
import axios from "axios";
import FooterMenuLi from "./FooterMenuLi";
export default {
  components: {
    FooterMenuLi,
  },
  data: () => ({
    menuList: [],
  }),
  created() {
    this.getMenuList();
  },
  methods: {
    getMenuList() {
      axios
        .get(this.$store.state.dbUrl + "/menuList?type=footer")
        .then(({ data }) => (this.menuList = data));
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@index.scss";
[menu] {
  background-color: $footerMenuBarColor;
  padding: 0 6px;
  nav {
    @include flex(center);
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0;
  }

  ul {
    height: 100%;
    @include flex(center, row, wrap);
  }
}
</style>
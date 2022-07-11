<template>
  <ul id="headerMenu" menu>
    <MainMenuLi
      v-for="(item, idx) in parentMenu"
      :key="idx"
      :item="item"
      :children="children(item.id)"
    />
  </ul>
</template>

<script>
import MainMenuLi from "./MainMenuLi";
export default {
  components: {
    MainMenuLi,
  },
  methods: {
    children(id) {
      return this.menuList.filter((x) => x.parentId == id);
    },
  },
  computed: {
    parentMenu() {
      return this.menuList.filter((x) => x.parentId == 0);
    },
    menuList() {
      return this.$store.state.menuList;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@index.scss";
ul[menu] {
  @include flex(center);
  height: 45.5px;
  align-items: flex-end;
  position: sticky;
  top: 0;
  z-index: 2;
  transition: 0.2s;
}

@media screen and (max-width: 900px) {
  ul[menu] {
    overflow: hidden;
    height: 0;
  }
}
</style>
<template>
  <li parent>
    <router-link :to="item.url" active-class="active" @click.native="click">
      <i :class="item.icon" />
      {{ item.name }}
    </router-link>
    <ul>
      <SideMenuSubLi
        v-for="(item, i) in children(item.id)"
        :key="i"
        :item="item"
      />
    </ul>
  </li>
</template>

<script>
import SideMenuSubLi from "@/components/Header/SideMenuSubLi";
export default {
  components: {
    SideMenuSubLi,
  },
  props: {
    item: Object,
  },
  methods: {
    click() {
      this.$store.dispatch("setSideMenu", false);
    },
    children(id) {
      return this.$store.state.menuList.filter((x) => x.parentId == id);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@index.scss";

[parent] {
  border-bottom: 1px solid #eee;
  & > a {
    @include font(14px, 400, $gray);
    display: block;
    padding: 14px 10px;
    svg,
    i {
      font-weight: 900;
      margin-right: 2px;
    }
    &.active {
      @include font(14px, 700, $black);
    }
  }
  & > ul {
    margin: 0 0 30px;
  }
}
</style>
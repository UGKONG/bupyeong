<template>
  <li children>
    <router-link :to="item.url" active-class="active" @click.native="click">
      <span v-text="item.name" />
      <i :class="$store.state.FontAwesome.stroke.angle.right" />
    </router-link>
  </li>
</template>

<script>
export default {
  props: {
    item: Object,
  },
  methods: {
    click() {
      this.$store.dispatch("setSideMenu", false);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@index.scss";

[children] {
  & > a {
    @include flex(space-between);
    @include font(16px, 500, $darkGray);
    padding: 8px 12px;
    word-break: keep-all;
    i,
    svg {
      color: $whiteGray;
    }
    &.active {
      @include font(16px, 700, $activeColor);
      i,
      svg {
        color: $activeColor;
      }
    }
  }
}
</style>
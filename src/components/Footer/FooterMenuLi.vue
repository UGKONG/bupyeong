<template>
  <li>
    <router-link :to="item.url" v-text="item.name" active-class="active" />
  </li>
</template>

<script>
export default {
  props: {
    item: Object,
  },
};
</script>

<style lang="scss" scoped>
@import "@index.scss";
li {
  position: relative;

  a {
    @include flex(center);
    @include wrap(flex);
    padding: 0 12px;
    height: 35px;
    font-size: 13px;
    color: $footerMenuColor;
    white-space: nowrap;

    &:hover {
      color: #999;
    }
    &.active {
      color: $white;
    }
  }

  &::after {
    content: "";
    position: absolute;
    right: 0;
    top: 50%;
    transform: translateY(-46%);
    height: 50%;
    width: 1px;
    background-color: $footerMenuColor;
  }
  &:last-of-type::after {
    background-color: transparent;
  }
}
</style>
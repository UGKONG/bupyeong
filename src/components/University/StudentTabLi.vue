<template>
  <li>
    <router-link
      :to="'?category=' + item.id"
      exact-active-class="active"
      v-text="item.name"
    />
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
  width: 100%;

  &:last-of-type a {
    border-right: 0;
  }
  a {
    width: 100%;
    height: 100%;
    padding: 12px 10px;
    font-size: 14px;
    letter-spacing: 1px;
    background-color: $white;
    border-right: 1px solid #ddd;

    @include flex(center);

    &.active {
      background-color: $activeColor;
      color: $white;
    }
  }
}
</style>
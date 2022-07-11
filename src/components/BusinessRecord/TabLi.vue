<template>
  <li>
    <router-link
      :to="'/Newdeal/BusinessRecord?category=' + item.id"
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
  margin-right: 6px;
  height: 30px;
  align-self: stretch;

  &:last-of-type {
    margin-right: 0;
  }

  a {
    @include flex(center);
    padding: 1px 10px 0;
    height: 100%;
    background-color: #eee;
    white-space: nowrap;
    border: 1px solid $whiteGray;

    &:hover {
      color: $gray;
      background-color: $whiteGray;
    }
    &.active {
      color: #fff;
      background-color: $activeColor;
    }
  }
}
</style>
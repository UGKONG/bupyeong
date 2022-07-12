<template>
  <li>
    <router-link
      :to="'/Newdeal/BusinessPromotion?category=' + item.id"
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
  flex: 1;
  max-width: 200px;

  &:last-of-type {
    margin-right: 0;
  }

  a {
    display: block;
    padding: 10px;
    text-align: center;
    background-color: #eee;

    &.active {
      color: #fff;
      background-color: $activeColor;
    }
  }
}
</style>
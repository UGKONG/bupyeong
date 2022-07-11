<template>
  <li sub>
    <router-link :to="item.url" v-text="item.name" active-class="active" />
  </li>
</template>

<script>
export default {
  props: {
    item: Object,
  },
  computed: {},
};
</script>

<style lang="scss" scoped>
@import "@index.scss";
li[sub] {
  white-space: nowrap;
  font-size: 13px;
  color: var(--darkGray);

  &:hover {
    color: var(--black);
    font-weight: 500;
  }

  a {
    display: block;
    padding: 8px 18px;
    &:hover {
      color: $activeColor;
    }

    &.active {
      color: $white;
      background-color: $activeColor;
      /* border-bottom: 2px solid $activeColor; */
    }
  }
}
</style>
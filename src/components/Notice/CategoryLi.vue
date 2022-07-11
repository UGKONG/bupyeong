<template>
  <li>
    <router-link
      :to="'/Newdeal/Notice?category=' + item.id"
      v-text="item.name"
      :class="defaultClass"
      exact-active-class="active"
      @click="categoryClick"
    />
  </li>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      default: () => ({ id: 0, name: "전체" }),
    },
    defaultClass: {
      type: String,
      default: () => "",
    },
  },
  methods: {
    categoryClick() {
      //  this.item
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@index.scss";

li {
  margin-right: 4px;

  a {
    display: block;
    font-size: 13px;
    color: $gray;
    padding: 5px;
    white-space: nowrap;

    &:hover {
      color: $darkGray;
    }
    &.active {
      color: $black;
      font-weight: 500;
    }
  }
}
</style>
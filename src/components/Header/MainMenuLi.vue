<template>
  <li main>
    <router-link
      :to="thisMenu.url"
      v-text="thisMenu.name"
      active-class="active"
    />
    <div>
      <ul sub v-if="children.length > 0">
        <SubMenuLi v-for="(item, idx) in children" :key="idx" :item="item" />
      </ul>
    </div>
  </li>
</template>

<script>
import SubMenuLi from "./SubMenuLi";
export default {
  components: {
    SubMenuLi,
  },
  props: {
    item: Object,
    children: Array,
    menuList: Array,
  },
  data: () => ({}),
  methods: {},
  computed: {
    thisMenu() {
      return this.item.parentId == 0 && this.item;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@index.scss";
li[main] {
  display: inline-block;
  white-space: nowrap;
  margin: 0 14px;
  position: relative;

  &:hover div {
    @include flex(center);
    flex-flow: column;
  }
  &:hover a.active + div ul[sub] {
    border-top: none;
  }

  a {
    display: block;
    padding: 10px 30px;
    font-size: 15px;
    height: 100%;
    font-weight: 500;
    /* border-bottom: 3px solid transparent; */

    &.active {
      border-bottom: 4px solid $activeColor;
      color: $activeColor;
    }
  }

  div {
    display: none;
    position: absolute;
    top: calc(100%);
    left: 50%;
    padding: 0;
    transform: translateX(-50%);
    z-index: var(--1);

    ul[sub] {
      border: 1px solid $subMenuBorderColor;
      min-width: 140px;
      background-color: $white;
      padding: 4px 0;
      border-top: none;
      /* transform: translateY(-3px); */
    }
  }
}
</style>
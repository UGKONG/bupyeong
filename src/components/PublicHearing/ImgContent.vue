<template>
  <ul>
    <ImgLi v-for="(item, i) in list" :key="i" :item="item" />
  </ul>
</template>

<script>
import ImgLi from "@/components/PublicHearing/ImgLi";

export default {
  components: {
    ImgLi,
  },
  props: {
    list: Array,
  },
};
</script>

<style lang="scss" scoped>
@import "@index.scss";
ul {
  @include flex(flex-start);
  flex-wrap: wrap;
}
</style>
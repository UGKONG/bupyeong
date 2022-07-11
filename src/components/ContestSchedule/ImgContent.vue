<template>
  <ul>
    <ContestImgLi
      v-for="(item, idx) in list"
      :key="idx"
      :item="item"
      :idx="idx"
    />
  </ul>
</template>

<script>
import ContestImgLi from "@/components/ContestSchedule/ContestImgLi";
export default {
  components: {
    ContestImgLi,
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
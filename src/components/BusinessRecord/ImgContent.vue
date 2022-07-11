<template>
  <ul>
    <RecordImgLi
      v-for="(item, idx) in list"
      :key="idx"
      :item="item"
      :idx="idx"
      :id="id"
    />
  </ul>
</template>

<script>
import RecordImgLi from "@/components/BusinessRecord/RecordImgLi";
export default {
  components: {
    RecordImgLi,
  },
  props: {
    list: Array,
    id: String,
  },
  data: () => ({}),
  methods: {},
};
</script>

<style lang="scss" scoped>
@import "@index.scss";
ul {
  @include flex(flex-start);
  flex-wrap: wrap;
}
</style>
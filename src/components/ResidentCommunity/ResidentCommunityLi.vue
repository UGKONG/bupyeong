<template>
  <tr @click="commView">
    <td>{{ idx + 1 }}</td>
    <td>{{ item.commTitle }}</td>
    <td>{{ item.commDescription }}</td>
    <td>{{ 0 }}명</td>
  </tr>
</template>

<script>
export default {
  props: {
    idx: Number,
    item: Object,
  },
  methods: {
    commView() {
      this.$router.push("/Newdeal/ResidentCommunity/" + this.item.commSeq);
    },
  },
  computed: {},
};
</script>

<style lang="scss" scoped>
@import "@index.scss";
tr {
  cursor: pointer;
  td {
    height: 49px;
  }
  [yes] {
    background-color: $blue;
    color: $white;
    &:hover {
      background-color: $blue;
      color: $white;
    }
  }
}
</style>
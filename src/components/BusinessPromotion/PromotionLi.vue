<template>
  <tr @click="click">
    <td v-text="idx + 1" />
    <td v-text="item.proCategoryName" />
    <td v-text="item.proTitle" />
    <td v-text="item.proStartDT" />
    <td v-text="item.proEndDT" />
    <td v-text="item.writerName" />
  </tr>
</template>

<script>
export default {
  props: {
    item: Object,
    idx: Number,
  },
  methods: {
    click() {
      this.$router.push("/Newdeal/BusinessPromotion/" + this.item.proSeq);
    },
  },
};
</script>

<style lang="scss" scoped>
tr {
  cursor: pointer;
}
</style>
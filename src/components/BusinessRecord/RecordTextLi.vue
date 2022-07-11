<template>
  <tr @click="click">
    <td v-text="idx + 1" />
    <td v-text="item.title" />
    <td v-text="item.businessDT" />
    <td v-text="item.writerName" />
    <td v-text="item.writeDT" />
  </tr>
</template>

<script>
export default {
  props: {
    item: Object,
    idx: Number,
    id: String,
    activeType: String,
  },
  data: () => ({}),
  methods: {
    click() {
      this.$router.push(
        "/Newdeal/BusinessRecord/" + this.id + "/" + this.item.recordSeq
      );
    },
  },
  computed: {},
};
</script>

<style lang="scss" scoped>
@import "@index.scss";
tr {
  cursor: pointer;
}
</style>
<template>
  <tr @click="click">
    <td v-text="idx + 1" />
    <td v-text="item.title" />
    <td v-text="item.startDT" />
    <td v-text="item.endDT" />
    <td v-text="item.writerName" />
    <td v-text="item.writeDT" />
  </tr>
</template>

<script>
export default {
  props: {
    item: Object,
    idx: Number,
    activeType: String,
  },
  data: () => ({}),
  methods: {
    click() {
      this.$router.push("/Business/ContestSchedule/" + this.item.id);
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
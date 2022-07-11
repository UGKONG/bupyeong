<template>
  <tr>
    <td v-text="idx + 1" />
    <td v-text="item.name" />
    <td v-text="item.phone" />
    <td v-text="item.joinDT" />
  </tr>
</template>

<script>
export default {
  props: {
    item: Object,
    idx: Number,
  },
}
</script>

<style lang="scss" scoped>
td {
  text-align: center;
  position: relative;
  padding: 8px 0;
  text-align: center !important;
}
</style>
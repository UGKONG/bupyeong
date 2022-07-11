<template>
  <tr>
    <td>{{ idx + 1 }}</td>
    <td>{{ item.name }}</td>
    <td>{{ item.no }}</td>
    <td>{{ item.dt }}</td>
  </tr>
</template>

<script>
export default {
  props: {
    item: Object,
    idx: Number,
  },
};
</script>

<style lang="scss" scoped>
</style>
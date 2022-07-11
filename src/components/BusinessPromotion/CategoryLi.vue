<template>
  <option v-text="item.categoryName" :key="idx" :value="item.categorySeq" />
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
<template>
  <div wrap v-html="description" />
</template>

<script>
export default {
  props: {
    description: [Object, String],
  },
};
</script>

<style lang="scss" scoped>
@import "@index.scss";

[wrap] {
  @include flex(center);
  @include font(14px, auto, $gray, 1px);
  /* @include border(); */
  /* min-height: 200px; */
  max-height: 600px;
  margin-bottom: 20px;
  padding: 10px 0;
  display: block;
  overflow: auto;
}
</style>
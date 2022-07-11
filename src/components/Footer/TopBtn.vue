<template>
  <button @click="click">UP</button>
</template>

<script>
export default {
  methods: {
    click() {
      window.scrollTo(0, 0);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@index.scss";
$size: 60px;
$loc: 30px;
button {
  width: $size;
  height: $size;
  right: $loc;
  bottom: $loc;
  border-radius: 50%;
  box-shadow: 0 1px 4px 2px #00000050;
  background-color: $activeColor !important;
  color: $whiteGray;
  z-index: 2;
  position: fixed;
  &:hover {
    color: $white !important;
    background-color: #4438cc !important;
    text-shadow: 0 0 1px #fff;
  }
}
</style>
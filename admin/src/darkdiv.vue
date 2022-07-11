<template>
  <div class="dark-div" :style="{zIndex: return_zIndex}" />
</template>

<script>
import { Store } from './store';
export default {
  computed: {
    return_zIndex: () => Store.darkDiv_zIndex,
  }
}
</script>


<style lang="scss" scoped>
  div {
    width: 100vw;
    height: 100vh;
    background-color: #00000030;
    position: fixed;
    top: 0;
    left: 0;
  }
</style>
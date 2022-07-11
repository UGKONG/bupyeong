<template>
  <tr loading v-if="state">
    <td v-for="(item, idx) in col" :key="idx">
      <div v-for="i in row" :key="i" :style="style">
        <div animation />
      </div>
    </td>
  </tr>
</template>

<script>
export default {
  props: {
    state: {
      type: Boolean,
      default: false
    },
    col: {
      type: Number,
      default: 2
    },
    row: {
      type: Number,
      default: 3
    },
    height: {
      type: Number,
      default: 40
    },
  },
  mounted() {
    
  },
  computed: {
    style() {
      return {
        height: this.height + 'px',
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@index.scss';

@keyframes ani {
  0%   { opacity: 1; }
  45%  { opacity: .5; }
  90%  { opacity: 1; }
  100% { opacity: 1; }
}

[loading] {
  user-select: none;

  &:hover {
    background-color: unset;
  }
  td {
    padding: 0;

    div {
      @include flex(flex-start);
      border-bottom: 1px solid #ddd;
      padding: 10px 12px;
      &:last-of-type {
        border-bottom: 0;
      }

      [animation] {
        @include wrap();
        width: 60%;
        padding: 0;
        background-color: #eee;
        border-radius: 3px;
        animation: ani infinite 2s;
      }

    }
  }

  
}
</style>
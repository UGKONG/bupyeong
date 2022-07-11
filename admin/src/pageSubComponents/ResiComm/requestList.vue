<template>
  <tr>
    <td v-text="idx + 1" />
    <td v-text="item.requestName" />
    <td v-text="item.requestPhone" />
    <td :style="{color: stateColor}" v-text="stateText" />
  </tr>
</template>

<script>
export default {
  props: {
    item: Object,
    idx: Number,
  },
  methods: {

  },
  computed: {
    stateColor() {
      let state = this.item.state;
      return state == '1' ? 'darkgreen' : state == '2' ? 'orangered' : '#555';
    },
    stateText() {
      let state = this.item.state;
      return state == '1' ? '수락됨' : state == '2' ? '거절됨' : '신청중'; 
    }
  }
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
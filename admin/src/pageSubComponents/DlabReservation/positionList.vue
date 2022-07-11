<template>
  <li>
    <input type="radio" name="poChk" 
      :id="id" :value="seq" :checked="checked"
      @change="change"
    />
    <label :for="id" v-text="name" />
  </li>
</template>

<script>
export default {
  props: {
    item: Object,
    selectPositionSeq: Number,
  },
  methods: {
    change () {
      this.$emit('setSelectPositionSeq', this.seq);
    }
  },
  computed: {
    seq () {
      return Number(this.item.poSeq);
    },
    id () {
      return 'poCheck_' + this.item.poSeq;
    },
    name () {
      return this.item.poName;
    },
    checked () {
      return this.item.poSeq == this.selectPositionSeq;
    },
  }
}
</script>

<style lang="scss" scoped>
li {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  input {
    margin-left: 20px;
  }

  label {
    display: flex;
    align-items: center;
    height: 100%;
    transform: translateY(1px);
    font-size: 15px;
    padding-left: 8px;
  }
}
</style>
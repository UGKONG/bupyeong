<template>
  <p>
    <input type="checkbox" :id="idName" :ref="refName" :checked="tempChecked" @change="set" :disabled="disabled" />
    <label :for="idName" v-text="labelName" />
    <label :for="idName" switch @click="firstClick">
      <div :style="disabled || tempUnset ? {left: '10px'} : {}">
        <i v-if="!disabled && tempUnset" class="fas fa-question" />
        <i v-if="disabled" class="fas fa-times" />
      </div>
    </label>
  </p>
</template>

<script>
export default {
  props: {
    checked: { default: false, type: Boolean },
    unset: { default: false, type: Boolean },
    disabled: { default: false, type: Boolean },
    idName: { default: 'checkbox', type: String },
    refName: { default: 'checkbox', type: String },
    labelName: { default: '', type: String },
    change: { default: (s) => {console.log(s)}, type: Function }
  },
  data() {
    return {
      tempChecked: false,
      tempUnset: true, 
    }
  },
  watch: {
    checked() {
      this.tempChecked = this.checked;
    },
    unset() {
      this.tempUnset = this.unset;
    },
  },
  created() {
    this.tempUnset = this.unset;
    this.tempChecked = this.checked;
  },
  methods: {
    set (e) {
      this.change({
        checked: e.target.checked, 
        idName: this.idName,
        ref: this.$refs[this.refName],
        labelName: this.labelName
      });
    },
    firstClick() {
      this.tempUnset = false;
      if (this.disabled) {
        this.change(null);
      }
    }
  }
}
</script>

<style lang="scss" scoped>
p {
  display: flex;
  align-items: center;

  input {
    display: none;
  }

  input:checked ~ [switch] {
    background-color: #4bc64b;

    &  > div {
      left: 20px;
    }

  }

  [switch] {
    width: 50px;
    height: 28px;
    margin-left: 10px;
    display: inline-block;
    border: 1px solid #eee;
    background-color: #ddd;;
    padding: 2px;
    border-radius: 100px;
    transform: translateY(1px);
    overflow: hidden;
    cursor: pointer;
    transition: .3s;
    position: relative;
    & > div {
      position: absolute;
      top: 2px;
      left: 2px;
      width: 26px;
      height: calc(100% - 4px);
      background-color: #fff;
      display: flex;
      border-radius: 100px;
      transition: .3s;
      align-items: center;
      justify-content: center;

      i {
        color: #ddd;
      }
    }
  }
}

</style>
<template>
  <label :style="{ height: `${height}px` }">
    <input
      type="text"
      v-model="value"
      class="active"
      @keydown="keydown"
      placeholder="검색어 입력"
    />
    <button
      @click="click"
      :style="{
        width: `${height}px`,
        height: `${height}px`,
        fontSize: `${height <= 35 ? 15 : 20}px`,
      }"
    >
      <i class="fas fa-search" />
    </button>
  </label>
</template>

<script>
export default {
  props: {
    change: {
      type: null,
      default: null,
    },
    width: {
      type: [String, Number],
      default: 400,
    },
    height: {
      type: [String, Number],
      default: 40,
    },
  },
  data() {
    return {
      value: "",
    };
  },
  watch: {
    change(val) {
      this.value = "";
    },
    value() {
      this.$emit("setValue", this.trimValue);
    },
  },
  methods: {
    click() {
      this.$emit("search");
    },
    keydown(e) {
      let keyCode = e.keyCode;
      if (keyCode != 13) return;
      this.$emit("search");
    },
  },
  computed: {
    trimValue() {
      return this.value; //.replaceAll(" ", "");
    },
  },
};
</script>

<style lang="scss" scoped>
$size: 40px;

label {
  width: 100%;
  max-width: 400px;
  height: $size;
  display: block;
  position: relative;
  user-select: none;
  overflow: hidden;
  /* margin-right: 5px; */

  input {
    height: 100% !important;
    border: none;
    transition: 0.2s;
    color: #fff;
    outline: none;
    border: 1px solid transparent;
    padding: 0 ($size + 12px) 0 10px;
    width: 100%;
    max-width: 400px;
    color: #555;
    font-size: 16px;
    border: 1px solid #ccc;
    &:focus {
      border: 1px solid #aaa;
    }
  }

  button {
    position: absolute;
    background-color: transparent;
    color: #999;
    right: 0;
    top: 0;
    width: $size;
    height: $size;
    border-left: 1px solid #ccc;
    padding: 0 !important;
    color: #aaa;
    font-size: 20px;

    &:disabled {
      cursor: default;
      color: #bbb;
      &:hover {
        color: #bbb;
      }
    }
    &:hover {
      color: #777;
    }
    &:active {
      color: #555;
    }
  }
}
</style>
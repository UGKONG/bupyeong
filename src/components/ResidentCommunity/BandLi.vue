<template>
  <li>
    <label>
      <input
        type="radio"
        :value="item.band_key"
        name="bandChk"
        @click="click"
      />
      <img :src="item.cover" alt="band_img" />
      <p v-text="item.name" />
      <p v-text="'회원수 : ' + item.member_count" />
    </label>
  </li>
</template>

<script>
export default {
  props: {
    item: Object,
    idx: Number,
  },
  methods: {
    click() {
      this.$emit("setChoiceBand", this.item.band_key);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@index.scss";

li {
  width: 200px;
  border: 1px solid $whiteGray;
  padding: 10px;
  margin: 10px;
  @include flex(center);
  flex-flow: column;
  input {
    display: block;
    margin: 6px auto;
  }

  img {
    margin-top: 10px;
    width: 100%;
    height: 100%;
  }
}
</style>
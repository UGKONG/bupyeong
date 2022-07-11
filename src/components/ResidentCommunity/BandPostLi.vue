<template>
  <li>
    <label @click="click">
      <input type="radio" name="postChk" :value="item.post_key" />
      <pre v-html="item.content" />
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
      this.$emit("setChoicePost", this.item.post_key);
    },
  },
  computed: {},
};
</script>

<style lang="scss" scoped>
@import "@index.scss";
li {
  margin-bottom: 10px;
  label {
    white-space: nowrap;
    @include text-overflow;
    @include flex(flex-start);
    input {
      margin-right: 10px;
    }
    pre {
      padding: 8px;
      max-height: 120px;
    }
  }
}
</style>
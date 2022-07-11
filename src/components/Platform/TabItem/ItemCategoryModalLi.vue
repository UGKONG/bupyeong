<template>
  <li wrap>
    <div class="handle">
      <i :class="$store.state.FontAwesome.stroke.dragHandle" />
    </div>
    <input type="text"
      :ref="`name${item.id}`"
      :id="`name${item.id}`"
      v-model="item.name"
    />
    <div sub>
      <span>해당 상품 수 : {{ item.count || 0 }}개</span>
      <button @click="remove">삭제</button>
    </div>
  </li>
</template>

<script>
import { useAlert } from '@hook';
export default {
  props: {
    idx: Number,
    item: Object,
  },
  methods: {
    remove() {
      if (this.item.count > 0) {
        useAlert.warn('상품 카테고리', '해당 카테고리에 상품이 존재합니다.')
        return;
      }
      this.$emit('remove', this.idx);
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@index.scss';
$handleW: 26px;

[wrap] {
  &:last-of-type {
    margin-bottom: 0;
  }

  .handle {
    @include flex(center);
    @include font(18px, auto, $gray, auto);
    width: $handleW;
    cursor: pointer;
    margin-right: 10px;
    align-self: stretch;
    transition: .1s;
    &:hover {
      color: $gray;
    }
  }
  input[type="text"] {
    width: 200px;
    margin-right: 10px;
  }
  span {
    @include font(13px, 400, $gray, 1px);
    margin-right: 10px;
  }
  button {
    background-color: $red;
    color: $white;
    &:hover {
      background-color: $redActive !important;
      color: $white !important;
    }
  }
}
</style>
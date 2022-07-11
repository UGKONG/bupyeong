<template>
  <tr>
    <td v-text="item.couponName" />
    <td v-text="item.description" />
    <td v-text="item.downDT.split(' ')[0]" />
    <td v-text="item.endDT.split(' ')[0]" />
    <td v-text="useChk ? '사용가능' : '사용완료'" />
    <td>
      <button v-if="useChk" @click="use">사용</button>
    </td>
  </tr>
</template>

<script>
import axios from 'axios';
import { useToday, useAlert } from '@hook';
import { EventBus } from '@plugins/store';

export default {
  props: {
    id: String,
    item: Object,
  },
  methods: {
    use() {
      this.$emit('setIsQRModal', true, this.item.id);
    }
  },
  computed: {
    useChk() {
      return this.item.use == 0;
    },
  }
}
</script>

<style lang="scss" scoped>
@import '@index.scss';

td {
  height: 49px;
  &:last-of-type {
    text-align: center;
  }
}
</style>
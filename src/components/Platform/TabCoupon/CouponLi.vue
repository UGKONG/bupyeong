<template>
  <tr v-if="!isMaster && item.open == 1 || isMaster" :style="editModeStyle">
    <td v-text="item.title" />
    <td v-text="item.description" />
    <td v-text="item.startDT.split(' ')[0]" />
    <td v-text="item.endDT.split(' ')[0]" />
    <td v-text="item.count" />
    <td v-text="item.useCount" />
    <td v-text="totalChk" />
    <!-- 상점주 -->
    <td v-if="isMaster && !editMode">
      <button v-if="dateChk && countChk && item.open == 0" @click="setOpen(1)">배포</button>
      <button v-if="dateChk && countChk && item.open != 0" @click="setOpen(0)">배포중지</button>
    </td>
    <td v-if="isMaster && editMode">
      <button :disabled="item.useCount > 0" @click="edit">수정</button>
      <button :disabled="item.useCount > 0" @click="remove">삭제</button>
    </td>
    <!-- 사용자 -->
    <td v-else>
      <button v-if="totalChkState" @click="download">발행받기</button>
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
    isMaster: Boolean,
    editMode: Boolean,
  },
  methods: {
    setOpen(val) {
      let data = {open: val};
      axios.patch(this.$store.state.dbUrl2 + '/shopCouponList/' + this.item.id, data)
        .then(({data}) => {
          this.$emit('getList');
          useAlert.success('쿠폰 배포', val == 1 ? '배포되었습니다.' : '배포가 중지되었습니다.');
        });
    },
    download() {
      let url = this.$store.state.dbUrl2 + '/shopCouponList/' + this.item.id;
      axios.get(url)
        .then(({data}) => {

          axios.patch(url, {useCount: data.useCount + 1})
            .then(() => {
              this.$emit('getList');
            });

          let sendData = {
            memberId: this.$store.state.loginInfo.id,
            shopId: this.id,
            couponId: this.item.id,
            couponName: this.item.title,
            description: this.item.description,
            downDT: useToday(),
            endDT: this.item.endDT,
            use: 0
          }
          axios.post(this.$store.state.dbUrl2 + '/useShopCouponList', sendData)
            .then(() => {
              EventBus.$emit('getHaveCouponList');
              useAlert.success('쿠폰 발행', '쿠폰을 발행 받았습니다.');
            });
        });
    },
    edit() {
      this.$emit('setIsAddModal', true, this.item.id);
    },
    remove() {
      axios.delete(
        this.$store.state.dbUrl2 + '/shopCouponList/' + this.item.id
      ).then(({data}) => {
        this.$emit('getList');
        useAlert.success('쿠폰 삭제', '해당 쿠폰이 삭제되었습니다.');
      });
    }
  },
  computed: {
    editModeStyle() {
      if (!this.editMode) return {};
      return {
        backgroundColor: '#00000050',
        userSelect: 'none'
      }
    },
    dateChk() {
      let end = new Date(this.item.endDT);
      let now = new Date(useToday());
      let calc = now - end;
      let result = calc >= 0 ? false : true;
      return result;
    },
    countChk() {
      let count = Number(this.item.count);
      let useCount = Number(this.item.useCount);
      let result = useCount < count;
      return result;
    },
    totalChkState() {
      if (!this.dateChk) return false;
      if (!this.countChk) return false;
      if (this.item.open == 1) return true;
      return true;
    },
    totalChk() {
      if (!this.dateChk) return '기간만료';
      if (!this.countChk) return '쿠폰소진';
      if (this.item.open == 1) return '배포중';
      return this.isMaster ? '배포가능' : '발행가능';
    },
  }
}
</script>

<style lang="scss" scoped>
@import '@index.scss';

tr {
  transition: .2s;

  td {
    height: 49px;
    &:nth-of-type(8),
    &:nth-of-type(9),
    &:nth-of-type(10) {
      text-align: center;
      overflow: hidden;
      text-overflow: clip;
      button:disabled {
        color: $gray;
        background-color: #ccc;
      }
      button:last-of-type {
        margin-left: 5px;
      }
    }
  }
}
</style>
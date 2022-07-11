<template>
  <section>
    <div option>
      보유 쿠폰 수 : {{ myCouponLen }} / 사용 가능 쿠폰 수 : {{ usePossibleLen }}
    </div>

    <table contents>
      <thead>
        <tr>
          <th v-for="(item, idx) in theadList" :key="idx" v-text="item" />
        </tr>
      </thead>
      <tbody>
        <CouponLi v-for="(item, idx) in list" 
          :id="id" :key="idx" :item="item"
          @setIsQRModal="setIsQRModal"
          @getList="getList"
        />
      </tbody>
    </table>

    <!-- Modal -->
    <transition name="fade-transition" mode="out-in">
      <QRModal
        v-if="isQRModal" 
        :id="id" :selectId="selectId"
        @setIsQRModal="setIsQRModal"
      />
    </transition>
  </section>
</template>

<script>
import axios from 'axios';
import { EventBus } from '@plugins/store';
import CouponLi from '@/components/Platform/TabHaveCoupon/CouponLi';
import QRModal from '@/components/Platform/TabHaveCoupon/QRModal';

export default {
  components: {
    CouponLi,
    QRModal,
  },
  props: {
    id: String,
  },
  data: () => ({
    theadList: ['쿠폰명','할인정보','발행일','만료일','만료여부',''],
    list: [],
    isQRModal: false,
    selectId: 0,
  }),
  created() {
    this.getList();

    EventBus.$on('getHaveCouponList', this.getList);
  },
  methods: {
    getList() {
      axios.get(
        this.$store.state.dbUrl2 + '/useShopCouponList?memberId=' + 
        this.$store.state.loginInfo.id + '&shopId=' + this.id
      ).then(({data}) => {
        this.list = data;
      });
    },
    setIsQRModal(val, id = 0) {
      this.isQRModal = val;
      this.selectId = id;
    }
  },
  computed: {
    myCouponLen() {
      return this.list.length;
    },
    usePossibleLen() {
      let arr = this.list.filter(x => x.use == 0);
      return arr.length;
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@index.scss';

section {
  @include wrap(block);

  [option] {
    @include shop-tab-option(flex-end);
    border-bottom: none;
    padding-right: 4px;
  }
  [contents] {
    width: 100%;
    height: calc(100% - $shop-tab-optionHeight);
    padding-top: 10px;
    overflow: auto;

    th {
      &:nth-of-type(1) {width: 250px;}
      &:nth-of-type(2) {width: 100%;}
      &:nth-of-type(3) {width: 120px;}
      &:nth-of-type(4) {width: 120px;}
      &:nth-of-type(5) {width: 100px;}
      &:nth-of-type(6) {width: 80px;}
    }
  }
}
</style>
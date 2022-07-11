<template>
  <section modal>
    <div wrap>
      <h2>
        쿠폰 사용
        <button @click="$emit('setIsQRModal', false)">
          <i :class="$store.state.FontAwesome.stroke.x" />
        </button>
      </h2>
      <div contents>
        <h3>쿠폰명 : {{ data.couponName }}</h3>
        <div cam>
          <QrCode :text="qrData" />
        </div>
        <p info>
          <span>해당 QR코드는 한번 인식되면 사용 될 수 없습니다.</span>
          <span>사용 시에만 인식 시켜주세요.</span>
        </p>
      </div>
    </div>
    <div bg />
  </section>
</template>

<script>
import axios from 'axios';
import VueQRCodeComponent from 'vue-qrcode-component';
import { useQueryString, useAlert } from '@hook';

export default {
  components: {
    QrCode: VueQRCodeComponent
  },
  props: {
    id: String,
    selectId: [Number, String],
  },
  data: () => ({
    data: {}
  }),
  created() {
    this.getData();
  },
  methods: {
    getData() {
      axios.get(
        this.$store.state.dbUrl2 + '/useShopCouponList/' + this.selectId
      ).then(({data}) => {
        this.data = {id: data.id, couponName: data.couponName};
      });
    },
  },
  computed: {
    qrData() {
      return useQueryString(this.data);
    },
    qrStyle() {
      return {transform: 'rotateY(180deg)'};
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@index.scss';
$h: 200px;

[modal] > div[wrap] {
  $w: 370px;
  width: $w;
  height: 400px;
  left: calc(50% - $w / 2);
}
[contents] {

  [cam] {
    @include flex(center);
    height: $h;
    margin: 0 auto;

    & > div {
      transform: scale(.8);
    }
  }
  [info] {
    @include flex(center, column);
    @include font(14px, 500, $red, 1px);
    margin-top: 20px;
  }
}
</style>
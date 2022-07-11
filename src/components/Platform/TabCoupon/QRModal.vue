<template>
  <section modal>
    <div wrap>
      <h2>
        쿠폰 인식
        <button @click="$emit('setIsQRModal', false)">
          <i :class="$store.state.FontAwesome.stroke.x" />
        </button>
      </h2>
      <div contents>
        <div cam>
          <span>잠시만 기다려주세요.</span>
          <qrcode-stream @decode="onDecode" :style="qrStyle" />
        </div>
        <p info>회원의 쿠폰 QR코드를 인식해주세요.</p>
      </div>
    </div>
    <div bg />
  </section>
</template>

<script>
import axios from 'axios';
import { EventBus } from '@plugins/store';
import { useQueryObject, useAlert } from '@hook';

export default {
  components: {
    
  },
  props: {
    id: String,
  },
  data: () => ({
    
  }),
  methods: {
    save() {
      
    },
    onDecode(_url) {
      let query = _url.split('?')[1];
      let params = useQueryObject(query);
      let id = params.id;
      axios.patch(
        this.$store.state.dbUrl2 + '/useShopCouponList/' + id,
        {use: 1}
      ).then(({data}) => {
        useAlert.info('쿠폰인식', '쿠폰이 사용되었습니다.');
        EventBus.$emit('getHaveCouponList');
      });
    }
  },
  computed: {
    qrStyle() {
      return {transform: 'rotateY(180deg)'};
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@index.scss';
$h: 280px;

[modal] > div[wrap] {
  $w: 370px;
  width: $w;
  height: 400px;
  left: calc(50% - $w / 2);
}
[contents] {

  [cam] {
    width: 350px;
    height: $h;
    margin: 0 auto;
    border: 1px solid $whiteGray;
    position: relative;

    & > span {
      @include center();
    }
  }
  [info] {
    @include flex(center);
    @include font(14px, 500, $red, 2px);
    height: calc(100% - $h);
  }
}
</style>
<template>
  <section modal>
    <div wrap>
      <h2>
        대기자 QR코드 인식
        <button @click="$emit('setQRModal', false)">
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
import axios from "axios";
import { useToday, useQueryObject, useAlert } from "@hook";

export default {
  components: {},
  props: {
    id: String,
  },
  methods: {
    save() {},
    onDecode(_url) {
      let query = _url.split("?")[1];
      let data = useQueryObject(query);
      data.shopId = Number(data.shopId);
      data.userId = Number(data.userId);
      data.count1 = Number(data.count1);
      data.count2 = Number(data.count2);
      data.state = Number(data.state);
      data.date = useToday();
      console.log(data);

      axios
        .post(this.$store.state.dbUrl2 + "/shopWaitList", data)
        .then(({ data }) => {
          useAlert.success("대기자 등록", "대기자가 등록되었습니다.");
          this.$emit("getList");
        });
    },
  },
  computed: {
    qrStyle() {
      return { transform: "rotateY(180deg)" };
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@index.scss";
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
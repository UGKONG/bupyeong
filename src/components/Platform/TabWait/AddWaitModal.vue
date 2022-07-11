<template>
  <section modal>
    <div wrap :style="{ height: result ? '400px' : '230px' }">
      <h2>
        {{ result ? "대기등록 QR코드" : "대기정보 입력" }}
        <button @click="$emit('setAddModal', false)">
          <i :class="$store.state.FontAwesome.stroke.x" />
        </button>
      </h2>
      <div v-if="!result" contents>
        <div name>대기자명: {{ name }}</div>
        <div count>
          <p>
            <label for="l">성인 인원</label>
            <input
              type="number"
              name="l"
              id="l"
              ref="l"
              v-model.number="data.count1"
              autocomplete="false"
            />명
          </p>
          <p>
            <label for="s">아동 인원</label>
            <input
              type="number"
              name="s"
              id="s"
              v-model.number="data.count2"
              autocomplete="false"
            />명
          </p>
        </div>
        <div btn>
          <button @click="save">대기등록</button>
        </div>
      </div>

      <div v-if="result" contents result>
        <QrCode :text="qrData" />
        <p>
          대기자 정보가 입력완료되었습니다.<br />
          상점주에게 대기자 등록을 해주세요.
        </p>
      </div>
    </div>

    <div bg />
  </section>
</template>

<script>
import VueQRCodeComponent from "vue-qrcode-component";
import { useQueryString, useAlert } from "@hook";

export default {
  components: {
    QrCode: VueQRCodeComponent,
  },
  props: {
    id: String,
  },
  data: () => ({
    data: {},
    result: false,
  }),
  created() {
    this.init();
  },
  methods: {
    init() {
      this.data = {
        shopId: Number(this.id),
        userId: this.$store.state.loginInfo.id,
        userName: this.$store.state.loginInfo.name,
        count1: 0,
        count2: 0,
        date: "",
        state: 0,
      };
    },
    save() {
      if (this.data.count1 == 0 && this.data.count2 == 0) {
        this.$refs.l.focus();
        return useAlert.warn("대기 등록", "인원을 올바르게 입력해주세요.");
      }
      this.result = true;
    },
  },
  computed: {
    qrData() {
      return useQueryString(this.data);
    },
    name() {
      return this.$store.state.loginInfo.name;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@index.scss";

[modal] > div[wrap] {
  $w: 300px;
  width: $w;
  left: calc(50% - $w / 2);
}
[contents] {
  & > div {
    @include flex(space-between);
    margin-bottom: 10px;

    & > p {
      @include flex(flex-start, row, wrap);
    }
    label {
      margin-bottom: 4px;
      font-size: 13px;
      width: 100%;
    }
    input {
      width: 100px;
      margin-right: 5px;
    }
  }
  [name]:not(input) {
    font-size: 16px;
    margin-bottom: 20px;
  }
  [btn] {
    @include flex(center);
    margin-top: 24px;
  }
}

[contents][result] {
  & > div {
    width: 256px;
    height: 256px;
    margin: 0 auto 20px;
    transform: translateX(-1px);
  }
  & > p {
    @include font(15px, 500, $red);
    text-align: center;
  }
}
</style>
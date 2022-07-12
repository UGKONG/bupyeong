<template>
  <section>
    <div option>
      <span></span>
      <span>
        <button @click="reservation">예약</button>
      </span>
    </div>
    <div contents>
      <div row>
        <p>
          <label for="reservName">예약자명:</label>
          <input
            type="text"
            v-model="value.name"
            ref="reservName"
            id="reservName"
          />
        </p>
      </div>
      <div row>
        <p>
          <label for="reservDate">예약날짜:</label>
          <input
            type="date"
            v-model="value.date"
            ref="reservDate"
            id="reservDate"
          />
        </p>
        <p>
          <label for="reservTime">예약시간:</label>
          <input
            type="time"
            v-model="value.time"
            ref="reservTime"
            id="reservTime"
          />
        </p>
      </div>
      <div row>
        <p>
          <label>예약인원:</label>
          <label for="reservCount1" count>성인</label>
          <input
            type="number"
            ref="reservCount1"
            id="reservCount1"
            v-model.number="value.count1"
          />
          <span desc>명</span>
          <label for="reservCount2" count>아동</label>
          <input
            type="number"
            ref="reservCount2"
            id="reservCount2"
            v-model.number="value.count2"
          />
          <span desc>명</span>
        </p>
      </div>
    </div>
  </section>
</template>

<script>
import axios from "axios";
import { EventBus } from "@plugins/store";
import { useToday, useAlert, useSendValidation } from "@hook";

export default {
  components: {},
  props: {
    id: String,
  },
  data: () => ({
    value: { name: "", date: "", time: "", count1: 0, count2: 0 },
  }),
  created() {
    this.init();
  },
  methods: {
    init() {
      let [date, time] = useToday().split(" ");
      this.value.date = date;
      time = time.split(":");
      time = time[0] + ":" + time[1];
      this.value.time = time;
    },
    reservation() {
      let pass = useSendValidation(
        [
          this.$refs.reservName,
          this.$refs.reservDate,
          this.$refs.reservTime,
          this.$refs.reservCount1,
          this.$refs.reservCount2,
        ],
        () => {
          useAlert.warn("예약", "예약정보를 입력해주세요.");
        }
      );
      if (!pass) return;
      if (this.value.name.length < 2) {
        this.$refs.name.focus();
        useAlert.warn("예약", "예약자명을 올바르게 입력해주세요.");
        return;
      }
      if (this.value.count1 == 0 && this.value.count2 == 0) {
        this.$refs.reservCount1.focus();
        useAlert.warn("예약", "예약인원을 입력해주세요.");
        return;
      }
      this.submit();
    },
    submit() {
      let loginInfo = this.$store.state.loginInfo;
      let data = {
        shopId: Number(this.id),
        userId: loginInfo.id,
        userName: loginInfo.name,
        userPhone: loginInfo.phone,
        reservName: this.value.name,
        reservDate: this.value.date,
        reservTime: this.value.time,
        count1: this.value.count1,
        count2: this.value.count2,
        state: 0,
      };

      axios
        .post(this.$store.state.dbUrl2 + "/shopReservationList", data)
        .then(({ data }) => {
          useAlert.success("예약", "예약이 완료되었습니다.");
          this.value = { name: "", date: "", time: "", count1: 0, count2: 0 };
          EventBus.$emit("getShopReservList");
        });
    },
  },
  computed: {},
};
</script>

<style lang="scss" scoped>
@import "@index.scss";

[option] {
  @include shop-tab-option(space-between);
  button {
    white-space: nowrap;
    margin-left: 5px;
    padding: 6px 16px !important;
    background-color: $activeColor;
    border: 1px solid #ddd;
    color: #fff;
    &:hover {
      color: #fff !important;
      background-color: $hoverColor !important;
    }
  }
}
[contents] {
  width: 100%;
  height: calc(100% - $shop-tab-optionHeight);
  padding-top: 10px;
  overflow: auto;
  align-items: flex-start;
  align-content: flex-start;

  [row] {
    @include flex(flex-start);
    padding: 4px 0;

    p {
      margin-right: 20px;
      label {
        margin-right: 10px;
        &[count] {
          @include font(14px, 400, $gray);
          color: #555;
          margin-right: 5px;
          & + input {
            width: 60px;
            margin-right: 3px;
          }
        }
      }
      span {
        &[desc] {
          @include font(14px, 400, $gray);
          margin-right: 20px;
        }
      }
      input {
        margin-right: 4px;
      }
    }
  }
}
</style>
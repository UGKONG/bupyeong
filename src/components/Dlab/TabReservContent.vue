<template>
  <section wrap>
    <div option>
      <span info>※ 예약은 1시간 단위로 가능합니다.</span>
      <span>
        <button @click="validation">예약</button>
      </span>
    </div>
    <div contents>
      <div row>
        <p>
          <label>장소선택:</label>
          <span v-for="(item, i) in list" :key="i">
            <input
              type="radio"
              :id="`position_${item.poSeq}`"
              name="position"
              :value="item.poSeq"
              v-model="value.position"
            />
            <label :for="`position_${item.poSeq}`" v-text="item.poName" />
          </span>
        </p>
      </div>
      <div row>
        <Calendar :dateClick="dateClick" />
      </div>
      <div row>
        <p>
          <label for="name">예약자명:</label>
          <input
            type="text"
            v-model="value.name"
            ref="name"
            id="name"
            autocomplete="false"
          />
        </p>
      </div>
      <div row>
        <p>
          <label for="date">예약날짜:</label>
          <input
            type="date"
            v-model="value.date"
            ref="date"
            id="date"
            autocomplete="false"
            readonly
          />
        </p>
        <p>
          <label for="reservTime">예약시간:</label>
          <input
            type="time"
            v-model="value.startTM"
            ref="startTM"
            id="startTM"
            autocomplete="false"
          />
        </p>
      </div>
      <div row>
        <p>
          <label>결과:</label>
          <span v-text="dateTimeResult" />
        </p>
      </div>
    </div>
  </section>
</template>

<script>
import axios from "axios";
import Calendar from "@/components/Dlab/TabReserv/Calendar";
import {
  useSendValidation,
  useToday,
  useDateFormat,
  useTimeFormat,
  useAlert,
} from "@hook";

export default {
  components: {
    Calendar,
  },
  data: () => ({
    value: {},
    list: [],
  }),
  created() {
    this.init();
    this.getList();
  },
  methods: {
    dateClick(date) {
      console.log("선택된 날짜: ", date);
      this.value.date = date;
    },
    getList() {
      axios
        .get(this.$store.state.dbUrl + "/admin_dlabPositionList")
        .then(({ data }) => {
          this.list = data;
          this.value.position = data[0].poSeq;
        });
    },
    valueReset() {
      this.value = { name: "", date: "", startTM: "", endTM: "", position: 0 };
    },
    init() {
      this.valueReset();
      let [date, time] = useToday().split(" ");
      this.value.date = date;
      time = time.split(":");
      time = time[0] + ":" + time[1];
      this.value.startTM = time;
    },
    validation() {
      let pass = useSendValidation(
        [
          this.value.position,
          this.$refs.name,
          this.$refs.date,
          this.$refs.startTM,
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
      this.submit();
    },
    submit() {
      let loginInfo = this.$store.state.loginInfo;
      let positionName = this.list.find(
        (x) => x.poSeq == this.value.position
      ).poName;
      let data = {
        userId: loginInfo.id,
        positionId: this.value.position,
        positionName: positionName,
        userName: loginInfo.name,
        userPhone: loginInfo.phone,
        reservName: this.value.name,
        startDT: this.startDT,
        endDT: this.endDT,
        state: 0,
      };

      console.log(data);

      axios
        .post(this.$store.state.dbUrl2 + "/DlabReservationList", data)
        .then(({ data }) => {
          useAlert.success("예약", "예약이 완료되었습니다.");
          this.valueReset();
        });
    },
  },
  computed: {
    startDT() {
      return this.value.date + " " + this.value.startTM;
    },
    endDT() {
      let dt = this.value.date;
      let tm = this.value.startTM;
      if (!dt) return "";
      if (!tm) return "";
      let endDT = new Date(dt + " " + tm);
      endDT.setHours(endDT.getHours() + 1);
      return useDateFormat(endDT) + " " + useTimeFormat(endDT);
    },
    dateTimeResult() {
      let dt = this.value.date;
      let tm = this.value.startTM;
      if (!dt) return "날짜를 선택해주세요.";
      if (!tm) return "시간을 선택해주세요.";
      let startDT = dt.split("-");
      let startTM = tm.split(":");
      let endDT = useDateFormat(this.endDT).split("-");
      let endTM = useTimeFormat(this.endDT).split(":");
      let start = `${startDT[0]}년 ${startDT[1]}월 ${startDT[2]}일 ${startTM[0]}시 ${startTM[1]}분`;
      let end = `${endDT[0]}년 ${endDT[1]}월 ${endDT[2]}일 ${endTM[0]}시 ${endTM[1]}분`;
      return start + " ~ " + end;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@index.scss";

[option] {
  @include shop-tab-option(space-between);
  span[info] {
    @include font(14px, 400, $red);
  }
  button {
    margin-left: 5px;
  }
}
[contents] {
  height: calc(100% - $shop-tab-optionHeight);
  padding-top: 10px;

  [row] {
    @include flex(flex-start);
    padding: 4px 0;
    margin-bottom: 10px;

    p {
      margin-right: 20px;
      label {
        margin-right: 10px;
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
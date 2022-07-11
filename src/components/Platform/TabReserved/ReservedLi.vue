<template>
  <tr>
    <td v-text="i + 1" />
    <td v-text="name" />
    <td v-text="phone" />
    <td v-text="reservDT" />
    <td v-text="count" />
    <td v-text="item.date" />
    <td v-text="state" :style="stateStyle(item.state)" />
    <td v-if="isMaster">
      <button v-if="item.state == 0" @click="click(1)">수락</button>
      <button v-if="item.state == 0" @click="click(2)">거절</button>
    </td>
    <td v-else>
      <button v-if="myReserv && item.state != 3" @click="click(3)">
        취소하기
      </button>
    </td>
  </tr>
</template>

<script>
import axios from "axios";
import { useAlert } from "@hook";
export default {
  props: {
    i: Number,
    item: Object,
    isMaster: Boolean,
  },
  methods: {
    click(val) {
      if (val == 0 || val > 3) return console.log("dd");
      let data = { state: val };
      val == 1 && useAlert.success("예약 수락", "예약이 수락되었습니다.");
      val == 2 && useAlert.error("예약 거절", "예약이 거절되었습니다.");
      val == 3 && useAlert.warn("예약 취소", "예약이 취소되었습니다.");
      axios
        .patch(
          this.$store.state.dbUrl2 + "/shopReservationList/" + this.item.id,
          data
        )
        .then(({ data }) => {
          this.$emit("getList");
        });
    },
    stateStyle(state) {
      if (state == 1) return { color: "#1b891b" };
      if (state == 2) return { color: "#ff4a4a" };
      if (state == 3) return { color: "#888" };
      return { color: "#4952f8" };
    },
  },
  computed: {
    name() {
      let name = this.item.reservName;
      if (this.isMaster) return name;
      if (this.item.userId == this.$store.state.loginInfo.id) return name;
      name = name.split("");
      name[1] = "*";
      if (name.length < 3) return name.join("");
      name[2] = "*";
      return name.join("");
    },
    phone() {
      let phone = this.item.userPhone;
      if (this.isMaster) return phone;
      if (this.item.userId == this.$store.state.loginInfo.id) return phone;
      phone = phone.split("-");
      phone[1] = "****";
      phone = phone.join("-");
      return phone;
    },
    reservDT() {
      return this.item.reservDate + " " + this.item.reservTime;
    },
    count() {
      return this.item.count1 + "명 / " + this.item.count2 + "명";
    },
    state() {
      let state = this.item.state;
      if (state == 0) return "예약신청";
      if (state == 1) return "예약완료";
      if (state == 2) return "예약거절";
      if (state == 3) return "신청취소";
      return "-";
    },
    myReserv() {
      return this.item.userId == this.$store.state.loginInfo.id;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@index.scss";
td {
  height: 49px;
  &:last-of-type {
    text-align: center;
    button {
      margin-right: 5px;
      &:last-of-type {
        margin-right: 0;
      }
    }
  }
}
</style>
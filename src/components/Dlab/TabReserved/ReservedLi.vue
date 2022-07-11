<template>
  <tr>
    <td v-text="i + 1" />
    <td v-text="name" />
    <td v-text="phone" />
    <td v-text="item.positionName" />
    <td v-text="startDT" />
    <td v-text="endDT" />
    <td v-text="state" :style="stateStyle(item.state)" />
    <td>
      <button v-if="myReserv && item.state != 3" @click="click">
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
  },
  methods: {
    click() {
      let data = { state: 3 };
      axios
        .patch(
          this.$store.state.dbUrl2 + "/DlabReservationList/" + this.item.id,
          data
        )
        .then(({ data }) => {
          this.$emit("getList");
          useAlert.warn("예약 취소", "예약이 취소되었습니다.");
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
      if (this.item.userId == this.$store.state.loginInfo.id) return name;
      name = name.split("");
      name[1] = "*";
      if (name.length < 3) return name.join("");
      name[2] = "*";
      return name.join("");
    },
    phone() {
      let phone = this.item.userPhone;
      if (this.item.userId == this.$store.state.loginInfo.id) return phone;
      phone = phone.split("-");
      phone[1] = "****";
      phone = phone.join("-");
      return phone;
    },
    startDT() {
      let _ = this.item.startDT.split(" ");
      let date = _[0].split("-");
      let time = _[1].split(":");
      let result = `${date[0]}년 ${date[1]}월 ${date[2]}일 ${time[0]}시 ${time[1]}분`;
      return result;
    },
    endDT() {
      let _ = this.item.endDT.split(" ");
      let date = _[0].split("-");
      let time = _[1].split(":");
      let result = `${date[0]}년 ${date[1]}월 ${date[2]}일 ${time[0]}시 ${time[1]}분`;
      return result;
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
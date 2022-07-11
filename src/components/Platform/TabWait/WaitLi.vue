<template>
  <tr>
    <td v-text="i + 1" />
    <td v-text="item.userName" />
    <td v-text="item.count1 + '명 / ' + item.count2 + '명'" />
    <td v-text="item.date" />
    <td v-text="state" />
    <td>
      <button v-if="isMaster" @click="result(1)">호출</button>
      <button v-if="isMaster" @click="result(2)">입장처리</button>
      <button @click="result(3)">취소처리</button>
    </td>
  </tr>
</template>

<script>
import axios from "axios";
import { useAlert } from "../../../../admin/src/hook";
export default {
  props: {
    i: Number,
    item: Object,
    isMaster: Boolean,
  },
  data: () => ({}),
  methods: {
    result(val) {
      axios
        .patch(this.$store.state.dbUrl2 + "/shopWaitList/" + this.item.id, {
          state: val,
        })
        .then(({ data }) => {
          let txt = "";
          if (val == 1) txt = "호출";
          if (val == 2) txt = "입장처리";
          if (val == 3) txt = "취소처리";
          useAlert.success(txt, txt + "되었습니다.");
        });
    },
  },
  computed: {
    state() {
      let state = this.item.state;
      if (state == 0) return "대기중";
      if (state == 1) return "호출";
      if (state == 2) return "입장처리";
      if (state == 3) return "취소됨";
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@index.scss";
button {
  margin-right: 5px;

  &:last-of-type {
    margin-right: 0;
  }
}
</style>
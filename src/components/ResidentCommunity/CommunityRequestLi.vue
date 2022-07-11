<template>
  <tr>
    <td>{{ idx + 1 }}</td>
    <td>{{ item.name }}</td>
    <td>{{ item.no }}</td>
    <td>{{ item.dt }}</td>
    <td v-if="item.state == 0">
      <button yes @click="changeState(1)">승인</button>
      <button no @click="changeState(2)">거절</button>
    </td>
    <td v-else>
      <span v-if="item.state == 1">승인</span>
      <span v-if="item.state == 2">거절</span>
    </td>
  </tr>
</template>

<script>
import axios from "axios";
export default {
  props: {
    item: Object,
    idx: Number,
  },
  methods: {
    changeState(val) {
      let data = { state: val };
      axios
        .patch(
          this.$store.state.dbUrl + "/communityMemberList/" + this.item.id,
          data
        )
        .then((res) => {
          console.log(res);
          this.$emit("getList2");
        });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@index.scss";

tr:hover {
  background-color: $white !important;
}
td:nth-of-type(5) {
  text-align: center;
}
button {
  color: $white;
  margin-right: 5px;
  &:last-of-type {
    margin-right: 0;
  }
  &[yes] {
    background-color: $green;
    color: $whiteGray;
    &:hover {
      background-color: $green !important;
      color: $white !important;
    }
  }
  &[no] {
    background-color: $red;
    color: $whiteGray;
    &:hover {
      background-color: $red !important;
      color: $white !important;
    }
  }
}
</style>
<template>
  <tr>
    <td @click="detailView" v-text="idx + 1" />
    <td @click="detailView" v-text="item.name" />
    <td @click="detailView" v-text="item.phone" />
    <td @click="detailView">{{ item.progress }}%</td>
    <td>
      <button v-if="item.state == 0" @click="completeBtn">수료처리</button>
      <span v-if="item.state == 1">수료처리 완료</span>
    </td>
  </tr>
</template>

<script>
import { useAlert } from "@hook";
export default {
  props: {
    item: Object,
    idx: Number,
    id: String,
  },
  data: () => ({}),
  created() {},
  methods: {
    detailView() {
      this.$router.push(
        "/Newdeal/University/" +
          this.id +
          "/Student/" +
          this.item.id +
          "?category=1"
      );
    },
    completeBtn() {
      let ask = confirm(this.item.name + "수강생을 수료처리 하시겠습니까?");
      if (!ask) return;

      useAlert.success(this.item.name, "수료처리가 완료되었습니다.");
    },
  },
  computed: {
    completeNo() {
      return this.item.state == 0;
    },
    completeYes() {
      return this.item.state == 1;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@index.scss";
tr {
  cursor: pointer;
  &:hover {
    button {
      background-color: #ddd;
    }
  }

  td {
    height: 49px;
  }
  button:hover {
    background-color: #aaa;
  }
}
@media screen and (max-width: 499px) {
  td {
    &:nth-of-type(3) {
      display: none;
    }
  }
}
</style>
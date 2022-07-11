<template>
  <tr @click="click">
    <td>
      <img :src="item.imgPath || tempImg" alt="상점 대표 이미지" />
    </td>
    <td v-text="item.shopName" />
    <td v-text="item.shopDescription" />
    <td v-text="item.joinDT" />
  </tr>
</template>

<script>
import tempImg from "@images/tempImg.png";
export default {
  props: {
    item: Object,
    idx: Number,
    activeType: String,
  },
  data: () => ({
    tempImg,
  }),
  methods: {
    click() {
      this.$router.push(
        "/Food/Platform/" + this.item.shopSeq + "?topTab=1&bottomTab=1"
      );
    },
  },
  computed: {},
};
</script>

<style lang="scss" scoped>
@import "@index.scss";
tr {
  cursor: pointer;

  td {
    &:first-of-type {
      padding: 0;
      img {
        width: 80px;
        height: 80px;
      }
    }
  }
}
</style>
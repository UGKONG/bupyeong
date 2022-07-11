<template>
  <tr @click="click">
    <td>
      <img
        :src="item.imgPath || item.phTitleImageURL || tempImg"
        alt="상점 대표 이미지"
      />
    </td>
    <td v-text="item.phTitle" />
    <td v-text="item.phContents" />
    <td v-text="item.writeDT" />
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
      this.$router.push("/StartCity/PublicHearing/" + this.item.phSeq);
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
    height: 80px;
    max-height: 80px;
    overflow: hidden;
    font-size: 14px;

    &:first-of-type {
      padding: 0;
      img {
        width: 130px;
        height: 80px;
      }
    }

    @media screen and (max-width: 600px) {
      height: 70px;
      &:first-of-type img {
        width: 100px;
        height: 70px;
      }
    }
    @media screen and (max-width: 500px) {
      height: 50px;
      &:first-of-type img {
        width: 100px;
        height: 50px;
      }
    }
  }
}
</style>
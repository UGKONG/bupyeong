<template>
  <table>
    <thead>
      <tr>
        <th v-for="(item, idx) in theadList" :key="idx" v-text="item" />
      </tr>
    </thead>
    <tbody>
      <ShopTextLi
        v-for="(item, idx) in list"
        :key="idx"
        :item="item"
        :idx="idx"
      />
    </tbody>
  </table>
</template>

<script>
import ShopTextLi from "@/components/Platform/ShopTextLi";
export default {
  components: {
    ShopTextLi,
  },
  props: {
    list: Array,
  },
  data: () => ({
    theadList: ["이미지", "상점명", "소개문구", "개설일"],
  }),
};
</script>

<style lang="scss" scoped>
@import "@index.scss";
th {
  &:nth-of-type(1) {
    width: 80px;
  }
  &:nth-of-type(2) {
    width: 250px;
  }
  &:nth-of-type(3) {
    width: auto;
  }
  &:nth-of-type(4) {
    width: 120px;
  }
  @media screen and (max-width: 900px) {
    &:nth-of-type(2) {
      width: 150px;
    }
    &:nth-of-type(4) {
      width: 100px;
    }
  }
  @media screen and (max-width: 700px) {
    &:nth-of-type(4) {
      width: 0;
      padding: 0;
      border: 0;
    }
  }
  @media screen and (max-width: 600px) {
    &:nth-of-type(1) {
      width: 0;
      padding: 0;
    }
  }
  @media screen and (max-width: 500px) {
    &:nth-of-type(2) {
      width: 120px;
    }
  }
}
</style>
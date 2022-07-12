<template>
  <table>
    <thead>
      <tr>
        <th v-for="(item, idx) in theadList" :key="idx" v-text="item" />
      </tr>
    </thead>
    <tbody>
      <ContestTextLi
        v-for="(item, idx) in list"
        :key="idx"
        :item="item"
        :idx="idx"
      />
    </tbody>
  </table>
</template>

<script>
import ContestTextLi from "@/components/ContestSchedule/ContestTextLi";
export default {
  components: {
    ContestTextLi,
  },
  props: {
    list: Array,
  },
  data: () => ({
    theadList: ["No", "제목", "공모 시작일", "공모 마감일", "작성자", "작성일"],
  }),
};
</script>

<style lang="scss" scoped>
@import "@index.scss";
th {
  &:nth-of-type(1) {
    width: 70px;
  }
  &:nth-of-type(2) {
    width: auto;
  }
  &:nth-of-type(3) {
    width: 120px;
  }
  &:nth-of-type(4) {
    width: 120px;
  }
  &:nth-of-type(5) {
    width: 120px;
  }
  &:nth-of-type(6) {
    width: 120px;
  }

  @media screen and (max-width: 900px) {
    &:nth-of-type(1) {
      width: 60px;
    }
    &:nth-of-type(3) {
      width: 100px;
    }
    &:nth-of-type(4) {
      width: 100px;
    }
    &:nth-of-type(5) {
      width: 90px;
    }
    &:nth-of-type(6) {
      width: 0;
      padding: 0;
      border-right: 0;
    }
  }
  @media screen and (max-width: 600px) {
    &:nth-of-type(5) {
      width: 0;
      padding: 0;
      border-right: 0;
      border-left: 0;
    }
  }
  @media screen and (max-width: 600px) {
    &:nth-of-type(3),
    &:nth-of-type(4) {
      width: 0;
      padding: 0;
      border-right: 0;
      border-left: 0;
    }
  }
}
</style>
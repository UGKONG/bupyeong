<template>
  <table>
    <thead>
      <tr>
        <th v-for="(item, idx) in theadList" :key="idx" v-text="item" />
      </tr>
    </thead>
    <tbody>
      <TextLi v-for="(item, i) in list" :key="i" :item="item" />
    </tbody>
  </table>
</template>

<script>
import TextLi from "@/components/PublicHearing/TextLi";
export default {
  components: {
    TextLi,
  },
  props: {
    list: Array,
  },
  data: () => ({
    theadList: ["이미지", "공청회 이름", "설명", "작성일"],
  }),
};
</script>

<style lang="scss" scoped>
@import "@index.scss";
th {
  transition: 0.2s;
  @include column-size((130px, 300px, auto, 140px));
  @media screen and (max-width: 900px) {
    @include column-size((130px, 200px, auto, 140px));
  }
  @media screen and (max-width: 800px) {
    @include column-size((130px, 200px, auto, 0));
    &:last-of-type {
      padding: 0 !important;
    }
  }
  @media screen and (max-width: 600px) {
    @include column-size((100px, 150px, auto, 0));
  }
  @media screen and (max-width: 500px) {
    @include column-size((0, 120px, auto, 0));
    &:first-of-type {
      padding: 0 !important;
    }
  }
}
</style>
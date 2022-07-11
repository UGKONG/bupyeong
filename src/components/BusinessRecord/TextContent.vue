<template>
  <table>
    <thead>
      <tr>
        <th v-for="(item, idx) in theadList" :key="idx" v-text="item" />
      </tr>
    </thead>
    <tbody>
      <RecordTextLi
        v-for="(item, idx) in list"
        :key="idx"
        :item="item"
        :idx="idx"
        :id="id"
      />
    </tbody>
  </table>
</template>

<script>
import RecordTextLi from "@/components/BusinessRecord/RecordTextLi";
export default {
  components: {
    RecordTextLi,
  },
  props: {
    list: Array,
    id: String,
  },
  data: () => ({
    theadList: ["No", "제목", "사업일", "작성자", "작성일"],
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
    width: 150px;
  }
  &:nth-of-type(4) {
    width: 120px;
  }
  &:nth-of-type(5) {
    width: 150px;
  }

  @media screen and (max-width: 900px) {
    &:nth-of-type(1) {
      width: 60px;
    }
    &:nth-of-type(2) {
      width: auto;
    }
    &:nth-of-type(3) {
      width: 100px;
    }
    &:nth-of-type(4) {
      width: 100px;
    }
    &:nth-of-type(5) {
      width: 100px;
    }
  }
  @media screen and (max-width: 700px) {
    &:nth-of-type(4) {
      width: 80px;
    }
    &:nth-of-type(5) {
      width: 0;
      padding: 0;
      border: 0;
    }
  }
  @media screen and (max-width: 500px) {
    &:nth-of-type(3),
    &:nth-of-type(4) {
      width: 0;
      padding: 0;
      border: 0;
    }
  }
}
</style>
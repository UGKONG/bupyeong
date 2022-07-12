<template>
  <li main>
    <h4 v-text="title" />
    <h5 v-text="item.subTitle" />
    <ul>
      <ResultAnswerLi
        v-for="(answer, answerIdx) in answerList"
        :id="id"
        :key="answerIdx"
        :item="answer"
        :idx="answerIdx"
        :all="item.allCount"
      />
    </ul>
  </li>
</template>

<script>
import ResultAnswerLi from "@/components/Survey/ResultAnswerLi";
export default {
  components: {
    ResultAnswerLi,
  },
  props: {
    id: String,
    idx: Number,
    item: Object,
    answerList: Array,
  },
  computed: {
    title() {
      let idx = this.idx + 1 + ". ";
      let count = this.item.title + " (총 응답수 : " + this.item.allCount + ")";
      return idx + count;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@index.scss";
li[main] {
  border: 1px solid $whiteGray;
  border-top: 2px solid $activeColor;
  margin-bottom: 10px;
  padding: 16px;

  h4 {
    font-weight: 500;
    font-size: 16px;
    margin-bottom: 6px;
  }
  h5 {
    font-weight: 400;
    font-size: 14px;
    margin-bottom: 14px;
    margin-left: 4px;
    color: $gray;
  }
}
</style>
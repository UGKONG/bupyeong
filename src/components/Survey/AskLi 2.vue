<template>
  <li main>
    <h4 v-text="title" />
    <h5 v-text="item.subTitle" />
    <ul>
      <AnswerLi
        v-for="(answer, answerIdx) in answerList"
        :key="answerIdx"
        :item="answer"
        :idx="answerIdx"
        :singleMulti="item.type"
      />
    </ul>
  </li>
</template>

<script>
import AnswerLi from "@/components/Survey/AnswerLi";
export default {
  components: {
    AnswerLi,
  },
  props: {
    idx: Number,
    item: Object,
    answerList: Array,
  },
  data: () => ({}),
  methods: {},
  computed: {
    title() {
      return this.idx + 1 + ". " + this.item.title;
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
<template>
  <li sub>
    <p v-if="contextAnswer" :style="listStyle">
      <span v-text="index" />
      <span v-text="text" />
      <span v-text="calcResult" />
    </p>
    <button v-if="stringResult" @click="listView">응답보기</button>
  </li>
</template>

<script>
export default {
  props: {
    id: String,
    idx: Number,
    item: Object,
    all: Number,
  },
  data: () => ({
    placeholder: "선택입력",
  }),
  methods: {
    listView() {
      let publicPath = "/Newdeal/Survey/";
      let path = publicPath + this.id + "/Result/" + this.item.answerSeq;
      this.$router.push({ path, params: { lang: "js" } });
    },
  },
  computed: {
    index() {
      return this.idx + 1 + ". ";
    },
    text() {
      return this.item.exam_item;
    },
    answerType() {
      return this.item.type;
    },
    contextAnswer() {
      return this.answerType != 3;
    },
    percentCalc() {
      let calc = (Number(this.item.answerCount) / Number(this.all)) * 100;
      return calc.toFixed(0) + "%";
    },
    calcResult() {
      return (
        "........ " + this.percentCalc + " (" + this.item.answerCount + "표)"
      );
    },
    listStyle() {
      return { display: this.answerType == 2 ? "inline-block" : "block" };
    },
    stringResult() {
      return this.answerType == 2 || this.answerType == 3;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@index.scss";
li[sub] {
  margin-left: 10px;
  margin-bottom: 5px;

  input[text] {
    width: 200px;
    height: 30px;
    margin-left: 2px;
    padding: 0 6px;
  }
  textarea {
    display: block;
    margin-top: 4px;
    width: calc(100% - 10px);
    height: 100px;
    resize: none;
    border: 1px solid $whiteGray;
    padding: 6px;
  }
}
</style>
<template>
  <li wrap>
    <h4>수강생 정보 : {{ studentInfo }}</h4>
    <div row>
      <div result-contents v-text="item.contents" />
    </div>
    <div row>
      <span :style="spanStyle">과제파일 첨부</span>
      <fileList :fileList="fileList" />
    </div>
    <div result>
      <h5>
        {{ isResult ? "평가결과" : "평가" }}
        <span>
          점수 :
          <input
            type="number"
            v-if="!isResult"
            ref="scoreInput"
            max="100"
            min="0"
          />
          <span ref="score" v-else v-text="score" />
          / 100점
        </span>
      </h5>
      <div v-text="item.resultContents" />
      <div>
        <textarea v-if="!isResult" ref="resultContents" />
      </div>
      <div btn v-if="!isResult">
        <button @click="submit">평 가</button>
      </div>
    </div>
  </li>
</template>

<script>
import fileList from "@admin/src/pageSubComponents/common/fileList";
import { useAlert, useSendValidation } from "../../../admin/src/hook";
export default {
  components: {
    fileList,
  },
  props: {
    item: Object,
  },
  data: () => ({
    score: 0,
  }),
  created() {
    this.scoreCheck();
  },
  methods: {
    submit() {
      let score = this.$refs.scoreInput;
      let contents = this.$refs.resultContents;
      let pass = useSendValidation([score, contents], () => {
        useAlert.warn("과제 평가", "모든 항목을 입력해주세요.");
      });
      if (!pass) return;

      if (Number(score.value) > 100)
        return useAlert.warn("과제 평가", "100점 이하로 입력해주세요.");
      if (Number(score.value) < 0)
        return useAlert.warn("과제 평가", "0점 이상으로 입력해주세요.");

      useAlert.success(
        "과제 평가",
        score.value + "점으로 평가가 완료되었습니다."
      );
      console.log({ score: score.value, contents: contents.value });
    },
    scoreCheck() {
      let resultScore = this.item.resultScore;
      let state = this.item.state;

      if (resultScore == 0 && state == 1) return (this.score = "미평가");
      this.score = resultScore;
    },
  },
  computed: {
    studentInfo() {
      return (
        this.$store.state.loginInfo.name +
        " / " +
        this.$store.state.loginInfo.phone
      );
    },
    spanStyle() {
      return {
        width: this.isResult == 0 ? "unset" : "100%",
      };
    },
    fileList() {
      let file = this.item.file;
      if (!file) return [];
      return [file];
    },
    isResult() {
      return this.item.state == 1 ? false : true;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@index.scss";
li[wrap] {
  border: 2px solid $activeColor !important;
  padding: 10px;
  margin-bottom: 20px;

  h4 {
    font-weight: 500;
    margin-bottom: 20px;
  }

  [row] {
    @include flex(flex-start);
    flex-wrap: wrap;
    padding: 6px 0;

    & > span {
      margin-right: 10px;
    }
  }

  [result] {
    margin-top: 10px;
    padding: 20px 5px 10px;
    border-top: 1px dashed $whiteGray;

    h5 {
      font-size: 16px;
      font-weight: 500;
      @include flex(space-between);
      margin-bottom: 10px;
    }
    input {
      width: 70px;
    }
  }

  [btn] {
    @include flex(flex-end);
    margin: 30px 0 0;
  }
}
</style>
<template>
  <li wrap :class="{ finish: isDateCut && yet }">
    <div finish v-if="isDateCut && yet">
      <span>과제가 마감되었습니다.</span>
    </div>
    <template v-if="!isDateCut || complete">
      <h4>수강생 정보 : {{ studentInfo }}</h4>
      <div row>
        <textarea
          v-if="yet"
          ref="contents"
          v-model="data.contents"
          placeholder="과제에 대한 설명을 적어주세요."
        />
        <div v-else result-contents v-text="data.contents" />
      </div>
      <div row>
        <span :style="spanStyle">과제파일 첨부</span>
        <input v-if="yet" type="file" ref="file" @change="fileChange" />
        <fileList v-else :fileList="fileList" :marginTop="10" />
      </div>
      <div btn v-if="yet">
        <button @click="submit">제 출</button>
      </div>
      <div result v-if="complete">
        <h5>
          평가결과
          <span>점수 : <span ref="score" v-text="score" /> / 100 점</span>
        </h5>
        <div v-text="data.resultContents" />
      </div>
    </template>
  </li>
</template>

<script>
import axios from "axios";
import { useAlert, useSendValidation } from "@hook";
import fileList from "@admin/src/pageSubComponents/common/fileList";
export default {
  components: {
    fileList,
  },
  props: {
    id: String,
    post: String,
    task: Object,
  },
  data: () => ({
    data: {},
    isDateCut: false,
    isResult: 0,
    fileList: [],
    score: 0,
  }),
  watch: {
    task(val) {
      this.dateCheck();
    },
  },
  created() {
    this.getMyTask();
  },
  methods: {
    submit() {
      let pass = useSendValidation([this.$refs.contents], () => {
        useAlert.warn("과제 제출", "설명과 파일을 모두 기입하세요.");
      });
      if (!pass) return;

      let cut = this.dateCheck();
      if (cut) return useAlert.success("과제 제출", "과제가 마감되었습니다.");

      useAlert.success("과제 제출", "과제가 제출되었습니다.");
      this.isResult = 1;
      this.score = "미평가";
      console.log(this.data);
    },
    getMyTask() {
      axios
        .get(
          this.$store.state.dbUrl +
            "/sendTaskList?processId=" +
            this.id +
            "&taskId=" +
            this.post +
            "&studentId=" +
            this.$store.state.loginInfo.id
        )
        .then(({ data }) => {
          let len = data.length;
          this.data = data[0] ?? {};
          this.fileList = data[0] ? [data[0].file] : [];
          this.isResult = len == 0 ? 0 : data[0].state;

          this.scoreCheck();
        });
    },
    dateCheck() {
      let end = new Date(this.task.endDTTM);
      let now = new Date();
      let calc = now - end;

      let result = calc > 0 ? true : false;
      this.isDateCut = result;
      return result;
    },
    fileChange(e) {
      let file = e.target.files[0];
      this.fileList = file ? [file] : [];
    },
    scoreCheck() {
      let resultScore = this.data.resultScore;
      let state = this.data.state;

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
    yet() {
      return this.isResult == 0;
    },
    over() {
      return this.isDateCut;
    },
    complete() {
      return this.isResult != 0;
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

  &.finish {
    border: 2px solid $gray !important;
  }
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

  [btn] {
    @include flex(flex-end);
    margin: 30px 0 0;
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
  }
}
[finish] {
  @include flex(center);
  @include wrap(flex);
  height: 100px;
  span {
    font-size: 20px;
    color: $gray;
  }
}
</style>
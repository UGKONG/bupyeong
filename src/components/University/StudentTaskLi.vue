<template>
  <li>
    <!-- <h4>수강생 정보 : {{ studentInfo }}</h4> -->

    <article task-info>
      <div wrap>
        <h3>
          {{ item.title }}
          <span>과제 마감일 : {{ item.endDTTM }} 까지</span>
        </h3>
        <div description>
          {{ item.contents }}
        </div>
        <div sub>
          <span>연결강의 : {{ item.className }}</span>
        </div>
        <fileList :fileList="fileList" :marginTop="20" />
      </div>
    </article>

    <article send-task-info>
      <h3>
        <span>
          <i :class="$store.state.FontAwesome.fill.pen" />
          제출 정보
        </span>
        <span no v-if="isSend && send.state == 1">미평가</span>
        <span yes v-if="isSend && send.state == 2">평가완료</span>
        <span yet v-if="!isSend">미제출</span>
      </h3>
      <template v-if="isSend">
        <div row>
          <div result-contents v-text="sendContents" />
        </div>
        <div row>
          <span>과제파일 첨부</span>
          <fileList :fileList="sendFileList" :marginTop="10" />
        </div>
        <div result v-if="complete">
          <h5>
            평가결과
            <span
              >점수 : <span ref="score" v-text="resultScore" /> / 100 점</span
            >
          </h5>
          <div v-text="resultContents" />
        </div>
      </template>
      <template v-else>
        <div row>제출 정보 없음</div>
      </template>
    </article>
  </li>
</template>

<script>
import fileList from "@admin/src/pageSubComponents/common/fileList";
export default {
  components: {
    fileList,
  },
  props: {
    item: Object,
    send: Object,
  },
  data: () => ({
    isResult: 1,
    score: 0,
  }),
  methods: {},
  computed: {
    isSend() {
      return !this.send ? false : true;
    },
    state() {
      if (this.complete) return "제출완료 + 평가완료";
      if (this.isSend && this.send.state == 1) return "제출완료 + 미평가";
      return "미제출";
    },
    fileList() {
      return [this.item.file];
    },
    sendFileList() {
      return this.isSend ? [this.send.file] : [];
    },
    complete() {
      return this.isSend && this.send.state == 2 ? true : false;
    },
    sendContents() {
      return this.isSend ? this.send.contents : "";
    },
    resultScore() {
      return this.isSend ? this.send.resultScore : 0;
    },
    resultContents() {
      return this.isSend ? this.send.resultContents : "";
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@index.scss";

[task-info] {
  border: 1px solid $whiteGray;
  border-top: 2px solid $activeColor;
  padding: 20px;

  & > [wrap] {
    @include wrap();

    & > h3 {
      @include flex(space-between);
      height: 30px;
      margin-bottom: 10px;

      span {
        font-size: 15px;
      }
    }

    & > [description] {
      width: 100%;
      height: calc(100% - 30px - 10px - 50px);
      @include text-overflow();
      white-space: unset;
    }

    & > [sub] {
      @include flex(space-between);
      height: 50px;
      padding-top: 20px;
    }
  }
}

[send-task-info] {
  padding: 20px;
  border: 1px solid $whiteGray;
  border-top: none;
  border-bottom: 2px solid $activeColor;
  margin-bottom: 20px;

  h3 {
    font-size: 16px;
    @include flex(space-between);
    span {
      font-size: 15px;
      &[no] {
        color: $orange;
      }
      &[yes] {
        color: $blue;
      }
      &[yet] {
        color: $red;
      }
    }
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
      font-size: 15px;
      font-weight: 500;
      @include flex(space-between);
      margin-bottom: 10px;
    }
  }
}
</style>
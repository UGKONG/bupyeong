<template>
  <li :class="{ cut: dateCutYN, yet: dateYetYN }">
    <!-- <h3 v-text="item.surveyTitle" /> -->
    <h3 v-text="'이용 만족도 조사'" />
    <article>
      <div>
        <span>설문기간 : {{ dateRange }}</span>
        <span v-if="!dateYetYN">응답수 : {{ item.answerCount }}명</span>
      </div>
      <div>
        <button v-if="answerViewYN && !dateYetYN" @click="resultView">
          결과보기
        </button>
        <button @click="positionView">위치보기</button>
        <button
          :disabled="dateCutYN"
          @click="surveyGo"
          v-if="!dateCutYN && !dateYetYN"
        >
          설문참여
        </button>
      </div>
    </article>
    <p class="dateCutYN" v-if="dateCutYN">마감된 설문입니다.</p>
    <p class="dateYetYN" v-if="dateYetYN">진행전 설문입니다.</p>
  </li>
</template>

<script>
export default {
  props: {
    item: Object,
    idx: Number,
  },
  methods: {
    resultView() {
      this.$router.push("/Newdeal/Survey/" + this.item?.surveySeq + "/Result");
    },
    positionView() {
      console.log(this.item?.gps);
    },
    surveyGo() {
      this.$router.push("/Newdeal/Survey/" + this.item?.surveySeq);
    },
  },
  computed: {
    dateRange() {
      return (
        this.item?.startDT.split(" ")[0] +
        " ~ " +
        this.item?.endDT.split(" ")[0]
      );
    },
    answerViewYN() {
      return this.item?.answerViewYN == 1 ? true : false;
    },
    dateCutYN() {
      let now = new Date();
      let endDT = new Date(this.item?.endDT);
      now = now.getTime();
      endDT = endDT?.getTime();
      return now < endDT ? false : true;
    },
    dateYetYN() {
      let now = new Date();
      let startDT = new Date(this.item?.startDT);
      now = now.getTime();
      startDT = startDT?.getTime();
      return startDT <= now ? false : true;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@index.scss";
li {
  padding: 10px;
  border: 1px solid $whiteGray;
  margin-bottom: 10px;
  position: relative;
  &:hover:not(&.cut, &.yet) {
    background-color: #efefef;
    article span {
      color: $black;
    }
  }

  article {
    @include flex(space-between);
    span {
      display: inline-block;
      margin-right: 20px;
      color: $gray;
    }
  }

  .dateCutYN,
  .dateYetYN {
    position: absolute;
    top: 10px;
    right: 10px;
    color: $red;
    font-weight: 500;
  }
}

@media screen and (max-width: 900px) {
  li article {
    flex-wrap: wrap;
    & > div {
      width: 100%;
      &:last-of-type {
        margin-top: 10px;
        @include flex(flex-end);
        & > button {
          white-space: nowrap;
          &:first-of-type {
            margin-left: 0 !important;
          }
        }
      }
    }
  }
}
@media screen and (max-width: 500px) {
  li article > div:last-of-type > button {
    flex: 1;
    padding: 6px 0 !important;
  }
}
</style>
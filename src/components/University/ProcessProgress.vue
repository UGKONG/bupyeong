<template>
  <div progress>
    <h3>
      <span>진행현황</span> <span>{{ percentCalc }}%</span>
    </h3>
    <div progress-wrap>
      <div progress>
        <div bar :style="{ width: percentCalc + '%' }" />
        <span dot start />
        <span dot end />
        <span dot today :style="{ left: percentCalc + '%' }">
          <div dot-wrap>
            <span>오늘</span>
          </div>
        </span>
        <span text start>{{ percentCalc >= 100 ? "시작" : "시작일" }}</span>
        <span text end>{{ percentCalc >= 100 ? "종료" : "종료일" }}</span>
        <p progress-bar />
      </div>
    </div>
    <button>
      <div :style="{ backgroundImage: 'url(' + processEndPrint + ')' }" />
      <span>수료증 발급</span>
    </button>
    <!-- <h3>
      진행현황 ({{ percentCalc }}%)
      <button v-if="isStudent && isFinish">수료증 발급</button>
    </h3>
    <div>
      <progress :max="dateTotal" :value="todayCalc" />
      <p>
        <span v-text="start + ' (시작일)'" />
        <span v-text="end + ' (종료일)'" />
      </p>
    </div> -->
  </div>
</template>

<script>
import processEndPrint from "@images/2/2/processEndPrint.png";
export default {
  props: {
    startDT: String,
    endDT: String,
    isStudent: Boolean,
  },
  data: () => ({
    processEndPrint,
  }),
  computed: {
    dateTotal() {
      let start = new Date(this.startDT);
      let end = new Date(this.endDT);
      let total = end - start;
      total = total / 1000 / 60 / 60 / 24;
      let result = Number(total);
      return result;
    },
    todayCalc() {
      let today = new Date();
      let start = new Date(this.startDT);
      let calc = today - start;
      calc = calc / 1000 / 60 / 60 / 24;
      let result = Number(calc >= this.dateTotal ? this.dateTotal : calc);
      return result;
    },
    percentCalc() {
      if (this.dateTotal === 0 || this.dateTotal < 0) return 0;
      if (this.todayCalc === 0 || this.todayCalc < 0) return 0;
      let calc = (this.todayCalc / this.dateTotal) * 100;
      if (calc <= 0) {
        return 0;
      }
      if (calc >= 100) {
        return 100;
      }
      return Math.round(calc);
    },
    start() {
      return this.startDT?.split(" ")[0];
    },
    end() {
      return this.endDT?.split(" ")[0];
    },
    isFinish() {
      return this.percentCalc >= 90 ? true : false;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@index.scss";

[progress] {
  @include flex(center);
  width: 100%;
  margin-bottom: 20px;
  border: 1px solid var(--whiteGray);
  background-color: #f9f9f9;

  h3 {
    @include flex(center, column);
    @include font(12px, 500, $activeColor);
    width: 300px;
    margin-bottom: 0;
  }
  [progress-wrap] {
    @include flex(center);
    @include size(100%, 20px);
    padding: 0 30px;
    padding-left: 0;
    [progress] {
      @include size(100%, 3px);
      background-color: #ddd;
      margin: 0;
      border: none;
      position: relative;
      & > [bar] {
        background-color: $activeColor;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
      }
      [dot] {
        @include size(12px, 12px);
        display: block;
        background-color: $activeColor;
        border: 2px solid #f9f9f9;
        border-radius: 10px;
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        &[start] {
          left: 0;
          transform: translateX(-50%) translateY(-50%);
        }
        &[end] {
          right: 0;
          transform: translateX(50%) translateY(-50%);
        }
        &[today] {
          background-color: $adminBtnColor;
          transform: translateX(-50%) translateY(-50%);
          left: 0;
          [dot-wrap] {
            @include wrap(block);
            span {
              @include font(12px, 500, $adminBtnColor);
              position: absolute;
              top: calc(100% + 5px);
              left: 50%;
              transform: translateX(-50%);
              white-space: nowrap;
            }
          }
        }
      }
      [text] {
        position: absolute;
        bottom: calc(100% + 5px);
        @include font(12px, 400, $activeColor);

        &[start] {
          left: 0;
          transform: translateX(-35%);
        }
        &[end] {
          right: 0;
          transform: translateX(35%);
        }
      }
    }
  }

  button {
    @include size(120px, 80px);
    @include flex(center, column);
    background-color: #f9f9f9;
    border-left: 1px solid $whiteGray;
    min-width: 120px;
    div {
      @include background-reset();
      width: 80%;
      height: 40%;
    }
    span {
      @include font(12px, 400, $gray);
      margin-top: 5px;
      padding-top: 3px;
    }
    &:hover {
      background-color: #eee !important;
      span {
        color: $darkGray;
      }
    }
    &:active {
      background-color: #ddd !important;
      span {
        color: $black;
      }
    }
  }
}

@media screen and (max-width: 499px) {
  h3 {
    width: 200px !important;
    margin-right: 10px !important;
  }
  button {
    width: 70px !important;
    min-width: 70px !important;
    span {
      line-height: 12px !important;
      font-size: 10px !important;
      white-space: nowrap !important;
    }
  }
}
</style>
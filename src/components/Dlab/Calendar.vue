<template>
  <section calendar>
    <div class="top">
      <p>
        <span v-for="(item, i) in positionList" :key="i">
          <input
            type="radio"
            name="position"
            v-model="selectPosition"
            :value="item.poSeq"
            :id="`position_${item.poSeq}`"
          />
          <label :for="`position_${item.poSeq}`" v-text="item.poName" />
        </span>
      </p>
      <h2>
        <button @click="prevMonth">
          <i class="fas fa-arrow-left" title="지난 달" />
        </button>
        <span>{{ selectDateView_ko }}</span>
        <button @click="nextMonth">
          <i class="fas fa-arrow-right" title="다음 달" />
        </button>
      </h2>
    </div>
    <div class="bottom">
      <ul dayList>
        <li v-for="(item, i) in dayList" :key="i" v-text="item" />
      </ul>
      <ul dateList>
        <li v-for="(item, i) in dateList" :key="i">
          <span num v-text="item.date" />
          <p v-if="item.date">예약률 : {{ item.percent }}%</p>
        </li>
      </ul>
    </div>

    <h3>TOTAL</h3>
    <ul graph>
      <li head>
        <div>
          <span v-for="(i, ii) in 6" :key="i">
            <span v-text="ii * 20" />
          </span>
        </div>
      </li>
      <li body v-for="(item, idx) in yearChartList" :key="idx">
        <div progress>
          <span v-for="i in 4" :key="i" />
          <div
            bar
            :style="{
              height: item.data + '%',
              backgroundColor:
                item.year == maxItem.year && item.month == maxItem.month
                  ? '#1b891b'
                  : item.year == minItem.year && item.month == minItem.month
                  ? '#ff4a4a'
                  : '',
            }"
          />
        </div>
        <p name>{{ idx + 1 }}월</p>
      </li>
    </ul>
  </section>
</template>

<script>
import axios from "axios";
import { useMonthSpan, useMaxArr, useMinxArr } from "@hook";

export default {
  data: () => ({
    dayList: ["일", "월", "화", "수", "목", "금", "토"],
    dateList: [],
    selectMonth: {},
    selectDate: "",
    positionList: [],
    selectPosition: 0,
    yearChartList: [],
    maxItem: {},
    minItem: {},
  }),
  created() {
    this.init();
    this.getPositionList();
  },
  methods: {
    init() {
      this.selectMonth = new Date();
      this.selectMonth.setDate(1);
      this.getDT();
    },
    getPositionList() {
      axios
        .get(this.$store.state.dbUrl + "/admin_dlabPositionList")
        .then(({ data }) => {
          this.positionList = data;
          this.selectPosition = data[0].poSeq;
        });
    },
    getYearChartList() {
      axios
        .get(this.$store.state.dbUrl2 + "/DlabYearChartList")
        .then(({ data }) => {
          this.yearChartList = data;
          this.maxItem = useMaxArr([...data], "data");
          this.minItem = useMinxArr([...data], "data");
        });
    },
    getDT() {
      let [startDT, endDT, today, startDay] = useMonthSpan(this.selectMonth);
      let lastDate = Number(endDT.split("-")[2]);
      let temp = [];

      for (let i = 0; i < 42; i++) {
        if (startDay > i || lastDate < i - startDay + 1) {
          temp.push({ date: null, percent: 0 });
        } else {
          temp.push({ date: i - startDay + 1, percent: 0 });
        }
      }

      this.dateList = temp;
      this.possibleDT();
      this.getYearChartList();
    },
    possibleDT() {
      axios
        .get(this.$store.state.dbUrl2 + "/DlabMonthChartList")
        .then(({ data }) => {
          this.possibleDateList = data;

          data.forEach((item) => {
            let i = this.dateList.findIndex((x) => x.date == item.date);
            if (i > -1) this.dateList[i].percent = item.percent;
          });
        });
    },
    prevMonth() {
      this.selectMonth.setMonth(this.selectMonth.getMonth() - 1);
      this.selectMonth = new Date(this.selectMonth);
      this.getDT();
    },
    nextMonth() {
      this.selectMonth.setMonth(this.selectMonth.getMonth() + 1);
      this.selectMonth = new Date(this.selectMonth);
      this.getDT();
    },
  },
  computed: {
    selectDateView() {
      let y = this.selectMonth.getFullYear();
      let m = this.selectMonth.getMonth() + 1;
      return y + "-" + (m < 10 ? "0" + m : m) + "-";
    },
    selectDateView_ko() {
      let y = this.selectMonth.getFullYear();
      let m = this.selectMonth.getMonth() + 1;
      return y + "년 " + (m < 10 ? "0" + m : m) + "월";
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@index.scss";

section[calendar] {
  padding: 0 10px 20px;
  min-height: 550px;
  height: 100%;
  .top {
    width: 100%;
    height: 80px;
    margin-bottom: 20px;
    position: relative;
    display: flex;
    align-items: flex-start;
    justify-content: center;

    h2 {
      @include font(24px, 500, #7e71df, 1px);
      text-shadow: 1px 1px 3px #c7c9f5;
      margin-bottom: 0;
      align-items: center !important;

      button {
        @include flex(center);
        background-color: transparent;
        font-size: 22px;
        padding: 0 14px !important;
        margin: 0;

        i,
        svg {
          padding: 0;
          cursor: pointer;
          color: #c7c9f5;
          text-shadow: 1px 1px 3px #c7c9f5;
        }
        &:hover {
          background-color: transparent;
          i,
          svg {
            color: #8489ea;
          }
        }
      }
    }

    p {
      position: absolute;
      left: 0;
      bottom: 6px;
      color: #888;
      font-weight: 400;

      & > span {
        @include flex(flex-start);
        display: inline-flex;
        margin-right: 10px;
        font-size: 15px;
        input {
          margin-right: 5px;
        }
      }
    }
  }
  .bottom {
    height: calc(100% - 80px);

    ul {
      overflow: auto;
      margin-bottom: 0;

      li {
        width: calc(100% / 7);
        float: left;
        position: relative;
      }

      &[dayList] {
        li {
          text-align: center;
          height: 30px;

          &:first-of-type {
            color: #ff5b5b;
          }
          &:last-of-type {
            color: #3d41eb;
          }
        }
      }

      $borderStyle: 1px solid #ddd;
      &[dateList] {
        border: $borderStyle;
        border-bottom: none;

        li {
          @include flex(center);
          border-right: $borderStyle;
          border-bottom: $borderStyle;
          height: 100px;
          padding: 6px 8px;
          color: #888;
          position: relative;
          cursor: default;

          &:nth-of-type(7n + 1) {
            color: #ff5b5b;
          }
          &:nth-of-type(7n) {
            border-right: 0;
            color: #3d41eb;
          }
          &:hover {
            font-weight: 500;
            [num] {
              &:hover {
                font-weight: 700;
              }
            }
          }

          span {
            position: absolute;
            top: 6px;
            left: 8px;
          }
          p {
            color: #999;
          }
          button {
            @include font(12px, 400, #555, 1px);
            padding: 4px 16px;
            background-color: #ddd;
          }
        }
      }
    }
  }
}

/* 그래프 */
$border: 1px solid $whiteGray;

h3 {
  margin-top: 30px;
  letter-spacing: 1px;
}
[graph] {
  @include flex(space-between);

  & > li {
    width: 100%;
    height: 200px;
    border-right: $border;

    &[head] {
      width: 40px;
      min-width: 40px;
      max-width: 40px;
      position: relative;

      div {
        position: relative;
        height: calc(100% - 30px);
        & > span {
          position: absolute;
          right: 0;
          color: $gray;
          @for $i from 1 through 6 {
            &:nth-of-type(#{$i}) {
              bottom: calc(($i * 20% - 20%) - 10px);
            }
          }
          & > span {
            @include wrap();
            padding-right: 10px;
            &::after {
              content: "";
              width: 6px;
              height: 1px;
              background-color: $whiteGray;
              position: absolute;
              top: 50%;
              right: 0;
              transform: translateY(-50%);
            }
          }
        }
      }
    }

    &[body] {
      position: relative;
      [progress] {
        position: relative;
        height: calc(100% - 30px);
        border-top: $border;
        border-bottom: $border;
        span {
          position: absolute;
          left: 0;
          width: 100%;
          height: 1px;
          background-color: $whiteGray;
          @for $i from 1 to 5 {
            &:nth-of-type(#{$i}) {
              top: 20% * $i;
            }
          }
        }
        [bar] {
          transition: 0.3s;
          width: 20%;
          position: absolute;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
          background-color: $blue;
        }
      }
      [name] {
        @include flex(center);
        height: 30px;
        border-bottom: $border;
      }
    }
  }
}
</style>
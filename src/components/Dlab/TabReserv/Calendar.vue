<template>
  <section calendar>
    <div class="top">
      <p>※ 예약 가능한 일자를 선택해주세요.</p>
      <h2>
        <button @click="prevMonth">
          <i class="fas fa-arrow-left" title="지난 달" />
        </button>
        <span v-text="selectDateView_ko" />
        <button @click="nextMonth">
          <i class="fas fa-arrow-right" title="다음 달" />
        </button>
      </h2>
    </div>
    <div class="bottom">
      <ul dayList>
        <li v-for="day in dayList" :key="day" v-text="day" />
      </ul>
      <ul dateList>
        <li v-for="(date, idx) in dateList" :key="idx">
          <span num>{{ date.date }}</span>
          <button
            v-if="date.date && date.state"
            @click="reservation(date.date)"
            v-text="'예약가능'"
          />
          <p v-if="date.date && !date.state" v-text="'예약불가'" />
        </li>
      </ul>
    </div>
  </section>
</template>

<script>
import axios from "axios";
import { useMonthSpan } from "@hook";

export default {
  props: {
    dateClick: {
      type: Function,
      default: function (date) {
        console.log(date);
      },
    },
  },
  data: () => ({
    dayList: ["일", "월", "화", "수", "목", "금", "토"],
    dateList: [],
    selectMonth: {},
    possibleDateList: [],
    selectDate: "",
    list: [],
  }),
  created() {
    this.init();
    this.getList();
  },
  methods: {
    getList() {
      axios
        .get(this.$store.state.dbUrl2 + "/DlabReservationList")
        .then(({ data }) => {
          this.list = data.reverse();
        });
    },
    init() {
      this.selectMonth = new Date();
      this.selectMonth.setDate(1);
      this.getDT();
    },
    getDT() {
      let [startDT, endDT, today, startDay] = useMonthSpan(this.selectMonth);
      let lastDate = Number(endDT.split("-")[2]);
      let temp = [];

      for (let i = 0; i < 42; i++) {
        if (startDay > i || lastDate < i - startDay + 1) {
          temp.push({ date: null, state: false });
        } else {
          temp.push({ date: i - startDay + 1, state: false });
        }
      }

      this.dateList = temp;
      this.possibleDT();
    },
    possibleDT() {
      this.possibleDateList = [
        1, 2, 3, 4, 5, 6, 7, 10, 11, 12, 13, 14, 20, 21, 22, 30, 31,
      ];

      this.possibleDateList.forEach((dt) => {
        let i = this.dateList.findIndex((x) => x.date == dt);
        if (i > -1) this.dateList[i].state = true;
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
    reservation(date) {
      let d = Number(date) < 10 ? "0" + date : date;
      this.selectDate = this.selectDateView + d;
      this.dateClick(this.selectDate);
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
$borderStyle: 1px solid #ddd;

section[calendar] {
  .top {
    @include flex(center);
    height: 60px;
    margin-bottom: 20px;
    position: relative;

    h2 {
      @include font(24px, 500, #7e71df);
      margin-bottom: 0;

      button {
        background-color: transparent;
        i {
          padding: 0 10px;
          color: #c7c9f5;
          text-shadow: 1px 1px 3px #c7c9f5;
        }
        &:hover {
          background-color: transparent;
          i {
            color: #8489ea;
          }
        }
      }
    }

    p {
      @include font(14px, 400, #888);
      position: absolute;
      left: 0;
      bottom: 6px;
    }
  }
  .bottom {
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

          &:nth-of-type(7n + 1) {
            color: #ff5b5b;
          }
          &:nth-of-type(7n) {
            border-right: 0;
            color: #3d41eb;
          }
          &:hover {
            font-weight: 500;
            background-color: #eee;
            button {
              background-color: #2ea215;
              color: #fff;
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
            transition: 0.1s;
          }
        }
      }
    }
  }
}
</style>
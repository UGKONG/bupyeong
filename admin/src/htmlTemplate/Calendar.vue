<template>
  <section calendar>
    <div class="top">
      <p>※ 예약 가능한 일자를 선택해주세요.</p>
      <h2>
        <i class="fas fa-arrow-left" title="지난 달" @click="prevMonth" />
        <span>{{ selectDateView_ko }}</span>
        <i class="fas fa-arrow-right" title="다음 달" @click="nextMonth" />
      </h2>
    </div>
    <div class="bottom">
      <ul dayList>
        <li v-for="day in dayList" :key="day" v-text="day" />
      </ul>
      <ul dateList>
        <li v-for="(date, idx) in dateList" :key="idx">
          <span num>{{ date.date }}</span>
          <button v-if="date.date && date.state" @click="reservation(date.date)">예약가능</button>
          <p v-if="date.date && !date.state">예약불가</p>
        </li>
      </ul>
    </div>
  </section>
</template>

<script>
export default {
  props: {
    dateClick: {
      type: Function,
      default: function(date){console.log(date)}
    },
  },
  data: () => ({
    dayList: ['일', '월', '화', '수', '목', '금', '토'],
    dateList: [],
    selectMonth: {},
    possibleDateList: [],
    selectDate: '',
  }),
  created () {
    this.init();
  },
  methods: {
    init() {
      this.selectMonth = new Date();
      this.selectMonth.setDate(1);
      this.getDT();
    },
    getDT() {
      let [startDT, endDT, today, startDay] = this.useMonthSpan(this.selectMonth);
      let lastDate = Number(endDT.split('-')[2]);
      let temp = [];

      for (let i = 0; i < 42; i++) {
        if (startDay > i || lastDate < i - startDay + 1) {
          temp.push({date: null, state: false});
        } else {
          temp.push({date: i - startDay + 1, state: false});
        }
      }

      this.dateList = temp;
      this.possibleDT();
    },
    possibleDT () {
      this.possibleDateList = [1,2,3,4,5,6,7,10,11,12,13,14,20,21,22,30,31];

      this.possibleDateList.forEach(dt => {
        let i = this.dateList.findIndex(x => x.date == dt);
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
    reservation (date) {
      let d = Number(date) < 10 ? '0' + date : date;
      this.selectDate = this.selectDateView + d;
      this.dateClick(this.selectDate);
    },
    useMonthSpan(dt = new Date()) {
      let TODAY = this.useDateFormat(dt);
      let date = new Date(dt);
      date.setDate(1);
      let START_DAY = date.getDay();
      let START_DT = this.useDateFormat(date);
      date.setMonth(date.getMonth() + 1);
      date.setDate(1);
      date.setDate(date.getDate() - 1);
      let END_DT = this.useDateFormat(date);

      return [START_DT, END_DT, TODAY, START_DAY];
    },
    useDateFormat(dt = new Date(), format = '-') {
      let date = new Date(dt);
      let _year = date.getFullYear();
      let _month = Number(date.getMonth() + 1) < 10 ? '0' + Number(date.getMonth() + 1) : Number(date.getMonth()) + 1;
      let _date = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
      return _year + format + _month + format + _date;
    }
  },
  computed: {
    selectDateView () {
      let y = this.selectMonth.getFullYear();
      let m = this.selectMonth.getMonth() + 1;
      return (y + '-' + (m < 10 ? '0' + m : m) + '-');
    },
    selectDateView_ko () {
      let y = this.selectMonth.getFullYear();
      let m = this.selectMonth.getMonth() + 1;
      return (y + '년 ' + (m < 10 ? '0' + m : m) + '월');
    },
  }
}
</script>

<style lang="scss" scoped>
section[calendar] {
  padding: 20px;
  min-height: 550px;
  height: 100%;
  .top {
    width: 100%;
    height: 60px;
    margin-bottom: 20px;
    position: relative;
    display: flex;
    align-items: flex-end;
    justify-content: center;

    h2 {
      font-size: 24px;
      font-weight: 500;
      color: #7e71df;
      text-shadow: 1px 1px 3px #c7c9f5;

      i {
        padding: 0 10px;
        cursor: pointer;
        color: #c7c9f5;
        text-shadow: 1px 1px 3px #c7c9f5;
        &:hover {
          color: #8489ea;
        }
      }
    }

    p {
      position: absolute;
      left: 0;
      bottom: 6px;
      color: #888;
      font-weight: 400;
    }
  }
  .bottom {
    width: 100%;
    height: calc(100% - 80px);

    ul {
      width: 100%;
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
        height: calc(100% - 30px);

        li {
          border-right: $borderStyle;
          border-bottom: $borderStyle;
          height: calc(100% / 6);
          padding: 6px 8px;
          color: #888;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;

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
            [num] {
              text-decoration: underline;
              cursor: pointer;
              &:hover {
                font-weight: 700;
              }
            }
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
            padding: 4px 16px;
            letter-spacing: 1px;
            font-size: 12px;
            background-color: #ddd;
            color: #555;
            font-weight: 400;
          }
        }
      }
    }
  }
}
</style>
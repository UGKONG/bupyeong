<template>
  <section class="sModal">
    <header>
      <article>
        <h1>
          <div class="icon" :style="{ backgroundImage: 'url(' + editIcon + ')' }" />
          <span>미디어 신청</span>
        </h1>
      </article>
      <article>
        <button @click="$emit('add-media-modal-close', false)">
          <span v-for="x in 2" :key="x" />
        </button>
      </article>
    </header>
    <article class="contents">
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
            <span>{{ date.date }}</span>
            <button v-if="date.date && date.state" @click="reservation(date.date)">예약가능</button>
            <p v-if="date.date && !date.state">예약불가</p>
          </li>
        </ul>
      </div>
      
    </article>

    <addScheduleInfoModal
      v-if="addScheduleInfoModalYN"
      :modalType="modalType"
      :selectDate="selectDate"
      @reservationClose="reservationClose"
      @allClose="allClose"
    />
  </section>
</template>

<script>
import editIcon from '../../img/icon/edit.png';
import { Store } from '../../store';
import { useFetch, useMonthSpan } from '../../hook';

export default {
  components: {
    addScheduleInfoModal: () => import('./addScheduleInfoModal'),
  },
  props: {
    modalType: String,
    selectMediaObj: Object,
  },
  data() {
    return {
      editIcon,
      dayList: ['일', '월', '화', '수', '목', '금', '토'],
      dateList: [],
      possibleDateList: [],
      selectMonth: {},
      selectDate: '',

      addScheduleInfoModalYN: false,
    }
  },
  created() {
    if (this.modalType == 'U') {
      this.addScheduleInfoModalYN = true;
    }

    this.selectMonth = new Date();
    this.selectMonth.setDate(1);
    this.getDT();
  },
  methods: {
    getDT () {
      let [startDT, endDT, today, startDay] = useMonthSpan(this.selectMonth);
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
    prevMonth () {
      this.selectMonth.setMonth(this.selectMonth.getMonth() - 1);
      this.selectMonth = new Date(this.selectMonth);
      this.getDT();
    },
    nextMonth () {
      this.selectMonth.setMonth(this.selectMonth.getMonth() + 1);
      this.selectMonth = new Date(this.selectMonth);
      this.getDT();
    },
    reservation (date) {
      let d = Number(date) < 10 ? '0' + date : date;
      this.selectDate = this.selectDateView + d;
      this.addScheduleInfoModalYN = true;
    },
    reservationClose() {
      this.addScheduleInfoModalYN = false;
    },
    allClose () {
      this.$emit('add-media-modal-close', false)
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
section.sModal {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border: 1px solid #aaa;
  width: calc(100% + 2px);
  height: calc(100% + 2px);
  background-color: #fff;
  z-index: 1800;
  overflow: hidden;
  user-select: none;
  box-shadow: 1px 2px 4px #00000050;

  .contents {
    padding: 20px;
  }

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
      color: #555;

      i {
        padding: 0 10px;
        cursor: pointer;
        color: #777;
        &:hover {
          color: #333;
        }
      }
    }

    p {
      position: absolute;
      left: 0;
      bottom: 6px;
      color: #777;
      font-weight: 500;
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

            button {
              background-color: #35ba18;
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
            padding: 5px 16px;
            letter-spacing: 1px;
            font-size: 13px;
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
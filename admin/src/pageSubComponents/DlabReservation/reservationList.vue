<template>
  <tr>
    <td v-text="idx + 1" />
    <td v-text="item.reservationName" />
    <td v-text="item.reservationPhone" />
    <td v-text="item.dlabPositionName" />
    <td v-text="item.reservationDT" />
    <td v-text="reservationTM" />
    <td :colspan="colspan" :style="stateStyle" v-text="requestStateView" />
    <td v-if="reservationYet">
      <div>
        <button @click="yes">수락</button>
        <button @click="no">거절</button>
      </div>
    </td>
  </tr>
</template>

<script>
import { useAlert } from '../../hook'
export default {
  props: {
    item: Object,
    idx: Number,
  },
  methods: {
    yes() {
      useAlert.success('예약 관리', this.item.reservationName + '님이 신청되었습니다.');
    },
    no() {
      useAlert.info('예약 관리', this.item.reservationName + '님이 거절되었습니다.');
    },
  },
  computed: {
    requestStateView() {
      let state = this.item.reservationState;
      if (state == 1) return '수락됨';
      if (state == 2) return '거절됨';
      return '신청중';
    },
    stateStyle () {
      let color = '';
      if (this.reservationYet) color = '#555';
      if (this.reservationYes) color = 'darkgreen';
      if (this.reservationNo) color = 'orangered';
      return { padding: '10px', color: color }
    },
    colspan () {
      return this.item.reservationState != 0 ? 2 : 1;
    },
    reservationTM () {
      return this.item.reservationStartTM + ' ~ ' + this.item.reservationEndTM
    },
    reservationYet () {
      return this.item.reservationState == 0;
    },
    reservationYes () {
      return this.item.reservationState == 1;
    },
    reservationNo () {
      return this.item.reservationState == 2;
    },
  }
}
</script>

<style lang="scss" scoped>
td {
  text-align: center !important;
  position: relative;
  padding: 8px 0;
  
  button {
    padding: 2px;
    background-color: transparent;
    box-shadow: none;
  }

  &:nth-of-type(3) button:hover {
    text-decoration: underline;
  }
  &:last-of-type {
    padding: 0;
  }
  &:last-of-type > div {
    width: 100%;
    height: 41px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 10px;
  }
  &:last-of-type button {
    width: 50%;
    height: 100%;
    padding: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    &:nth-of-type(1):hover {
      color: darkgreen;
      font-weight: 700;
    }
    &:nth-of-type(2):hover {
      color: orangered;
      font-weight: 700;
    }
  }

}
</style>
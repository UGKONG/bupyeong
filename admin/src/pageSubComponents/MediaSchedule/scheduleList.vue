<template>
  <tr>
    <td>
      <input type="checkbox" :id="'mediaChk_' + item.scheduleSeq" @click="mediaCheck" />
      <label :for="'mediaChk_' + item.scheduleSeq" />
    </td>
    <td @click="editMedia">{{ idx + 1 }}</td>
    <td @click="editMedia">{{ item.mediaTitle }}</td>
    <td @click="editMedia">{{ item.promotionDT }}</td>
    <td @click="editMedia" v-html="selectTime" />
    <!-- {{ selectTime }}</td> -->
    <td @click="editMedia">{{ playTypeView }}</td>
    <td @click="editMedia">{{ playAttrView }}</td>
    <td v-if="!staffYN" @click="editMedia">{{ stateView }}</td>
    <td v-if="staffYN">
      <select v-model="item.state" @change="stateChange">
        <option value="0">신청중</option>
        <option value="1">처리완료</option>
      </select>
    </td>
    <td @click="editMedia">{{ item.writeDT }}</td>
    <td @click="editMedia">{{ item.writerName }}</td>
    <td>
      <button @click="mediaPreview">미리보기</button>
    </td>
  </tr>
</template>

<script>
import { Store } from '../../store';
export default {
  props: {
    scheduleList: Array,
    item: Object,
    idx: Number,
    staffYN: Boolean,
    modalInDarkDivOpen: Function,
  },
  data() {
    return {

    }
  },
  methods: {
    mediaCheck(e) {
      let allCount = this.scheduleList.length;
      let els = document.querySelectorAll('[id^="mediaChk_"]:checked');
      this.$emit('setSelectCount', els.length);
      document.querySelector('#media-all-check').checked = allCount == els.length ? true : false;
    },
    editMedia() {
      if (!this.staffYN) {
        Store.setAlertYN(true);
        Store.setAlertInfo({
          icon: 'warn',
          title: '미디어 스케줄',
          text: '담당자만 열람이 가능합니다.'
        });
        return;
      }
      this.$emit('setModalType', 'U');
      this.$emit('setSelectMediaObj', this.item);
      this.$emit('setAddScheduleModalYN', true);
    },
    stateChange(e) {
      if (!this.staffYN) {
        Store.setAlertYN(true);
        Store.setAlertInfo({
          icon: 'warn',
          title: '미디어 스케줄 상태 변경',
          text: '담당자만 변경할 수 있습니다.'
        });
        e.preventDefault();
        return;
      }
    },
    mediaPreview() {
      this.modalInDarkDivOpen();
      this.$emit('setMediaPreviewYN', true, this.item.mediaURL, this.item.mediaTitle);
    }
  },
  computed: {
    playTypeView () {
      return this.item.playType == 'repeat' ? '반복 재생' : '한번만 재생';
    },
    playAttrView () {
      return this.item.playAttr == 'single' ? '단독 재생' : '동시 재생';
    },
    stateView () {
      return this.item.state == '0' ? '신청중' : '처리완료';
    },
    selectTime () {
      let timeArr = '';
      this.item.selectTime.forEach(obj => {
        timeArr += obj.time + '<br />';
      })
      return timeArr;
    }
  }
}
</script>

<style lang="scss" scoped>
tr {
  background-color: #fff;
  &:hover {
    background-color: #ddd;

    select {
      background-color: #ddd !important;
    }
  }
}
td {
  height: 34px;
  font-size: 15px;
  padding: 2px 10px;
  text-align: center;
  position: relative;
  cursor: pointer;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  
  &:nth-of-type(3) {
    text-align: left;
  }

  label {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  select {
    width: 100%;
    height: 100%;
    text-align: center;
    outline: none;
    background-color: transparent;
  }

  button {
    padding: 2px 5px;
    box-shadow: none;

    &:hover {
      border-bottom: 1px solid #888;
    }
  }
}
</style>
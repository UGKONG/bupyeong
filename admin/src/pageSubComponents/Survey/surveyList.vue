<template>
  <tr>
    <td>
      <input type="checkbox" :id="'surveyChk_' + item.surveySeq" @click="surveyCheck" />
      <label :for="'surveyChk_' + item.surveySeq" />
    </td>
    <td @click="editSurvey">{{ idx + 1 }}</td>
    <td @click="editSurvey">{{ item.surveyTitle }}</td>
    <td @click="editSurvey">{{ item.answerCount }}</td>
    <td @click="editSurvey">{{ item.startDT }} ~ {{ item.endDT }}</td>
    <td @click="editSurvey">{{ item.writerName }}</td>
    <td @click="editSurvey">{{ item.writeDT }}</td>
    <td><button class="v-btn" @click="resultView">{{ '결과보기' }}</button></td>
    <td><button class="v-btn" @click="positionView">{{ '위치보기' }}</button></td>
  </tr>
</template>

<script>
export default {
  props: {
    surveyList: Array,
    item: Object,
    idx: Number,
  },
  methods: {
    surveyCheck() {
      let allCount = this.surveyList.length;
      let els = document.querySelectorAll('[id^="surveyChk_"]:checked');
      this.$emit('setSelectCount', els.length);
      document.querySelector('#survey-all-check').checked = allCount == els.length ? true : false;
    },
    editSurvey() {
      this.$emit('setModalType', 'U');
      this.$emit('setSelectSurveySeq', this.item.surveySeq);
      this.$emit('setAddSurveyModalYN', true);
    },
    resultView() {
      if (e.target.className == 'btn') {
        window.open('', '', 'width=700, height=800');
        return;
      }
    },
    positionView() {
      if (e.target.className == 'btn') {
        window.open('', '', 'width=700, height=800');
        return;
      }
    },
  }
}
</script>

<style lang="scss" scoped>
tr {
  background-color: #fff;
  &:hover {
    background-color: #ddd;
  }
}
td {
  height: 34px;
  font-size: 15px;
  padding: 0 10px;
  text-align: center;
  position: relative;
  &:nth-of-type(3) {text-align: left;}
  cursor: pointer;
  label {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
  button {
    border: none;
    background-color: transparent;
    padding: 2px;
    font-size: 14px;
    &:hover {
      box-shadow: none;
      border-bottom: 1px solid #333;
    }
  }
}
</style>
<template>
  <tr>
    <td>
      <input type="checkbox" :id="'commChk_' + item.commSeq" @click="commCheck" />
      <label :for="'commChk_' + item.commSeq" />
    </td>
    <td @click="$emit('editModalOpen')">{{ idx + 1 }}</td>
    <td @click="$emit('editModalOpen')">{{ item.commTitle }}</td>
    <td @click="$emit('editModalOpen')">{{ item.commMasterName }}</td>
    <td @click="$emit('editModalOpen')">{{ item.commStartDT }}</td>
    <td><button @click="requestModalOpen">신청자 보기</button></td>
    <td><button @click="residentModalOpen">구성원 보기</button></td>
  </tr>
</template>

<script>
export default {
  props: {
    modalInDarkDivOpen: Function,
    commList: Array,
    item: Object,
    idx: Number,
  },
  methods: {
    commCheck(e) {
      let allCount = this.commList.length;
      let els = document.querySelectorAll('[id^="commChk_"]:checked');
      this.$emit('setSelectCount', els.length);
      document.querySelector('#comm-all-check').checked = allCount == els.length ? true : false;
    },
    requestModalOpen(e) {
      this.$emit('setSelectCommData', this.item);
      this.$emit('setRequestModalYN', true);
      this.modalInDarkDivOpen();
    },
    residentModalOpen(e) {
      this.$emit('setSelectCommData', this.item);
      this.$emit('setResidentModalYN', true);
      this.modalInDarkDivOpen();
    },
  },
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
  text-align: center;
  position: relative;
  cursor: pointer;
  &:nth-of-type(3) {
    text-align: left; 
    padding: 0 10px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  &:nth-of-type(10) {padding: 0 6px;}
  &:nth-of-type(11) {padding: 0 6px;}
  label {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
  button {
    font-size: 13.3px;
    background-color: transparent;
    padding: 1px 2px;
    white-space: nowrap;
    &:hover {
      box-shadow: none;
      border-bottom: 1px solid #333;
    }
  }
}
</style>
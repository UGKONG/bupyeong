<template>
  <tr>
    <td>
      <input type="checkbox" :id="'processChk_' + item.CRS_SN" @click="processCheck" />
      <label :for="'processChk_' + item.CRS_SN" />
    </td>
    <td @click="editProcess">{{ idx + 1 }}</td>
    <td @click="editProcess">{{ item.CRS_NM }}</td>
    <td @click="editProcess">{{ item.CRS_MNGR_NM }}</td>
    <td @click="editProcess">{{ item.CRS_STDNT_NOPE }}명 / {{ item.CRS_STDNT_MNPE }}명</td>
    <td @click="editProcess">{{ item.CRS_RCRT_BGNG_DT.split(' ')[0] }}</td>
    <td @click="editProcess">{{ item.CRS_RCRT_END_DT.split(' ')[0] }}</td>
    <td @click="editProcess">{{ item.CRS_BGNG_DT.split(' ')[0] }}</td>
    <td @click="editProcess">{{ item.CRS_END_DT.split(' ')[0] }}</td>
    <td><button @click="requestModalOpen">신청자 리스트</button></td>
    <td><button @click="recruitmentModalOpen">모집요강 등록</button></td>
  </tr>
</template>

<script>
export default {
  props: {
    modalInDarkDivOpen: Function,
    processList: Array,
    item: Object,
    idx: Number,
  },
  methods: {
    processCheck(e) {
      let allCount = this.processList.length;
      let els = document.querySelectorAll('[id^="processChk_"]:checked');
      this.$emit('setSelectCount', els.length);
      document.querySelector('#process-all-check').checked = allCount == els.length ? true : false;
    },
    editProcess(e) {
      this.$emit('setModalType', 'U');
      this.$emit('setSelectProcessSeq', this.item.CRS_SN);
      this.$emit('setSelectProcessData', this.item);
      this.$emit('setAddProcessModalYN', true);
    },
    requestModalOpen(e) {
      this.$emit('setSelectProcessSeq', this.item.CRS_SN);
      this.$emit('setSelectProcessData', this.item);
      this.$emit('setRequestModalYN', true);
      this.modalInDarkDivOpen();
    },
    recruitmentModalOpen(e) {
      this.$emit('setSelectProcessSeq', this.item.CRS_SN);
      this.$emit('setSelectProcessData', this.item);
      this.$emit('setRecruitmentModalYN', true);
      this.modalInDarkDivOpen();
    },
  },
  computed: {

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
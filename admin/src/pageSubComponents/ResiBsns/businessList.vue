<template>
  <tr>
    <td>
      <input type="checkbox" :id="'resiBsnsChk_' + item.resiBsnsSeq" @click="resiBsnsCheck" />
      <label :for="'resiBsnsChk_' + item.resiBsnsSeq" />
    </td>
    <td @click="editResiBsns">{{ idx + 1 }}</td>
    <td @click="editResiBsns">{{ item.title }}</td>
    <td @click="editResiBsns">{{ item.writerName }}</td>
    <td @click="editResiBsns">{{ item.writeDT }}</td>
    <td><button @click="resiBsnsRequestModalOpen">신청자 보기</button></td>
    <td><button @click="positionView">위치 보기</button></td>
  </tr>
</template>

<script>
export default {
  props: {
    modalInDarkDivOpen: Function,
    resiBsnsList: Array,
    item: Object,
    idx: Number,
  },
  methods: {
    resiBsnsCheck() {
      let allCount = this.resiBsnsList.length;
      let els = document.querySelectorAll('[id^="resiBsnsChk_"]:checked');
      this.$emit('setSelectCount', els.length);
      document.querySelector('#resiBsns-all-check').checked = allCount == els.length ? true : false;
    },
    editResiBsns() {
      this.$emit('setModalType', 'U');
      this.$emit('setSelectResiBsnsData', this.item);
      this.$emit('setAddResiBsnsModalYN', true);
    },
    resiBsnsRequestModalOpen() {
      this.$emit('setSelectResiBsnsData', this.item);
      this.$emit('setResiBsnsRequestModalYN', true);
      this.modalInDarkDivOpen();
    },
    positionView() {
      let position = this.item.position;
      console.log(position);
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
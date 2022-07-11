<template>
  <tr>
    <td>
      <input type="checkbox" :id="'recordChk_' + item.recordSeq" @click="recordCheck" />
      <label :for="'recordChk_' + item.recordSeq" />
    </td>
    <td @click="recordDetailView">{{ idx + 1 }}</td>
    <td @click="recordDetailView">{{ item.title }}</td>
    <td @click="recordDetailView">{{ item.writerName }}</td>
    <td @click="recordDetailView">{{ item.writeDT }}</td>
  </tr>
</template>

<script>
export default {
  props: {
    recordList: Array,
    item: Object,
    idx: Number,
  },
  methods: {
    recordCheck() {
      let allCount = this.recordList.length;
      let els = document.querySelectorAll('[id^="recordChk_"]:checked');
      this.$emit('setSelectCount', els.length);
      document.querySelector('#record-all-check').checked = allCount == els.length ? true : false;
    },
    recordDetailView() {
      this.$emit('setSelectRecordData', this.item);
      this.$emit('setModalType', 'U');
      this.$emit('setAddRecordModalYN', true);
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
  &:nth-of-type(3) {
    text-align: left;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  cursor: pointer;
  label {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
}
</style>
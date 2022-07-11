<template>
  <tr>
    <td>
      <input type="checkbox" :id="'businessChk_' + item.businessSeq" @click="businessCheck" />
      <label :for="'businessChk_' + item.businessSeq" />
    </td>
    <td @click="recordListView">{{ idx + 1 }}</td>
    <td @click="recordListView">{{ item.title }}</td>
    <td @click="recordListView">{{ item.writerName }}</td>
    <td @click="recordListView">{{ item.writeDT }}</td>
  </tr>
</template>

<script>
export default {
  props: {
    recordListModalOpen: Function,
    businessList: Array,
    item: Object,
    idx: Number,
  },
  methods: {
    businessCheck() {
      let allCount = this.businessList.length;
      let els = document.querySelectorAll('[id^="businessChk_"]:checked');
      this.$emit('setSelectCount', els.length);
      document.querySelector('#business-all-check').checked = allCount == els.length ? true : false;
    },
    recordListView() {
      this.$emit('setSelectBusinessData', this.item);
      this.recordListModalOpen(true);
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
}
</style>
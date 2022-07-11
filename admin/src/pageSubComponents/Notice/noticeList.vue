<template>
  <tr>
    <td>
      <input type="checkbox" :id="'noticeChk_' + item.NTC_SN" @click="noticeCheck" />
      <label :for="'noticeChk_' + item.NTC_SN" />
    </td>
    <td @click="editNotice">{{ idx + 1 }}</td>
    <td @click="editNotice">{{ item.NTC_CTGR_NM }}</td>
    <td @click="editNotice">{{ item.NTC_TITLE }}</td>
    <td @click="editNotice">{{ item.WRTR_NM }}</td>
    <td @click="editNotice">{{ item.CRT_DT.split(' ')[0] }}</td>
  </tr>
</template>

<script>
export default {
  props: {
    noticeList: Array,
    item: Object,
    idx: Number,
  },
  data() {
    return {

    }
  },
  methods: {
    noticeCheck(e) {
      let allCount = this.noticeList.length;
      let els = document.querySelectorAll('[id^="noticeChk_"]:checked');
      this.$emit('setSelectCount', els.length);
      document.querySelector('#notice-all-check').checked = allCount == els.length ? true : false;
    },
    editNotice() {
      let seq = this.item.NTC_SN;
      this.$emit('setModalType', 'U');
      this.$emit('setSelectNoticeSeq', seq);
      this.$emit('setAddNoticeModalYN', true);
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
  padding: 0 10px;
  text-align: center;
  position: relative;
  &:nth-of-type(4) {text-align: left;}
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
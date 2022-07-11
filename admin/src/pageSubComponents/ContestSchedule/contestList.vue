<template>
  <tr>
    <td>
      <input type="checkbox" :id="'contestChk_' + item.contestSeq" @click="contestCheck" />
      <label :for="'contestChk_' + item.contestSeq" />
    </td>
    <td @click="editContest">{{ idx + 1 }}</td>
    <td @click="editContest">{{ item.title }}</td>
    <td @click="editContest">{{ item.startDT }}</td>
    <td @click="editContest">{{ item.endDT }}</td>
    <td @click="editContest">{{ item.writerName }}</td>
    <td @click="editContest">{{ item.writeDT }}</td>
    <td>
      <button v-if="item.imgName != ''" @click="contestImageClick">
        <i class="far fa-file-image" />
      </button>
    </td>
  </tr>
</template>

<script>
export default {
  props: {
    contestList: Array,
    item: Object,
    idx: Number,
  },
  data() {
    return {

    }
  },
  methods: {
    contestCheck(e) {
      let allCount = this.contestList.length;
      let els = document.querySelectorAll('[id^="contestChk_"]:checked');
      this.$emit('setSelectCount', els.length);
      document.querySelector('#contest-all-check').checked = allCount == els.length ? true : false;
    },
    editContest() {
      this.$emit('setModalType', 'U');
      this.$emit('setSelectContestObj', this.item);
      this.$emit('setAddContestModalYN', true);
    },
    contestImageClick() {
      let path = this.item.imgPath;
      let name = this.item.imgName;
      
      let a = document.createElement('a');
          a.setAttribute('href', path + name);
          a.setAttribute('target', '_blank');
          a.click();
          a.remove();
    }
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
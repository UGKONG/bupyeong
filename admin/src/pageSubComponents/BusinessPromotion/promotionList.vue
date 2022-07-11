<template>
  <tr>
    <td>
      <input type="checkbox" :id="'proChk_' + item.proSeq" @click="proCheck" />
      <label :for="'proChk_' + item.proSeq" />
    </td>
    <td @click="editPro">{{ idx + 1 }}</td>
    <td @click="editPro">{{ item.proCategoryName }}</td>
    <td @click="editPro">{{ item.proTitle }}</td>
    <td @click="editPro">{{ item.proStartDT }}</td>
    <td @click="editPro">{{ item.proEndDT }}</td>
    <td @click="editPro">{{ item.writerName }}</td>
    <td @click="editPro">{{ item.writeDT }}</td>
    <td>
      <button title="URL 이동" @click="linkURL">
        <i class="fas fa-external-link-alt"></i>
      </button>
      <button title="홍보물 인쇄" @click="promotionPrint">
        <i class="fas fa-print"></i>
      </button>
    </td>
  </tr>
</template>

<script>
export default {
  props: {
    promotionList: Array,
    item: Object,
    idx: Number,
  },
  methods: {
    proCheck(e) {
      let allCount = this.promotionList.length;
      let els = document.querySelectorAll('[id^="proChk_"]:checked');
      this.$emit('setSelectCount', els.length);
      document.querySelector('#pro-all-check').checked = allCount == els.length ? true : false;
    },
    editPro() {
      this.$emit('setModalType', 'U');
      this.$emit('setSelectProObj', this.item);
      this.$emit('setAddProModalYN', true);
    },
    linkURL() {
      let a = document.createElement('a');
          a.setAttribute('target', '_blank');
          a.setAttribute('href', this.item.URL);
          a.click();
          a.remove();
    },
    promotionPrint() {
      let imgURL = this.item.imgURL;
      let popup = window.open(imgURL, '부평 홍보물 인쇄창', 'width=600, height=840');
      popup.focus();
      window.setTimeout(() => popup.print());
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
  button {
    display: inline-flex;
    padding: 6px;
    justify-content: space-between;
    align-items: center;
  }
}
</style>
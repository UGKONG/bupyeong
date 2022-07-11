<template>
  <tr>
    <td>
      <input type="checkbox" :id="'phChk_' + item.phSeq" @click="phCheck" />
      <label :for="'phChk_' + item.phSeq" />
    </td>
    <td @click="mediaListView">{{ idx + 1 }}</td>
    <td @click="mediaListView">{{ item.phTitle }}</td>
    <td @click="mediaListView">{{ item.phTitleImageName }}</td>
    <td @click="mediaListView">{{ item.writeDT }}</td>
    <td @click="mediaListView">{{ item.writerName }}</td>
    <td>
      <div>
        <button @click="edit">수정</button>
        <button @click="imgView">대표 이미지</button>
        <button @click="positionView">위치</button>
      </div>
    </td>
  </tr>
</template>

<script>
export default {
  props: {
    list: Array,
    item: Object,
    idx: Number,
    modalInDarkDivOpen: Function
  },
  methods: {
    edit() {
      this.$emit('setSelectPhObj', this.item);
      this.$emit('addPhModalOpen', true, false);
    },
    phCheck() {
      let allCount = this.list.length;
      let els = document.querySelectorAll('[id^="phChk_"]:checked');
      this.$emit('setSelectCount', els.length);
      document.querySelector('#ph-all-check').checked = allCount == els.length ? true : false;
    },
    mediaListView() {
      this.$emit('setSelectPhObj', this.item);
      this.$emit('mediaListModalOpen', true);
    },
    imgView () {
      this.modalInDarkDivOpen();
      this.$emit('setImgPreviewYN', true);
      this.$emit('setImgPreviewTitle', this.item.phTitle);
      this.$emit('setImgPreviewURL', this.item.phTitleImageURL);
    },
    positionView () {
      console.log(this.position);
    },
  },
  computed: {
    position () {
      return this.item.phPosition;
    }
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
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
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
    padding: 2px 4px;
    margin: 0 2px;
    box-shadow: none;

    &:hover {
      border-bottom: 1px solid #888;
    }
  }
}
</style>
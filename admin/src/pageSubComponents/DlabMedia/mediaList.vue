<template>
  <tr>
    <td>
      <input type="checkbox" :id="'mediaChk_' + item.mediaSeq" @click="mediaCheck" />
      <label :for="'mediaChk_' + item.mediaSeq" />
    </td>
    <td @click="editMedia">{{ idx + 1 }}</td>
    <td @click="editMedia">{{ item.mediaTitle }}</td>
    <td @click="editMedia">{{ item.mediaFileName }}</td>
    <td @click="editMedia">{{ item.mediaType }}</td>
    <td @click="editMedia">{{ fileSizeView }}</td>
    <td @click="editMedia">{{ item.writeDT }}</td>
    <td @click="editMedia">{{ item.writerName }}</td>
    <td>
      <button @click="mediaPreview">미리보기</button>
    </td>
  </tr>
</template>

<script>
import { useFileSize } from '../../hook';
import { Store } from '../../store';
export default {
  props: {
    mediaList: Array,
    item: Object,
    idx: Number,
    modalInDarkDivOpen: Function,
  },
  data() {
    return {

    }
  },
  methods: {
    mediaCheck(e) {
      let allCount = this.mediaList.length;
      let els = document.querySelectorAll('[id^="mediaChk_"]:checked');
      this.$emit('setSelectCount', els.length);
      document.querySelector('#media-all-check').checked = allCount == els.length ? true : false;
    },
    editMedia() {
      this.$emit('setModalType', 'U');
      this.$emit('setSelectMediaObj', this.item);
      this.$emit('setAddMediaModalYN', true);
      this.modalInDarkDivOpen();
    },
    mediaPreview() {
      this.modalInDarkDivOpen();
      this.$emit('setMediaPreviewYN', true, this.item.mediaURL, this.item.mediaTitle);
    }
  },
  computed: {
    fileSizeView () {
      return useFileSize(this.item.mediaFileSize);
    }
  }
}
</script>

<style lang="scss" scoped>
tr {
  background-color: #fff;
  &:hover {
    background-color: #ddd;

    select {
      background-color: #ddd !important;
    }
  }
}
td {
  height: 34px;
  font-size: 15px;
  padding: 2px 10px;
  text-align: center;
  position: relative;
  cursor: pointer;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  
  &:nth-of-type(3) {
    text-align: left;
  }

  label {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  select {
    width: 100%;
    height: 100%;
    text-align: center;
    outline: none;
    background-color: transparent;
  }

  button {
    padding: 2px 5px;
    box-shadow: none;

    &:hover {
      border-bottom: 1px solid #888;
    }
  }
}
</style>
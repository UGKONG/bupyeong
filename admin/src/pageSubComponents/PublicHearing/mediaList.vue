<template>
  <tr>
    <td>
      <input type="checkbox" :id="'mediaChk_' + item.mediaSeq" @click="recordCheck" />
      <label :for="'mediaChk_' + item.mediaSeq" />
    </td>
    <td>{{ idx + 1 }}</td>
    <td>{{ item.mediaTitle }}</td>
    <td>{{ item.mediaFileName }}</td>
    <td>{{ fileSize }}</td>
    <td>{{ item.writeDT }}</td>
    <td>{{ item.writerName }}</td>
    <td>
      <div>
        <button @click="mediaPreview">미디어 보기</button>
      </div>
    </td>
  </tr>
</template>

<script>
import { useFileSize } from '../../hook';
export default {
  props: {
    list: Array,
    item: Object,
    idx: Number,
    modalInDarkDivOpen: Function
  },
  methods: {
    recordCheck () {
      let allCount = this.list.length;
      let els = document.querySelectorAll('[id^="mediaChk_"]:checked');
      this.$emit('setSelectCount', els.length);
      document.querySelector('#media-all-check').checked = allCount == els.length ? true : false;
    },
    mediaPreview () {
      this.$emit('setMediaPreviewYN', true);
      this.$emit('setMediaPreviewTitle', this.item.mediaTitle);
      this.$emit('setMediaPreviewURL', this.item.mediaFileURL);
    }
  },
  computed: {
    fileSize () {
      return useFileSize(this.item.mediaFileSize);
    }
  }
}
</script>

<style lang="scss" scoped>
/* tr {
  background-color: #fff;
  cursor: pointer;
  &:hover {
    background-color: #ddd;
  }
} */
td {
  height: 34px;
  font-size: 15px;
  padding: 0 10px;
  text-align: center;
  position: relative;
  white-space: nowrap;
  &:nth-of-type(3) {
    text-align: left;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  label {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
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
<template>
  <section class="sModal">
    <header>
      <article>
        <h1>
          <div class="icon" :style="{ backgroundImage: 'url(' + editIcon + ')' }" />
          <span>공청회 등록</span>
        </h1>
      </article>
      <article>
        <button @click="$emit('addPhModalOpen', false)">
          <span v-for="x in 2" :key="x" />
        </button>
        <button class="saveBtn" @click="save">
          <i class="far fa-save" />등 록
        </button>
      </article>
    </header>
    <article class="contents">
      <div>
        <label class="require" for="title">공청회 제목 :</label>
        <input id="title" ref="title" v-model="sendData.phTitle" />
      </div>
      <div>
        <label class="require">대표 이미지 :</label>
        <input type="file" id="mediaFile" style="display: none;" @change="fileChange">
        <label for="mediaFile">대표이미지 첨부</label>
        <span>{{ sendFileInfo }}</span>
      </div>
      <div class="description">
        <label class="require" for="description">공청회 설명</label>
        <textarea id="description" ref="description" v-model="sendData.phContents" />
      </div>
      <uploadFiles :fileList="sendFileList" @setFileList="setSendFileList" />
      <div>
        작성자: {{ '관리자' }}
      </div>
    </article>
  </section>
</template>

<script>
import editIcon from '../../img/icon/edit.png';
import { useAlert, useFileSize, useSendValidation } from '../../hook';
import uploadFiles from '../common/uploadFiles';
import axios from 'axios';
import { Store } from '@/store';

export default {
  components: {
    uploadFiles
  },
  props: {
    selectPhObj: Object,
  },
  data() {
    return {
      editIcon,
      sendData: {},
      sendFile: {},
      sendFileInfo: '',
      sendFileList: [],
    }
  },
  created () {

    if (!this.selectPhObj.phSeq) {
      this.sendData = {
        phSeq: 0,
        phTitle: '',
        phContents: '',
      }
      this.sendFile = {};
      this.sendFileInfo = '';
      this.sendFileList = [];
      return;
    }

    axios.get(Store.globalURL + 'admin_phData').then(
      ({data}) => {
        this.sendData = data;
        let fileName = data.phTitleImageName;
        let fileSize = data.phTitleImageSize;
        this.sendFileInfo = fileName == '' ? '' : (
          '[파일명: ' + fileName + ' / 용량: ' + useFileSize(fileSize) + ']'
        );
        this.sendFileList = data.fileList;
      }
    );
  },
  methods: {
    setSendFileList(val) {
      this.sendFileList = val;
    },
    save () {
      let pass = useSendValidation([
        this.$refs.title,
        this.$refs.description,
        this.sendFileInfo
      ], () => {
        useAlert.warn('공청회 등록', '공청회 제목 또는 대표이미지 파일을 첨부해주세요.');
        return;
      });
      if (!pass) return;

      console.log(this.sendData);
      console.log(this.sendFile);
      console.log(this.sendFileList);
      
      useAlert.success('공청회 등록', '등록되었습니다.');
      this.$emit('addPhModalOpen', false, true);
    },
    fileChange(e) {
      let file = e.target.files[0];
      if (!file) {
        this.sendFileInfo = '';
        return;
      }
      this.sendFile = file;
      this.sendFileInfo = '[파일명: ' + file.name + ' / 용량: ' + useFileSize(file.size) + ']';

    }
  },
  computed: {

  }
}
</script>

<style lang="scss" scoped>
section.sModal {
  position: fixed;
  top: 50px;
  left: 50%;
  transform: translateX(-50%);
  border: 1px solid #aaa;
  width: 800px;
  /* height: 240px; */
  background-color: #fff;
  z-index: 1800;
  overflow: hidden;
  user-select: none;
  box-shadow: 1px 2px 4px #00000050;

  .contents {
    padding: 20px;

    & > div {
      margin-bottom: 20px;

      label {
        font-size: 15px;
        width: 94px;
      }
      input#title {
        width: calc(100% - 100px);
        border: 1px solid #ccc;
        height: 30px;
        padding: 0 5px;
      }

      input[type="file"] + label {
        width: 114px;
        height: 28px;
        background-color: #aaa;
        color: #fff;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        font-size: 13px;
        letter-spacing: 1px;
        cursor: pointer;
        margin-right: 10px;
        padding: 0;
      }

      [for="description"] {
        padding-bottom: 10px;
      }

      textarea {
        width: 100%;
        border: 1px solid #ccc;
        resize: none;
        padding: 10px;
        height: 200px;
      }

    }

  }
}
</style>
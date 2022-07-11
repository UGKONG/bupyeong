<template>
  <section class="sModal">
    <header>
      <article>
        <h1>
          <div class="icon" :style="{ backgroundImage: 'url(' + editIcon + ')' }" />
          <span>공식 미디어 등록</span>
        </h1>
      </article>
      <article>
        <button @click="$emit('addMediaModalOpen', false)">
          <span v-for="x in 2" :key="x" />
        </button>
        <button class="saveBtn" @click="save">
          <i class="far fa-save" />등 록
        </button>
      </article>
    </header>
    <article class="contents">
      <div>
        <label for="title">미디어 제목 :</label>
        <input id="title" ref="title" v-model="sendData.title" />
      </div>
      <div>
        <input type="file" id="mediaFile" style="display: none;" @change="fileChange">
        <label for="mediaFile">공식 미디어파일 첨부</label>
        <span>{{ sendFileInfo }}</span>
      </div>
      <div style="padding-top: 20px;">
        작성자: {{ '관리자' }}
      </div>
    </article>
  </section>
</template>

<script>
import editIcon from '../../img/icon/edit.png';
import { Store } from '../../store';
import { useFetch, useRest, useAlert, useFileSize, useSendValidation } from '../../hook';

export default {
  data() {
    return {
      editIcon,
      sendData: {},
      sendFile: {},
      sendFileInfo: '',
    }
  },
  created () {
    this.sendData = {
      seq: 0,
      title: ''
    }
  },
  methods: {
    save () {
      let pass = useSendValidation([
        this.$refs.title,
        this.sendFileInfo
      ], () => {
        useAlert.warn('공청회 등록', '공청회 제목 또는 대표이미지 파일을 첨부해주세요.');
        return;
      });
      if (!pass) return;

      console.log(this.sendData);
      console.log(this.sendFile);
      
      useAlert.success('공청회 등록', '등록되었습니다.');
      this.$emit('addMediaModalOpen', false)
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
  top: 50px !important;
  left: 50%;
  transform: translateX(-50%) !important;
  border: 1px solid #aaa;
  width: 600px !important;
  height: 240px !important;
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
        width: 142px;
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


    }

  }
}
</style>
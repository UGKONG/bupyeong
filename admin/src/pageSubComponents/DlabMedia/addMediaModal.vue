<template>
  <section class="sModal">
    <header>
      <article>
        <h1>
          <div class="icon" :style="{ backgroundImage: 'url(' + editIcon + ')' }" />
          <span>공식 미디어 {{ modalTypeTitle }}</span>
        </h1>
      </article>
      <article>
        <button @click="$emit('add-media-modal-close', false)">
          <span v-for="x in 2" :key="x" />
        </button>
        <button class="saveBtn" @click="save">
          <i class="far fa-save" />{{ modalTypeSaveBtn }}
        </button>
      </article>
    </header>
    <article class="contents">
      <div>
        <label for="mediaTitle">제 목 :</label>
        <input id="mediaTitle" ref="mediaTitle" v-model="sendData.mediaTitle" />
      </div>
      <div :style="{marginBottom: updateMode ? 0 : '20px'}">
        <input type="file" id="mediaFile" 
          style="display: none" 
          :disabled="updateMode"
          @change="fileChange"
        />
        <label :style="{
          cursor: updateMode ? 'default' : 'pointer'
        }" for="mediaFile">미디어 첨부</label>
        <span>{{ sendFileInfo }}</span>
      </div>
      <small v-if="updateMode" style="color: #f00">미디어 첨부파일은 수정이 불가합니다.</small>
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
  props: {
    modalType: String,
    selectMediaObj: Object,
  },
  data() {
    return {
      editIcon,
      sendData: {},
      sendFile: {},
      sendFileInfo: '',
    }
  },
  created () {
    if (this.modalType == 'C') {
      this.sendData = {
        mediaSeq: 0,
        mediaTitle: ''
      }
      return;
    }

    useRest({
      url: Store.globalURL + 'admin_dlabMediaData',
      success: (data) => {
        this.sendData = data;
        this.sendFileInfo = '[파일명: ' + data.mediaFileName + ' / 용량: ' + useFileSize(data.mediaFileSize) + ']';
      }
    });

  },
  methods: {
    save () {
      let pass = useSendValidation([
        this.$refs.mediaTitle,
        this.sendFileInfo
      ], () => {
        useAlert.warn('공식 미디어 ' + this.modalTypeTitle, '제목 또는 미디어 파일을 첨부해주세요.');
        return;
      });
      if (!pass) return;

      console.log(this.sendData);
      console.log(this.sendFile);
      
      useAlert.success('공식 미디어 ' + this.modalTypeTitle, '등록되었습니다.');
      this.$emit('add-media-modal-close', false);
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
    modalTypeTitle() {
      return this.modalType == 'C' ? '등록' : '수정';
    },
    modalTypeSaveBtn() {
      return this.modalType == 'C' ? '등 록' : '수 정';
    },
    updateMode () {
      return this.modalType == 'U';
    }

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
  width: 600px;
  height: 240px;
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
        width: 50px;
      }
      input#mediaTitle {
        width: calc(100% - 55px);
        border: 1px solid #ccc;
        height: 30px;
        padding: 0 5px;
      }

      input[type="file"] + label {
        width: 100px;
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
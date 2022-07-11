<template>
  <section class="sModal">
    <header>
      <article>
        <h1>
          <div class="icon" :style="{ backgroundImage: 'url(' + editIcon + ')' }" />
          <span>{{ selectBusinessData.title }} 기록물 {{ modalType == 'C' ? '추가' : '수정' }}</span>
        </h1>
      </article>
      <article>
        <button @click="$emit('addRecordModalOpen', false)">
          <span v-for="x in 2" :key="x" />
        </button>
        <button class="saveBtn" @click="save">
          <i class="far fa-save" />저 장
        </button>
      </article>
    </header>

    <article class="contents">
      <div>
        <label for="recordTitle" class="required" v-text="'기록 제목 : '" />
        <input id="recordTitle" v-model="sendRecordData.title" ref="title" />
      </div>
      <div>
        <label class="required" v-text="'카테고리 : '"/>
        <span>{{ sendRecordData.businessName }}</span>
      </div>
      <div>
        <label for="recStartDT" class="required" v-text="'사업 날짜 : '" />
        <input type="date" id="recStartDT" v-model="sendRecordData.businessDT" ref="date" />
      </div>
      <div>
        <label v-text="'기록 파일 : '" />
        <input type="file" id="recordFile" style="display:none" @change="fileChange" />
        <label for="recordFile" v-text="'파일 선택'"/>
        <span>{{ returnFileInfo }}</span>
      </div>
      <div class="recordContents">
        <label for="recordContents" class="required" v-text="'기록 내용'" />
        <textarea id="recordContents" v-model="sendRecordData.contents" ref="contents" />
      </div>
      <uploadFiles :fileList="sendRecordFileList" @setFileList="setSendRecordFileList" />
      <div class="info">
        <span>
          작성자 : {{ sendRecordData.writerName }}
        </span>
      </div>
    </article>
  </section>
</template>

<script>
import { Store } from '../../store';
import editIcon from '../../img/icon/edit.png';
import { useToday, useFileSize, useSendValidation } from '../../hook';

export default {
  components: {
    uploadFiles: () => import('../common/uploadFiles'),
  },
  props: {
    modalType: String,
    selectBusinessData: Object,
    selectRecordData: Object
  },
  data() {
    return {
      editIcon,
      sendRecordData: {},
      sendRecordFile: {},
      sendRecordFileList: [],
      returnFileInfo: '',
    }
  },
  created () {
    if (this.modalType == 'C') {
      this.sendRecordData = {
        recordSeq: '0',
        business: this.selectBusinessData.businessSeq,
        businessName: this.selectBusinessData.title,
        fileName: '',
        fileSize: '',
        title: '',
        businessDT: '',
        contents: '',
        writerSeq: '99',
        writerName: '관리자',
        writeDT: useToday()
      }
      this.sendRecordFile = {}
      return;
    }

    this.sendRecordData = this.selectRecordData;
    this.sendRecordFile = {}
    this.returnFileInfo = (
      this.sendRecordData.fileName != '' && this.sendRecordData.fileSize != ''
    ) ? (
      `[파일명: ${this.sendRecordData.fileName} / 용량: ${useFileSize(this.sendRecordData.fileSize)}]`
    ) : (
      ``
    );

  },
  methods: {
    setSendRecordFileList(val) {
      this.sendRecordFileList = val;
    },
    save() {
      let pass = true;
      const callbackFn = (el, message) => {
        Store.setAlertYN(true);
        Store.setAlertInfo({icon: 'warn', title: '기록물 추가', text: message});
        el.focus();
      }
      pass = useSendValidation(this.$refs.title, callbackFn, '제목을 입력해주세요.');
      if (!pass) return;
      pass = useSendValidation(this.$refs.date, callbackFn, '사업날짜를 선택해주세요.');
      if (!pass) return;
      pass = useSendValidation(this.$refs.contents, callbackFn, '기록내용을 입력해주세요.');
      if (!pass) return;

      console.log(this.sendRecordData);
      console.log(this.sendRecordFile);
      console.log(this.sendRecordFileList);
    },
    fileChange(e) {
      if (e.target.files.length == 0 || e.target.value == '') {
        this.returnFileInfo = '';
        return;
      }
      let file = e.target.files[0];
      this.sendRecordFile = file;
      this.sendRecordData.fileName = file.name;
      this.sendRecordData.fileSize = file.size;
      this.returnFileInfo = `[파일명: ${file.name} / 용량: ${useFileSize(file.size)}]`;
    },

  },
}
</script>

<style lang="scss" scoped>
section.sModal {
  position: fixed;
  left: 50%;
  top: 50%;
  width: 800px;
  height: 700px;
  transform: translate(-50%, -50%);
  border: 1px solid #aaa;
  /* border-radius: 10px; */
  background-color: #fff;
  z-index: 1800;
  overflow: hidden;
  user-select: none;
  box-shadow: 1px 2px 4px #00000050;
}
article.contents {
  padding: 10px;


  & > div {
    padding: 6px 0;
    margin: 0 0 5px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    &.recordContents {
      align-items: flex-start;
      flex-flow: column;
      height: calc(100% - 408px);
    }

    p {
      margin-right: 20px;
      display: flex;
      align-items: center;
      input[type="date"] {
        width: 140px;
      }
      &:last-of-type {margin-right: 0;}

      button {
        width: 200px;
        height: 30px;
        border: 1px solid #aaa;
        background-color: #fff;
        color: #444;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        font-size: 13px;
        position: relative;
        cursor: default;

        &:hover {
          box-shadow: none;
          border: 1px solid #999;
        }
        & > span {
          display: block;
          width: 100%;
          height: 30px;
          line-height: 30px;
          color: #444;
          cursor: pointer;
        }
        i {
          position: absolute;
          top: 50%;
          right: 10px;
          transform: translateY(-50%);
        }

        .searchList {
          position: absolute;
          left: -70px;
          top: calc(100% + 4px);
          border-radius: 2px;
          background-color: #fff;
          border: 1px solid #aaa;
          width: 400px;
          height: 300px;
          padding: 6px;

          & > p {
            display: flex;
            align-items: center;
            justify-content: flex-start;
            margin-bottom: 8px;

            input {
              width: 100%;
            }
          }

          & > ul {
            height: calc(100% - 38px);
            margin-bottom: 0;
            overflow: auto;

            li {
              border: 1px solid #ddd;
              margin-bottom: 5px;
              display: flex;
              align-items: center;
              justify-content: center;
              cursor: pointer;
              
              &:last-of-type{margin-bottom: 0;}
              &:hover {
                border: 1px solid #444;
              }

              &.noneList {
                border: none;
                color: #777;
                padding: 6px;
              }

              & > .left {
                width: 80px;
                height: 80px;
                border-right: 1px solid #ddd;
                background-position: center;
                background-size: contain;
                background-repeat: no-repeat;
                background-color: #fff;
                display: flex;
                align-items: center;
                justify-content: center;
                color: #777;
                font-size: 12px;
              }

              & > .right {
                width: calc(100% - 80px);
                height: 80px;
                padding: 4px;

                .name {height: 30%;}
                .description {
                  height: 70%;
                  align-items: flex-start;
                  overflow: auto;
                }
              }
            }
          }
        }
      }
    }

    label {
      margin-right: 8px;
      white-space: nowrap;
      &[for="recordContents"]{
        margin-bottom: 6px;
      }
    }

    input, select {
      height: 30px;
      border: 1px solid #ddd;
      padding: 0 5px;
      font-size: 14px;
    }
    textarea {
      width: 100%;
      border: 1px solid #ddd;
      padding: 5px;
      font-size: 14px;
      resize: none;
      height: calc(100% - 28px);
    }

    input#listenerCount { width: 100px; }
    input#recordTitle { width: 100%; }
    input#listenerCount { margin-right: 4px; }
    label[for="recordFile"]:last-of-type {
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
      &:hover {background-color: #999;}
      &:active {background-color: #777;}
    }
  }

}
</style>
<template>
  <section class="sModal">
    <header>
      <article>
        <h1>
          <div class="icon" :style="{ backgroundImage: 'url(' + editIcon + ')' }" />
          <span>공모사업 {{ returnModalType }}</span>
        </h1>
      </article>
      <article>
        <button @click="$emit('addResiBsnsModalOpen', false)">
          <span v-for="x in 2" :key="x" />
        </button>
        <button class="saveBtn" @click="save">
          <i class="far fa-save" />저 장
        </button>
      </article>
    </header>
    <article class="contents">
      <div>
        <label class="required" for="resiBsnsTitle" v-text="'사업 제목 : '" />
        <input id="resiBsnsTitle" ref="resiBsnsTitle" v-model="sendData.resiBsnsTitle" />
      </div>
      <div>
        <p>
          <label v-text="'첨부 파일 : '" />
          <input type="file" id="listenRequestStandardFile" style="display:none" @change="fileChange" />
          <label for="listenRequestStandardFile" v-text="'파일 선택'" />
          <span>{{ sendFileInfo }}</span>
        </p>
        <p>
          <label v-text="'위치 지정 : '" />
          <label for="setPosition" v-text="'위치 설정'" @click="setPosition" />
        </p>
      </div>
      <div class="resiBsnsContents">
        <label class="required" for="resiBsnsContents">사업 내용</label>
        <textarea id="resiBsnsContents" ref="resiBsnsContents" v-model="sendData.resiBsnsContents" />
      </div>
      <div class="info">
        <span>
          작성자 : {{ sendData.writerName }}
        </span>
      </div>
    </article>
  </section>
</template>

<script>
import editIcon from '../../img/icon/edit.png';
import { Store } from '../../store';
import { useRest, useFileSize, useSendValidation } from '../../hook';

export default {
  props: {
    modalType: String,
    selectResiBsnsData: Object,
  },
  data() {
    return {
      editIcon,
      sendData: {},
      sendFile: {},
      sendFileInfo: '',
    }
  },
  created() {
    if (this.modalType == 'C') {
      this.sendData = {
        resiBsnsSeq: '0',
        resiBsnsTitle: '', 
        position: '0,0',
        resiBsnsContents: '',
        writerSeq: '99',
        writerName: '관리자',
      }
      this.sendFile = {};
      return;
    }
    useRest({
      url: Store.globalURL + 'admin_resiBsnsData',
      success: (data) => this.sendData = data
    });
    this.sendFile = { /* File Object */ }

  },
  methods: {
    save() {
      let pass = true;
      let sendData = this.sendData;
      let sendFile = this.sendFile;
      let title = '공모사업 ' + (this.modalType == 'C' ? '생성' : '수정');
      const callbackFn = (el, message) => {
        Store.setAlertYN(true);
        Store.setAlertInfo({icon: 'warn', title: title, text: message});
        el.focus();
      }
      // validation
      pass = useSendValidation(this.$refs.resiBsnsTitle, callbackFn, '사업 제목을 입력해주세요.');
      if (!pass) return;
      pass = useSendValidation(this.$refs.resiBsnsContents, callbackFn, '사업 설명을 입력해주세요.');
      if (!pass) return;

      if (this.modalType == 'C') {
        Store.setAlertYN(true);
        Store.setAlertInfo({icon: 'success', title: title, text: '생성이 완료되었습니다.'});
      } else {
        Store.setAlertYN(true);
        Store.setAlertInfo({icon: 'success', title: title, text: '수정이 완료되었습니다.'});
      }
      console.log(sendData);
      console.log(sendFile);
      this.$emit('addResiBsnsModalOpen', false);
    },
    fileChange(e) {
      if (e.target.files.length == 0 || e.target.value == '') {
        this.sendFileInfo = '';
        return;
      }
      let file = e.target.files[0];
      this.sendFile = file;
      this.sendFileInfo = `[파일명: ${file.name} / 용량: ${useFileSize(file.size)}]`;
    },
    setPosition(e) {

    }
  },
  computed: {
    returnModalType() {
      let result = 
        this.modalType == 'C' ? '생성' : 
        this.modalType == 'U' ? '수정' : '';
      return result;
    }
  }
}
</script>

<style lang="scss" scoped>

section.sModal {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border: 1px solid #aaa;
  /* border-radius: 10px; */
  width: calc(100% + 2px);
  height: calc(100% + 2px);
  background-color: #fff;
  z-index: 1800;
  overflow: hidden;
  user-select: none;
  box-shadow: 1px 2px 4px #00000050;

  label {
    font-size: 14px;
    margin-right: 4px;
    color: #232323;
  }

  .contents {
    padding: 10px;


    & > div {
      padding: 6px 0;
      margin: 0 0 5px;
      display: flex;
      align-items: center;
      justify-content: flex-start;
      &.resiBsnsContents {
        align-items: flex-start;
        flex-flow: column;
        height: calc(100% - 138px);
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
        &[for="resiBsnsContents"]{
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

      input#resiBsnsTitle { width: 100%; }
      label[for="listenRequestStandardFile"]:last-of-type,
      label[for="setPosition"] {
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
}
</style>
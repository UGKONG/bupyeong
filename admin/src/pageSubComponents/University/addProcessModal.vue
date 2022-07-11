<template>
  <section class="sModal">
    <header>
      <article>
        <h1>
          <div class="icon" :style="{ backgroundImage: 'url(' + editIcon + ')' }" />
          <span>학습과정 {{ returnModalType }}</span>
        </h1>
      </article>
      <article>
        <button @click="$emit('addProcessModalClose')">
          <span v-for="x in 2" :key="x" />
        </button>
        <button class="saveBtn" @click="processSave">
          <i class="far fa-save" />저 장
        </button>
        <button class="stopBtn" @click="processStop">
          <i class="fas fa-stopwatch" />모집 조기 종료
        </button>
      </article>
    </header>
    <article class="contents">
      <div>
        <p>
          <label class="required" for="recStartDT" v-text="'모집 기간 : '" />
          <input type="date" id="recStartDT" ref="recStartDT" v-model="sendProcessData.CRS_RCRT_BGNG_DT" @focus="dropDownHide" @change="recDateChange" />
          <label for="recEndDT" v-text="' ~ '" style="margin-left: 10px;"/>
          <input type="date" id="recEndDT" ref="recEndDT" v-model="sendProcessData.CRS_RCRT_END_DT" @focus="dropDownHide" @change="recDateChange" />
        </p>
        <p>
          <label class="required" for="processStartDT" v-text="'과정 스케줄 : '" />
          <input type="date" id="processStartDT" ref="processStartDT" v-model="sendProcessData.CRS_BGNG_DT" @focus="dropDownHide" @change="processDateChange"  />
          <label for="processEndDT" v-text="' ~ '" style="margin-left: 10px;"/>
          <input type="date" id="processEndDT" ref="processEndDT" v-model="sendProcessData.CRS_END_DT" @focus="dropDownHide" @change="processDateChange" />
        </p>
      </div>
      <div>
        <label class="required" for="processTitle" v-text="'과정명 : '" />
        <input id="processTitle" ref="processTitle" v-model="sendProcessData.CRS_NM" @focus="dropDownHide" />
      </div>
      <div>
        <p>
          <label class="required" for="listenerCount" v-text="'수강생 수 : '" />
          <input type="number" id="listenerCount" ref="listenerCount" v-model="sendProcessData.CRS_STDNT_MNPE" @focus="dropDownHide" style="text-align: center;" />명
        </p>
        <p>
          <label class="required" v-text="'과정 매니저 : '" />
          <button id="processManagerChoice">
            <span @click="managerListDropDown">
              {{ sendProcessData.CRS_MNGR_NM || '선 택' }}
              <i class="fas fa-caret-down" />
            </span>
            <div class="searchList" v-show="managerSearchDropYN">
              <p v-if="processManagerList.length != 0">
                <label for="managerSearchBox">검색 : </label>
                <input ref="managerSearchBox" id="managerSearchBox" v-model="managerSearchText" />
              </p>
              <ul>
                <template v-for="manager in processManagerList">
                  <li :key="manager.MBR_SN" @click="managerChoice" 
                    :data-seq="manager.MBR_SN"
                    :data-name="manager.MBR_NM"
                    v-show="
                      manager.MBR_NM.search(managerSearchText) > -1 ||
                      manager.TELNO.search(managerSearchText) > -1
                    "
                  >
                    <div class="left" :style="{backgroundImage: 'url(' + manager.MBR_PIC_FN + ')'}">
                      <span v-if="manager.MBR_PIC_FN == ''">이미지 없음</span>
                    </div>
                    <div class="right">
                      <p class="name">이름 : {{ manager.MBR_NM }}</p>
                      <p class="phone">연락처 : {{ manager.TELNO }}</p>
                      <p class="email">이메일 : {{ manager.EML }}</p>
                    </div>
                  </li>
                </template>
                <li class="noneList" v-if="processManagerList.length == 0">
                  리스트가 없습니다.
                </li>

              </ul>
            </div>
          </button>
        </p>
      </div>
      <div class="processContents">
        <label class="required" for="processContents">과정 설명</label>
        <textarea id="processContents" ref="processContents" v-model="sendProcessData.CRS_DSCRT" @focus="dropDownHide" />
      </div>
      <uploadFiles :fileList="sendProcessFileList" @setFileList="setSendProcessFileList" :url="'/MNGR_CRS'" />
      <div class="info">
        <span>
          작성자 : {{ sendProcessData.CRT_MNGR_NM }}
        </span>
      </div>
    </article>
  </section>
</template>

<script>
import editIcon from '../../img/icon/edit.png';
import { Store } from '../../store';
import { useToday, useFileSize, useSendValidation, useForm, useAlert, useDelay, useDateValidation } from '../../hook';
import axios from 'axios';

export default {
  components: {
    uploadFiles: () => import('../common/uploadFiles.vue')
  },
  props: {
    modalType: String,
    selectProcessSeq: Number,
  },
  data() {
    return {
      editIcon,
      processManagerList: [],
      sendProcessData: {},
      sendProcessFileList:[],
      returnFileInfo: '',
      managerSearchDropYN: false,
      managerSearchText: '',
      recEndDT_prev: '',
      processEndDT_prev: '',
    }
  },
  watch: {
    managerSearchDropYN(val, oldVal) {
      if (val) {
        this.managerSearchText = '';
        useDelay(100).then(() => {
          this.processManagerList.length != 0 && this.$refs.managerSearchBox.focus();
        });
      }
    },
    
  },
  created() {
    this.getProcessData();
  },
  methods: {
    getProcessData() {
      if (this.modalType == 'C') {
        this.sendProcessData = {
          CRS_SN: 0, 
          CRS_BGNG_DT: '',
          CRS_END_DT: '',
          CRS_RCRT_BGNG_DT: useToday(), 
          CRS_RCRT_END_DT: '', 
          CRS_NM: '', 
          CRS_STDNT_MNPE: 0,
          CRS_MNGR_SN: 0,
          CRS_MNGR_NM: '',
          CRS_DSCRT: '',
          // CRT_MNGR_NM: '관리자',
        }
        this.sendProcessFileList = [];
        return;
      }

      let data = {TASK: 'R_CRS_DTL', CRS_SN: this.selectProcessSeq}
      axios.post(this.$store.state.dbUrl + '/MNGR_CRS', useForm(data)).then(({data}) => {
        if (!data.RESULT && data?.CAUSE == 'SESSIONFAIL') return this.$store.dispatch('sessionFail');
        if (!data.RESULT) return useAlert.error('과정 정보', '과정 정보를 불러오지 못했습니다.');
        
        this.sendProcessData = data;
        this.processManagerList = data.CRS_MNGR_LIST;
        this.sendProcessData.CRS_RCRT_BGNG_DT = data.CRS_RCRT_BGNG_DT.split(' ')[0];
        this.sendProcessData.CRS_RCRT_END_DT = data.CRS_RCRT_END_DT.split(' ')[0];
        this.sendProcessData.CRS_BGNG_DT = data.CRS_BGNG_DT.split(' ')[0];
        this.sendProcessData.CRS_END_DT = data.CRS_END_DT.split(' ')[0];
        if (data.ATCH_FILE_LIST.length > 0) {
          this.sendProcessFileList = data.ATCH_FILE_LIST;
          // this.sendProcessFileInfo = '[파일명: ' + this.sendProcessFile.FN + ' / 용량: ' + useFileSize(this.sendProcessFile.FILE_SZ) + ']';
        }
        delete this.sendProcessData.CRS_MNGR_LIST;
        delete this.sendProcessData.ATCH_FILE_LIST;
      });
    },
    processSave() {
      this.dropDownHide();
      let title = '학습과정 ' + this.returnModalType;
      
      // validation
      let pass = useSendValidation([
        this.$refs.recStartDT, this.$refs.recEndDT, this.$refs.processStartDT, this.$refs.processEndDT, this.$refs.processTitle, 
        this.$refs.listenerCount, this.sendProcessData.MBR_SN, this.sendProcessData.MBR_NM, this.$refs.processContents
      ], () => {
        useAlert.warn(title, '필수 항목을 입력해주세요.');
      });
      if (!pass) return;

      // send
      this.sendProcessData.TASK = 'C_CRS_DTL';
      let data = this.sendProcessData;
      let files = this.sendProcessFileList;
      axios.post(this.$store.state.dbUrl + '/MNGR_CRS', useForm(data, {ATCH_FILE_LIST: files})).then(
        ({data}) => {
          if (!data.RESULT && data?.CAUSE == 'SESSIONFAIL') return this.$store.dispatch('sessionFail');
          if (!data.RESULT) return useAlert(title, this.returnModalType + '에 실패하였습니다.');
          useAlert.success(title, this.returnModalType + '되었습니다.');
          this.$emit('getList');
          this.$emit('addProcessModalClose');
        }
      ).catch(() => {
        useAlert.error(title, this.returnModalType + '에 실패하였습니다.');
      });

    },
    processStop() {
      useAlert.success('과정 조기 종료', '과정이 조기 종료되었습니다.');
    },
    managerListDropDown() {
      this.managerSearchDropYN = !this.managerSearchDropYN;
    },  
    managerChoice(e) {
      let seq = e.currentTarget.getAttribute('data-seq');
      let name = e.currentTarget.getAttribute('data-name');
      this.sendProcessData.CRS_MNGR_SN = seq;
      this.sendProcessData.CRS_MNGR_NM = name;
      this.managerSearchDropYN = false;
    },
    recDateChange(e) {
      let title = '학습과정 ' + this.returnModalType;
      useDateValidation(this.$refs.recStartDT, this.$refs.recEndDT, () => {
        useAlert.warn(title, '이전날짜를 선택 할 수 없습니다.');
        this.$refs.recEndDT.value = '';
      });
    },
    processDateChange() {
      let title = '학습과정 ' + this.returnModalType;
      useDateValidation(this.$refs.processStartDT, this.$refs.processEndDT, () => {
        useAlert.warn(title, '이전날짜를 선택 할 수 없습니다.');
        this.$refs.processEndDT.value = '';
      });
    },
    dropDownHide() {
      this.managerSearchDropYN = false;
    },
    setSendProcessFileList(val) {
      this.sendProcessFileList = val;
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
      &.processContents {
        align-items: flex-start;
        flex-flow: column;
        height: calc(100% - 380px);
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
        &[for="processContents"]{
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
      input#processTitle { width: 100%; }
      input#listenerCount { margin-right: 4px; }
    }
  }
}
</style>
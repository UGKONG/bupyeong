<template>
  <section class="sModal">
    <header>
      <article>
        <h1>
          <div class="icon" :style="{ backgroundImage: 'url(' + editIcon + ')' }" />
          <span>공동체 {{ returnModalType }}</span>
        </h1>
      </article>
      <article>
        <button @click="$emit('addModalOpen', false)">
          <span v-for="x in 2" :key="x" />
        </button>
        <button class="saveBtn" @click="commSave">
          <i class="far fa-save" />저 장
        </button>
      </article>
    </header>
    <article class="contents">
      <div>
        <label class="required" for="commTitle" v-text="'공동체명 : '" />
        <input id="commTitle" ref="commTitle" v-model="sendData.commTitle" @focus="dropDownHide" />
      </div>
      <div>
        <p>
          <label class="required" v-text="'공동체 리더 : '" />
          <button>
            <span @click="masterListDropDown">
              {{ sendData.commMasterName || '선 택' }}
              <i class="fas fa-caret-down" />
            </span>
            <div class="searchList" v-show="masterSearchDropYN">
              <p v-if="commMasterList.length != 0">
                <label for="masterSearchBox">검색 : </label>
                <input ref="masterSearchBox" id="masterSearchBox" v-model="searchVal" />
              </p>
              <ul>
                <masterList v-for="(item, idx) in commMasterList"
                  :key="idx" :item="item" :searchVal="searchVal"
                  @sendDataMasterChange="sendDataMasterChange"
                  @dropDownHide="dropDownHide"
                />
                <li class="noneList" v-if="commMasterList.length == 0">
                  리스트가 없습니다.
                </li>
              </ul>
            </div>
          </button>
        </p>
      </div>
      <div class="commContents">
        <label class="required" for="commContents">공동체 설명</label>
        <textarea id="commContents" ref="commContents" v-model="sendData.commContents" @focus="dropDownHide" />
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
import { useRest, useToday, useFileSize, useSendValidation } from '../../hook';

export default {
  components: {
    masterList: () => import('./masterList')
  },
  props: {
    modalType: String,
    selectCommData: Object,
  },
  data() {
    return {
      editIcon,
      commMasterList: [],
      sendData: {},
      masterSearchDropYN: false,
      searchVal: '',
      recEndDT_prev: '',
      processEndDT_prev: '',
    }
  },
  watch: {
    masterSearchDropYN(val, oldVal) {
      if (val) {
        this.searchVal = '';
        setTimeout(() => this.$refs.masterSearchBox.focus(), 100);
      }
    },
    
  },
  created() {

    if (this.modalType == 'C') {

      // 데이터 초기화
      this.sendData = {
        commSeq: '0',
        commTitle: '',
        commMasterSeq: '',
        commMasterName: '',
        commStartDT: useToday(),
        commContents: '',
        writerSeq: '99',
        writerName: '관리자',
      }

      // 공동체 생성은 사용자 모두 / 공동체 수정은 공동체원
      // 공동체 리더 리스트
      useRest({
        url: Store.globalURL + 'admin_memberList',
        success: (data) => this.commMasterList = data
      });

    } else {

      useRest({
        url: Store.globalURL + 'admin_commData',
        success: (data1) => {
          this.sendData = data1;
          useRest({
            url: Store.globalURL + 'admin_commResidentList',
            success: (data2) => this.commMasterList = data2
          });
        }
      });

    }

  },
  methods: {
    sendDataMasterChange(seq, name) {
      this.sendData.commMasterSeq = seq;
      this.sendData.commMasterName = name;
    },
    commSave() {
      this.dropDownHide();
      let pass = true;
      let sendData = this.sendData;
      let alertTitle = '공동체 ' + (this.modalType == 'C' ? '생성' : '수정');

      const callbackFn = (el, message) => {
        Store.setAlertYN(true);
        Store.setAlertInfo({icon: 'warn', title: alertTitle, text: message});
        el.focus();
      }
      // validation
      pass = useSendValidation(this.$refs.commTitle, callbackFn, '과정명을 입력해주세요.');
      if (!pass) return;
      pass = useSendValidation([sendData.name, sendData.phone], callbackFn, '과정 매니저를 선택해주세요.');
      if (!pass) return;
      pass = useSendValidation(this.$refs.commContents, callbackFn, '과정 설명을 입력해주세요.');
      if (!pass) return;

      if (this.modalType == 'C') {
        Store.setAlertYN(true);
        Store.setAlertInfo({icon: 'success', title: alertTitle, text: '생성이 완료되었습니다.'});
        console.log(sendData);
      } else {
        Store.setAlertYN(true);
        Store.setAlertInfo({icon: 'success', title: alertTitle, text: '수정이 완료되었습니다.'});
        console.log(sendData);
      }
    },
    masterListDropDown() {
      this.masterSearchDropYN = !this.masterSearchDropYN;
    },
    dropDownHide() {
      this.masterSearchDropYN = false;
    },
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
      margin: 0 0 10px;
      display: flex;
      align-items: center;
      justify-content: flex-start;
      &.commContents {
        align-items: flex-start;
        flex-flow: column;
        height: calc(100% - 150px);
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
            left: -1px;
            top: calc(100% + 4px);
            border-radius: 2px;
            background-color: #fff;
            border: 1px solid #aaa;
            width: 200px;
            height: 300px;
            padding: 6px;
            z-index: 2;
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
              li.noneList {
                border: none;
                color: #777;
                padding: 6px;
              }
            }
          }
        }
      }

      label {
        margin-right: 8px;
        white-space: nowrap;
        &[for="commContents"]{
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
        height: calc(100% - 25px);
      }
    }
  }
}
</style>
<template>
  <section class="sModal">
    <header>
      <article>
        <h1>
          <div class="icon" :style="{ backgroundImage: 'url(' + editIcon + ')' }" />
          <span>상점 {{ returnModalType }}</span>
        </h1>
      </article>
      <article>
        <button @click="$emit('add-shop-modal-close', false)">
          <span v-for="x in 2" :key="x" />
        </button>
        <button class="saveBtn" @click="save">
          <i class="far fa-save" />저 장
        </button>
      </article>
    </header>
    <article class="contents">
      <div class="c-bottom">
        <p class="title">
          <span>
            <label class="required" for="shopName" v-text="'상점명 : '" />
            <input id="shopName" v-model="sendData.shopName" ref="shopName" />
          </span>
        </p>
        <div>
          <p>
            <label class="required" v-text="'상점주 선택 : '" />
            <button class="dropdown">
              <span @click="masterListDropDown">
                {{ sendData.shopMasterName || '선 택' }}
                <i class="fas fa-caret-down" />
              </span>
              <div class="searchList" v-show="masterSearchDropYN">
                <p v-if="masterList.length != 0">
                  <label for="masterSearchBox">검색 : </label>
                  <input ref="masterSearchBox" id="masterSearchBox" v-model="searchVal" />
                </p>
                <ul>
                  <masterList v-for="(item, idx) in masterList"
                    :key="idx" :item="item" :searchVal="searchVal"
                    @sendDataMasterChange="sendDataMasterChange"
                    @dropDownHide="dropDownHide"
                  />
                  <li class="noneList" v-if="masterList.length == 0">
                    리스트가 없습니다.
                  </li>
                </ul>
              </div>
            </button>
          </p>
        </div>
        <div>
          <p style="padding-right: 20px;">
            <label class="required">상점 대표 이미지 :</label>
            <input id="file" type="file" style="display: none;" @change="fileChange" />
            <label for="file" class="file">파일첨부</label>
            {{ sendFileInfo }}
          </p>
        </div>
        <div>
          <p>
            <label class="required">위치 지정 :</label>
            <button class="file">설 정</button>
          </p>
        </div>
        <label class="shopDescription required" for="shopDescription" v-text="'상점 소개'" />
        <textarea id="shopDescription" v-model="sendData.shopDescription" ref="shopDescription" />
        <uploadFiles :fileList="sendFileList" @setFileList="setSendFileList" />
        <div class="info">
          <span>
            작성자 : {{ sendData.writerName }}
          </span>
        </div>
      </div>
    </article>
  </section>
</template>

<script>
import editIcon from '../../img/icon/edit.png';
import { Store } from '../../store';
import { useFetch, useSendValidation, useRest, useToday, useDateValidation, useFileSize } from '../../hook';

export default {
  components: {
    uploadFiles: () => import('../common/uploadFiles.vue'),
    Checkbox: () => import('../../htmlTemplate/Checkbox.vue'),
    masterList: () => import('./masterList'),
  },
  props: {
    modalType: String,
    selectShopObj: Object,
  },
  data() {
    return {
      editIcon,
      sendData: {},
      sendFile: {},
      sendFileInfo: '',
      sendFileList: [],
      masterSearchDropYN: false,
      searchVal: '',
      masterList: []
    }
  },
  watch: {
    masterSearchDropYN(val, oldVal) {
      if (val) {
        this.searchVal = '';
        setTimeout(() => this.$refs.masterSearchBox.focus(), 100);
      }
    }
  },
  created() {

    useRest({
      url: Store.globalURL + 'admin_memberList',
      success: (data) => this.masterList = data
    });

    if (this.modalType == 'C') {
      this.sendData = {
        shopSeq: '0',
        shopName: '',
        shopMasterSeq: '',
        shopMasterName: '',
        shopDescription: '',
        joinDT: useToday(),
        shopPosition: '',
        writerSeq: '99',
        writerName: '관리자',
        writeDT: useToday(),
        fileName: '',
        fileSize: ''
      }
      this.sendFile = {};
      this.sendFileList = [];
      return;
    }

    useRest({
      url: Store.globalURL + 'admin_foodShopData',
      success: (data) => {
        this.sendData = data;
        this.sendFile = { /* FILE */ };
        this.sendFileList = [ /* FILE */ ];
        if (data.fileName != '') {
          this.sendFileInfo = `[파일명: ${data.fileName} / 용량: ${useFileSize(data.fileSize)}]`
        }
      }
    });
    
    
  },
  methods: {
    save() {
      let pass = true;

      pass = useSendValidation([
        this.$refs.shopName, this.$refs.shopDescription,
        this.sendData.fileName,
        this.sendData.shopMasterSeq, this.sendData.shopPosition
      ]);

      if (!pass) {
        Store.setAlertYN(true);
        Store.setAlertInfo({
          icon: 'warn', 
          title: '상점 ' + this.returnModalType, 
          text: '필수 항목을 입력해주세요.'
        });
        return;
      }

      console.log(this.sendData);
      console.log(this.sendFile);
      console.log(this.sendFileList);

      Store.setAlertYN(true);
      Store.setAlertInfo({
        icon: 'success', 
        title: '사업홍보물 ' + this.returnModalType, 
        text: this.returnModalType + '되었습니다.'
      });
      this.$emit('add-shop-modal-close', false);

    },

    fileChange(e) {
      let files = e.target.files;
      if (files.length == 0) {
        this.sendFile = {};
        this.sendFileInfo = '';
        this.sendData.fileName = '';
        this.sendData.fileSize = '';
      } else {
        let file = files[0];
        let [name, size] = [file.name, file.size];
        this.sendFile = file;
        this.sendData.fileName = name;
        this.sendData.fileSize = size;
        this.sendFileInfo = `[파일명: ${name} / 용량: ${useFileSize(size)}]`;
      }
    },
    
    setSendFileList(value) {
      this.sendFileList = value;
    },

    sendDataMasterChange(seq, name) {
      this.sendData.shopMasterSeq = seq;
      this.sendData.shopMasterName = name;
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
        this.modalType == 'C' ? '추가' : 
        this.modalType == 'U' ? '수정' : '';
      return result;
    },
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
    white-space: nowrap;
  }
  .c-bottom {
    width: 100%;
    height: 100%;
    padding: 0 20px 20px;
    overflow: auto;
    & > div {
      padding: 10px 0;
      display: flex;
      align-items: center;
    }
    p {
      &.title {
        padding: 10px 0;
        display: flex;
        align-items: center;
        justify-content: space-between;
        & > span:nth-of-type(1) {width: 100%;}
        & > span:nth-of-type(2) {width: auto;}
        input {
          padding: 0 5px;
          width: calc(100% - 56px);
          min-width: 50%;
          height: 30px;
          border-radius: 0;
          border: 1px solid #ccc;
          margin-right: 0;
        }
        select {
          padding: 0 5px;
          width: 150px;
          height: 30px;
          border-radius: 0;
          border: 1px solid #ccc;
        }
      }
    }
    .shopDescription {
      display: block;
      height: unset;
      margin-bottom: 6px;
    }
    input {
      padding: 0 5px;
      width: 150px;
      min-width: 50%;
      height: 30px;
      border-radius: 0;
      border: 1px solid #ccc;
      margin-right: 20px;
      &#masterSearchBox {
        margin-right: 0;
      }
    }
    [type="file"] + label {
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
      margin-left: 6px;
    }
    button.file {
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
      margin-left: 6px;
      margin-right: 40px;
    }

    #shopDescription {
      width: 100%;
      height: calc(100% - 454px);
      resize: none;
      border: 1px solid #ccc;
      padding: 6px;
    }
    .info {
      height: 30px;
      display: flex;
      align-items: flex-end;
      font-size: 14px;
      padding: 0;
      span {
        margin-right: 20px;
      }
    }
    
    .dropdown {
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

}
</style>
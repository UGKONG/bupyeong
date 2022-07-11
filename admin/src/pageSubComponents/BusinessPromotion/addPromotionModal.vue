<template>
  <section class="sModal">
    <header>
      <article>
        <h1>
          <div class="icon" :style="{ backgroundImage: 'url(' + editIcon + ')' }" />
          <span>사업홍보물 {{ returnModalType }}</span>
        </h1>
      </article>
      <article>
        <button @click="$emit('setAddProModalYN', false)">
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
            <label class="required" for="proTitle" v-text="'홍보물 제목 : '" />
            <input id="proTitle" v-model="sendData.proTitle" ref="proTitle" />
          </span>
          <span>
            <label for="proCategory" v-text="'카테고리 : '" />
            <select id="proCategory" v-model="sendData.categorySeq" @change="categoryChange">
              <option v-for="item in orderCategoryList" 
                :key="item.categorySeq" 
                :value="item.categorySeq" 
                v-text="item.categoryName"
              />
            </select>
          </span>
        </p>
        <div>
          <p>
            <label class="required" for="proStartDT">홍보 시작일 : </label>
            <input id="proStartDT" ref="proStartDT" type="date" v-model="sendData.proStartDT" @change.prevent="dateChange" />
          </p>
          <p>
            <label class="required" for="proEndDT">홍보 마감일 : </label>
            <input id="proEndDT" ref="proEndDT" type="date" v-model="sendData.proEndDT" @change.prevent="dateChange" />
          </p>
        </div>
        <div>
          <label class="required" for="proURL">홍보물 클릭 링크 : </label>
          <input type="url" id="proURL" ref="proURL" v-model="sendData.url" placeholder="http:// 또는 https://로 시작하는 URL을 입력해주세요."/>
        </div>
        <div>
          <label>홍보물 파일</label>
          <input id="proFile" type="file" style="display: none;" @change="fileChange" />
          <label for="proFile">파일첨부</label>
          {{ sendProFileInfo }}
        </div>
        <label class="contents required" for="proContents" v-text="'사업 내용'" />
        <textarea id="proContents" v-model="sendData.proContents" ref="proContents" />
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
  },
  props: {
    modalType: String,
    selectProObj: Object,
  },
  data() {
    return {
      editIcon,
      categoryList: [],
      sendData: {},
      sendProFile: {},
      sendProFileInfo: '',
      sendFileList: [],
    }
  },
  created() {

    useRest({
      url: Store.globalURL + 'admin_businessPromotionCategoryList',
      success: (data) => {
        this.categoryList = data;

        if (this.modalType == 'C') {
          this.sendData = {
            proSeq: '0',
            categorySeq: '',
            categoryName: '',
            proTitle: '',
            proStartDT: useToday(),
            proEndDT: '',
            writerSeq: '99',
            writerName: '관리자',
            writeDT: useToday(),
            url: '',
            proContents: ''
          }
          this.sendProFile = {};
          this.sendFileList = [];
          this.sendData.categorySeq = data[0].categorySeq;
          this.sendData.categoryName = data[0].categoryName;
          return;
        }

        useRest({
          url: Store.globalURL + 'admin_promotionData',
          success: (data) => {
            this.sendData = data;
            this.sendProFile = { /* FILE */ };
            this.sendFileList = [ /* FILE */ ];
          }
        });
      }
    });
    
    
  },
  methods: {
    save() {
      let pass = true;

      pass = useSendValidation([
        this.$refs.proTitle, this.$refs.proStartDT, this.$refs.proEndDT,
        this.$refs.proURL, this.$refs.proContents
      ]);

      if (!pass) {
        Store.setAlertYN(true);
        Store.setAlertInfo({
          icon: 'warn', 
          title: '사업홍보물 ' + this.returnModalType, 
          text: '필수 항목을 입력해주세요.'
        });
        return;
      }

      console.log(this.sendData);
      console.log(this.sendProFile);
      console.log(this.sendFileList);

      Store.setAlertYN(true);
      Store.setAlertInfo({
        icon: 'success', 
        title: '사업홍보물 ' + this.returnModalType, 
        text: this.returnModalType + '되었습니다.'
      });
      this.$emit('setAddProModalYN', false);

    },

    categoryChange(e) {
      let val = e.target.value;
      let obj = this.orderCategoryList.find(x => x.categorySeq == val);
      this.sendData.categoryName = obj.categoryName;
    },

    dateChange() {
      useDateValidation(this.$refs.proStartDT, this.$refs.proEndDT, () => {
        Store.setAlertYN(true);
        Store.setAlertInfo({
          icon: 'warn', 
          title: '사업홍보물 ' + this.returnModalType, 
          text: '이전날짜를 선택 할 수 없습니다.'
        });
        this.sendData.proEndDT = '';
      });
    },

    fileChange(e) {
      let files = e.target.files;
      if (files.length == 0) {
        this.sendProFile = {};
        this.sendProFileInfo = '';
      } else {
        let file = files[0];
        this.sendProFile = file;
        this.sendProFileInfo = `[파일명: ${file.name} / 용량: ${useFileSize(file.size)}]`;
      }
    },
    
    setSendFileList(value) {
      this.sendFileList = value;
    }
  },
  computed: {
    returnModalType() {
      let result = 
        this.modalType == 'C' ? '작성' : 
        this.modalType == 'U' ? '수정' : '';
      return result;
    },
    orderCategoryList() {
      return this.categoryList.sort((a, b) => a.order - b.order);
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
        & > span:nth-of-type(1) {width: 70%;}
        & > span:nth-of-type(2) {width: auto;}
        input {
          padding: 0 5px;
          width: calc(100% - 106px);
          min-width: 50%;
          height: 30px;
          border-radius: 0;
          border: 1px solid #ccc;
          margin-right: 20px;
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
    .contents {
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
      margin-left: 10px;
    }
    #proContents {
      width: 100%;
      height: calc(100% - 450px);
      resize: none;
      border: 1px solid #ccc;
      padding: 6px;
    }
    .info {
      height: 30px;
      display: flex;
      align-items: flex-end;
      font-size: 14px;
      span {
        margin-right: 20px;
      }
    }
  }

}
</style>
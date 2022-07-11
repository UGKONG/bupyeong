<template>
  <section class="sModal">
    <header>
      <article>
        <h1>
          <div class="icon" :style="{ backgroundImage: 'url(' + editIcon + ')' }" />
          <span>공모일정 {{ returnModalType }}</span>
        </h1>
      </article>
      <article>
        <button @click="$emit('add-contest-modal-close', false)">
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
            <label class="required" for="title" v-text="'공모 제목 : '" />
            <input id="title" v-model="sendData.title" ref="title" />
          </span>
        </p>
        <div>
          <p>
            <label class="required" for="startDT">공모 시작일 : </label>
            <input id="startDT" ref="startDT" type="date" v-model="sendData.startDT" @change.prevent="dateChange" />
          </p>
          <p>
            <label class="required" for="endDT">공모 마감일 : </label>
            <input id="endDT" ref="endDT" type="date" v-model="sendData.endDT" @change.prevent="dateChange" />
          </p>
        </div>
        <div>
          <label class="required">이미지 파일</label>
          <input id="file" type="file" style="display: none;" @change="fileChange" />
          <label for="file">파일첨부</label>
          {{ sendFileInfo }}
        </div>
        <label class="contents required" for="contents" v-text="'공모 내용'" />
        <textarea id="contents" v-model="sendData.contents" ref="contents" />
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
    setSelectContestObj: Object,
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
  created() {

    if (this.modalType == 'C') {
      this.sendData = {
        contestSeq: '0',
        title: '',
        startDT: useToday(),
        endDT: '',
        writerSeq: '99',
        writerName: '관리자',
        writeDT: useToday(),
        imgPath: '',
        imgName: '',
        contents: ''
      }
      this.sendFile = {};
      this.sendFileList = [];
      return;
    }

    useRest({
      url: Store.globalURL + 'admin_contestData',
      success: (data) => {
        this.sendData = data;
        this.sendFile = { /* FILE */ };
        this.sendFileList = [ /* FILE */ ];
        if (data.imgName != '') {
          this.sendFileInfo = `[파일명: ${data.imgName} / 용량: ${useFileSize(data.imgSize)}]`
        }
      }
    });
    
    
  },
  methods: {
    save() {
      let pass = true;

      pass = useSendValidation([
        this.$refs.title, this.$refs.startDT, this.$refs.endDT,
        this.sendFileInfo, this.$refs.contents
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
      console.log(this.sendFile);
      console.log(this.sendFileList);

      Store.setAlertYN(true);
      Store.setAlertInfo({
        icon: 'success', 
        title: '사업홍보물 ' + this.returnModalType, 
        text: this.returnModalType + '되었습니다.'
      });
      this.$emit('setAddContestModalYN', false);

    },

    dateChange() {
      useDateValidation(this.$refs.startDT, this.$refs.endDT, () => {
        Store.setAlertYN(true);
        Store.setAlertInfo({
          icon: 'warn', 
          title: '사업홍보물 ' + this.returnModalType, 
          text: '이전날짜를 선택 할 수 없습니다.'
        });
        this.sendData.endDT = '';
      });
    },

    fileChange(e) {
      let files = e.target.files;
      if (files.length == 0) {
        this.sendFile = {};
        this.sendFileInfo = '';
      } else {
        let file = files[0];
        let [name, size] = [file.name, file.size];
        this.sendFile = file;
        this.sendData.imgName = name;
        this.sendData.imgSize = size;
        this.sendFileInfo = `[파일명: ${name} / 용량: ${useFileSize(size)}]`;
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
        & > span:nth-of-type(1) {width: 100%;}
        & > span:nth-of-type(2) {width: auto;}
        input {
          padding: 0 5px;
          width: calc(100% - 72px);
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
    #contents {
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
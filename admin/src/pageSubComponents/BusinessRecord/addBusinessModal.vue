<template>
  <section class="sModal">
    <header>
      <article>
        <h1>
          <div class="icon" :style="{ backgroundImage: 'url(' + editIcon + ')' }" />
          <span>사업 추가</span>
        </h1>
      </article>
      <article>
        <button @click="$emit('addBusinessModalOpen', false)">
          <span v-for="x in 2" :key="x" />
        </button>
        <button class="saveBtn" @click="save">
          <i class="far fa-save" />등 록
        </button>
      </article>
    </header>
    
    <article class="contents">
      <div>
        <label class="required" for="businessTitle" v-text="'사업 제목 : '" />
        <input id="businessTitle" v-model="sendBusinessData.businessTitle" ref="title" />
      </div>

      <div>
        <label class="required" for="businessStartDT" v-text="'사업 기간 : '" />
        <input type="date" id="businessStartDT" v-model="sendBusinessData.businessStartDT" ref="startDT" @change="dateChange" />
        <label for="businessEndDT" v-text="' ~ '" style="margin: 0 8px" />
        <input type="date" id="businessEndDT" v-model="sendBusinessData.businessEndDT" ref="endDT" @change="dateChange" />
      </div>
      <div>
        <label class="required" for="businessDepartment" v-text="'수행 부서 : '" />
        <input id="businessDepartment" v-model="sendBusinessData.businessDepartment" ref="department" />
      </div>
      <div>
        <label v-text="'사업 이미지 : '" />
        <input type="file" id="businessImage" style="display:none" ref="fileEl" @change="fileChange" />
        <label for="businessImage" v-text="'파일 선택'"/>
        <p>{{ returnFileInfo }}</p>
      </div>
      <div class="description" style="height: calc(100% - 436px);">
        <label for="description" v-text="'사업 설명'" />
        <textarea id="description" style="height: calc(100% - 28px);" v-model="sendBusinessData.description" placeholder="선택입력" />
      </div>
      <uploadFiles :fileList="sendBusinessFileList" @setFileList="setSendBusinessFileList" />
      <div class="info">
        <span v-text="'작성자 : ' + sendBusinessData.writerName" />
      </div>
    </article>
  </section>
</template>

<script>
import { Store } from '../../store';
import { useDateValidation, useFileSize } from '../../hook';
import editIcon from '../../img/icon/edit.png';

export default {
  components: {
    uploadFiles: () => import('../common/uploadFiles'),
  },
  props: {
    selectProcessData: Object,
  },
  data() {
    return {
      editIcon,
      sendBusinessData: {},
      sendBusinessFile: {},
      sendBusinessFileList: [],
      returnFileInfo: '',
    }
  },
  created() {
    this.sendBusinessData = {
      businessSeq: '0',
      businessTitle: '',
      businessStartDT: '',
      businessEndDT: '',
      businessDepartment: '',
      description: '',
      writerSeq: '99',
      writerName: '관리자'
    }
    this.sendBusinessFile = {}
  },
  methods: {
    setSendBusinessFileList(val) {
      this.sendBusinessFileList = val;
    },
    fileChange (e) {
      if (e.target.files.length == 0 || e.target.value == '') {
        this.sendBusinessFile = {}
        this.returnFileInfo = '';
        return;
      }
      let file = e.target.files[0];
      this.sendBusinessFile = file;
      this.returnFileInfo = `[파일명: ${file.name} / 용량: ${useFileSize(file.size)}]`;
    },
    save () {
      let data = this.sendBusinessData;
      let fileData = this.sendBusinessFile;
      let fileList = this.sendBusinessFileList;

      if (data.businessTitle == '') {
        Store.setAlertYN(true);
        Store.setAlertInfo({icon: 'warn', title: '사업 추가', text: '사업 제목을 입력해주세요.'});
        this.$refs.title.focus();
        return;
      }
      if (data.businessStartDT == '' || data.businessEndDT == '') {
        Store.setAlertYN(true);
        Store.setAlertInfo({icon: 'warn', title: '사업 추가', text: '사업 기간을 입력해주세요.'});
        return;
      }
      if (data.businessDepartment == '') {
        Store.setAlertYN(true);
        Store.setAlertInfo({icon: 'warn', title: '사업 추가', text: '수행 부서을 입력해주세요.'});
        this.$refs.department.focus();
        return;
      }

      console.log('data : ', data);
      console.log('fileData : ', fileData);
      console.log('fileList : ', fileList);
    },
    dateChange(e) {
      let result = useDateValidation(this.$refs.startDT, this.$refs.endDT);
      if (result == false) {
        Store.setAlertYN(true);
        Store.setAlertInfo({icon: 'warn', title: '사업 기간', text: '이전날짜를 선택 할 수 없습니다.'});
        e.target.value = '';
      }
    },
  },
  computed: {
    
  }
}
</script>

<style lang="scss" scoped>
section.sModal {
  position: fixed;
  /* top: 200px; */
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  border: 1px solid #aaa;
  /* border-radius: 6px; */
  /* width: 500px;
  height: 530px; */
  width: 100%;
  height: 100%;
  background-color: #fff;
  z-index: 1800;
  overflow: hidden;
  user-select: none;
  box-shadow: 1px 2px 4px #00000050;
}
article.contents {
  overflow: auto;
  padding: 10px;

  div {
    padding: 6px 0;
    margin: 0 0 5px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    flex-wrap: wrap;

    &.description {
      label {
        width: 100%;
        margin-bottom: 5px;
      }
      textarea {
        width: 100%;
        height: 170px;
        border: 1px solid #ddd;
        padding: 6px 5px;
        font-size: 13px;
        resize: none;
      }
    }

    p {
      margin-top: 10px;
      width: 100%;
      color: #888;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    label {
      margin-right: 8px;
      white-space: nowrap;
    }

    input {
      height: 30px;
      border: 1px solid #ddd;
      padding: 0 5px;
      font-size: 14px;
    }

    input#businessTitle { width: calc(100% - 70px); }
    label[for="businessImage"]:last-of-type {
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
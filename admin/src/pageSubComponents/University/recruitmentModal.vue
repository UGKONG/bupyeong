<template>
  <section class="sModal">
    <header>
      <article>
        <h1>
          <div class="icon" :style="{ backgroundImage: 'url(' + editIcon + ')' }" />
          <span>홍보물 등록</span>
        </h1>
      </article>
      <article>
        <button @click="$emit('recruitmentModalClose')">
          <span v-for="x in 2" :key="x" />
        </button>
        <button class="saveBtn" @click="save">
          <i class="far fa-save" />등 록
        </button>
      </article>
    </header>

    <article class="contents">
      <div>
        <label for="promotionTitle" v-text="'홍보물 제목 : '" />
        <input id="promotionTitle" v-model="sendData.title" />
      </div>
      <div>
        <p>
          <label for="promotionCategory" v-text="'카테고리 : '" />
          <select id="promotionCategory" v-model="sendData.category">
            <option 
              v-for="category in categoryList" 
              v-text="category.name"
              :key="category.seq" 
              :value="category.value" 
            />
          </select>
        </p>
        <p>
          <label for="promotionStartDT" v-text="'홍보시작일 : '" />
          <input type="date" id="promotionStartDT" v-model="sendData.startDT" />
        </p>
        <p>
          <label for="promotionEndDT" v-text="'홍보마감일 : '" />
          <input type="date" id="promotionEndDT" v-model="sendData.endDT" />
        </p>
      </div>
      <div>
        <label for="promotionClickLink" v-text="'홍보물 클릭 링크 : '" />
        <input type="url" id="promotionClickLink" v-model="sendData.clickLink" />
      </div>
      <div>
        <label v-text="'홍보 이미지 : '" />
        <input type="file" id="promotionImage" style="display:none" ref="fileEl" @change="fileChange" />
        <label for="promotionImage" v-text="'파일 선택'"/>
        {{ returnFileInfo }}
      </div>
      <div class="info">
        <span v-text="'작성자 : ' + sendData.writerName" />
      </div>
    </article>
  </section>
</template>

<script>
import { Store } from '../../store';
import { useToday, useFileSize } from '../../hook';
import editIcon from '../../img/icon/edit.png';
export default {
  props: {
    selectProcessData: Object,
  },
  data() {
    return {
      editIcon,
      categoryList: [
        { seq: '1', name: '사업홍보물', value: '1' },
        { seq: '2', name: '학습과정 모집요강', value: '2' },
        { seq: '3', name: '주민공모사업 홍보', value: '3' },
      ],
      sendData: {},
      sendFile: {},
      returnFileInfo: '',
    }
  },
  created() {
    this.sendData = {
      title: '',
      category: '1',
      startDT: useToday(),
      endDT: useToday(this.oneMonthLater),
      clickLink: 'https://',
      writerName: '관리자',
      writeDT: '2021-11-11',
    }
  },
  methods: {
    fileChange (e) {
      if (e.target.files.length == 0 || e.target.value == '') {
        this.sendFile = {};
        this.returnFileInfo = '';
        return;
      }
      let file = e.target.files[0];
      this.sendFile = file;
      this.returnFileInfo = `[파일명: ${file.name} / 용량: ${useFileSize(file.size)}]`;
    },
    save () {
      let data = this.sendData;
      let fileData = this.$refs.fileEl.files[0];

      if (data.title == '') {
        Store.setAlertYN(true);
        Store.setAlertInfo({icon: 'warn', title: '홍보물 등록', text: '제목을 입력해주세요.'})
        return;
      } else if (data.startDT == '') {
        Store.setAlertYN(true);
        Store.setAlertInfo({icon: 'warn', title: '홍보물 등록', text: '홍보 시작일을 입력해주세요.'})
        return;
      } else if (data.endDT == '') {
        Store.setAlertYN(true);
        Store.setAlertInfo({icon: 'warn', title: '홍보물 등록', text: '홍보 종료일을 입력해주세요.'})
        return;
      } else if (data.clickLink == '') {
        Store.setAlertYN(true);
        Store.setAlertInfo({icon: 'warn', title: '홍보물 등록', text: '홍보물 클릭링크를 입력해주세요.'})
        return;
      } else if (!fileData) {
        Store.setAlertYN(true);
        Store.setAlertInfo({icon: 'warn', title: '홍보물 등록', text: '홍보물 이미지를 등록해주세요.'})
        return;
      }

      console.log('data : ', data);
      console.log('fileData : ', fileData);
    }
  },
  computed: {
    oneMonthLater () {
      let date = new Date();
      date.setMonth(date.getMonth() + 1);
      return date;
    },
    fileView () {
      let name = this.sendFile.name;
      let size = useFileSize(this.sendFile.size);
      let result = `[파일명: ${name} / 용량: ${size}]`;
      return name ? result : '';
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
  border-radius: 10px;
  width: 700px;
  height: 312px;
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

    p {
      margin-right: 10px;
      display: flex;
      align-items: center;
      input[type="date"] {
        width: 140px;
      }
      &:last-of-type {margin-right: 0;}
    }

    label {
      margin-right: 8px;
      white-space: nowrap;
    }

    input, select {
      height: 30px;
      border: 1px solid #ddd;
      padding: 0 5px;
      font-size: 14px;
    }

    input#promotionTitle { width: calc(100% - 70px); }
    input#promotionClickLink { width: calc(100% - 101px); }
    label[for="promotionImage"]:last-of-type {
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
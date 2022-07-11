<template>
  <section class="sModal">
    <header>
      <article>
        <h1>
          <div class="icon" :style="{ backgroundImage: 'url(' + editIcon + ')' }" />
          <span>공청회 관리 > {{ selectPhObj.phTitle }}</span>
        </h1>
      </article>
      <article>
        <button @click="$emit('mediaListModalOpen', false)">
          <span v-for="x in 2" :key="x" />
        </button>
      </article>
    </header>

    <article class="contents">
      <section class="main">
        <table border="1">
          <thead>
            <tr>
              <th>
                <input type="checkbox" id="media-all-check" @click="mediaAllCheck" />
                <label for="media-all-check" />
              </th>
              <th v-for="title in titleList" :key="title" v-text="title"/>
            </tr>
          </thead>
          <tbody>
            <mediaList v-for="(item, idx) in list"
              :key="idx" :item="item" :idx="idx" :list="list"
              @setSelectCount="setSelectCount"
              @setSelectMediaObj="setSelectMediaObj"
              @setAddMediaModalYN="setAddMediaModalYN"
              @setMediaPreviewYN="setMediaPreviewYN"
              @setMediaPreviewTitle="setMediaPreviewTitle"
              @setMediaPreviewURL="setMediaPreviewURL"
            />
            <tr v-if="list.length == 0">
              <td colspan="8">리스트가 없습니다.</td>
            </tr>
          </tbody>
        </table>
      </section>
      
      <footer class="finder-footer">
        <div class="left">
          <button @click="addMediaModalOpen(true)">공청회 미디어 추가</button>
          <button v-if="selectCount != 0" @click="selectedDel" class="del">선택삭제</button>
          <span>선택 수 : {{ selectCount }}</span>
        </div>
        <div class="right">
          <span class="total-count">
            총 리스트 수 : {{ listCount }}
          </span>
        </div>
      </footer>
      
    </article>

    <div class="tempDiv" v-if="tempDivYN" />

    <addMediaModal
      v-if="addMediaModalYN"
      :selectMediaObj="selectMediaObj"
      @addMediaModalOpen="addMediaModalOpen"
    />
    
    <mediaPreview
      v-if="mediaPreviewYN"
      :mediaPreviewTitle="mediaPreviewTitle"
      :mediaPreviewURL="mediaPreviewURL"
      :modalInDarkDivClose="modalInDarkDivClose"
      @setMediaPreviewYN="setMediaPreviewYN"
    />

  </section>
</template>

<script>
import { useRest } from '../../hook';
import { Store } from '../../store';
import editIcon from '../../img/icon/edit.png';

export default {
  components: {
    addMediaModal: () => import('./addMediaModal'),
    mediaList: () => import('./mediaList'),
    mediaPreview: () => import('./mediaPreview.vue')
  },
  props: {
    modalInDarkDivOpen: Function,
    modalInDarkDivClose: Function,
    selectPhObj: Object,
  },
  data() {
    return {
      editIcon,
      titleList: ['N o', '미디어 제목', '미디어 파일명', '미디어 사이즈', '작 성 일', '작 성 자', ''],
      list: [],
      selectCount: 0,
      listCount: 0,
      selectMediaObj: {},
      addMediaModalYN: false,
      mediaPreviewYN: false,
      mediaPreviewTitle: '',
      mediaPreviewURL: '',
      tempDivYN: false,
    }
  },
  watch: {
    list(val) {
      this.listCount = val.length
    },
    mediaPreviewYN (val) {
      this.tempDivYN = val;
    },
    addMediaModalYN (val) {
      this.tempDivYN = val;
    }
  },
  created() {
    useRest({
      url: Store.globalURL + 'admin_phMediaList',
      success: (data) => {
        this.list = data
      }
    });
  },
  methods: {
    setSelectCount(val) {this.selectCount = val},
    setSelectMediaObj(val) {this.selectMediaObj = val},
    setAddMediaModalYN(val) {this.addMediaModalYN = val},
    setMediaPreviewYN(val, x, y) {
      this.mediaPreviewYN = val;
      this.mediaPreviewTitle = x;
      this.mediaPreviewURL = y;
    },
    setMediaPreviewTitle(val) {this.mediaPreviewTitle = val},
    setMediaPreviewURL(val) {this.mediaPreviewURL = val},
    mediaAllCheck(e) {
      let bool = e.target.checked;
      document.querySelectorAll('[id^="mediaChk_"]').forEach(el => el.checked = (bool ? true : false));
      this.selectCount = document.querySelectorAll('[id^="mediaChk_"]:checked').length;
    },
    selectedDel(e) {
      let els = document.querySelectorAll('[id^=mediaChk_');
      let arr = [];
      els.forEach(el => {
        let seq = el.id.split('_')[1];
        if (el.checked) {
          arr.push(seq);
        }
      });
      Store.setAlertYN(true);
      Store.setAlertInfo({
        icon: 'success',
        title: '공청회 미디어 관리',
        text: arr.join(', ') + '의 항목이 삭제되었습니다.'
      });
    },
    addMediaModalOpen(val) {
      this.selectMediaObj = {};
      this.addMediaModalYN = val;
    },
  },
  computed: {
    
  }
}
</script>

<style lang="scss" scoped>
section.sModal {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  height: 100%;
  border: 1px solid #aaa;
  /* border-radius: 10px; */
  background-color: #fff;
  z-index: 1800;
  overflow: hidden;
  user-select: none;
  box-shadow: 1px 2px 4px #00000050;
}
article.contents {
  overflow: auto;

  section.main {
    height: calc(100% - 60px);
    padding: 10px;
    overflow: auto;
  }

  table {
    border-collapse: collapse;
    width: 100%;
    border-color: #ccc;
    thead {
      position: sticky;
      top: -22px;
      z-index: 2;
      th {
        height: 40px;
        background-color: #eee;
        font-weight: 500;
        position: relative;
        white-space: nowrap;
        &:nth-of-type(1) {width: 50px;}
        &:nth-of-type(2) {width: 70px;}
        &:nth-of-type(3) {width: auto;}
        &:nth-of-type(4) {width: 240px;}
        &:nth-of-type(5) {width: 140px;}
        &:nth-of-type(6) {width: 130px;}
        &:nth-of-type(7) {width: 120px;}
        &:nth-of-type(8) {width: 120px;}
        label {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
        }
      }
    }
  }

  .finder-footer {
    height: 60px;
    border-top: 1px solid #aaa;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    padding: 0 20px;

    & > .left {
      display: flex;
      align-items: center;
      justify-content: flex-start;

      input {
        transform: translateY(1px);
        margin-right: 2px;
      }
    }
    button {
      padding: 5px 14px;
      margin-right: 10px;
      border: none;
      background-color: rgb(239, 239, 239);
      &.del {
        background-color: #ff575b;
        color: #fff;
      }
    }
    label {
      padding: 0 2px;
      margin: 4px;
    }
    select {
      padding: 0 5px;
      height: 29px;
      border: 1px solid #ddd;
      margin: 0 20px 0;
    }
    .total-count {
      margin-left: 20px;
    }
  }
}

.tempDiv {
  background-color: #00000050;
  position: fixed;
  transform: translate(-50%, -50%);
  left: 50%;
  top: 50%;
  width: 100%;
  height: 100%;
  z-index: 1800;
}
td {height: 34px;font-size: 14px;text-align: center;color: #999;}
</style>
<template>
  <section>
    <section class="main">
      <table border="1">
        <thead>
          <tr>
            <th>
              <input type="checkbox" id="ph-all-check" @click="phAllCheck" />
              <label for="ph-all-check" />
            </th>
            <th v-for="title in titleList" :key="title" v-text="title"/>
          </tr>
        </thead>
        <tbody>
          <phList v-for="(item, idx) in list"
            :key="idx" :item="item" :idx="idx" :list="list"
            :modalInDarkDivOpen="modalInDarkDivOpen"
            @addPhModalOpen="addPhModalOpen"
            @mediaListModalOpen="mediaListModalOpen"
            @setSelectPhObj="setSelectPhObj"
            @setSelectCount="setSelectCount"
            @setImgPreviewYN="setImgPreviewYN"
            @setImgPreviewTitle="setImgPreviewTitle"
            @setImgPreviewURL="setImgPreviewURL"
          />
          <tr v-if="list.length == 0">
            <td colspan="7">리스트가 없습니다.</td>
          </tr>
        </tbody>
      </table>
    </section>
    <footer class="finder-footer">
      <div class="left">
        <button @click="addPhModalOpen(true, true)">공청회 등록</button>
        <button v-if="selectCount != 0" @click="selectedDel" class="del">선택삭제</button>
        <span>선택 수 : {{ selectCount }}</span>
      </div>
      <div class="right">
        <span class="total-count">
          총 리스트 수 : {{ listCount }}
        </span>
      </div>
    </footer>

    <addPhModal 
      v-if="addPhModalYN"
      :selectPhObj="selectPhObj"
      @addPhModalOpen="addPhModalOpen"
    />

    <mediaListModal 
      v-if="mediaListModalYN"
      :selectPhObj="selectPhObj"
      :modalInDarkDivOpen="modalInDarkDivOpen"
      :modalInDarkDivClose="modalInDarkDivClose"
      @mediaListModalOpen="mediaListModalOpen"
    />

    <imgPreview
      v-if="imgPreviewYN"
      :imgPreviewTitle="imgPreviewTitle"
      :imgPreviewURL="imgPreviewURL"
      :modalInDarkDivClose="modalInDarkDivClose"
      @setImgPreviewYN="setImgPreviewYN"
    />

  </section>
</template>

<script>
import { useRest } from '../hook';
import { Store } from '../store';

export default {
  components: {
    phList: () => import('../pageSubComponents/PublicHearing/phList.vue'),
    addPhModal: () => import('../pageSubComponents/PublicHearing/addPhModal'),
    mediaListModal: () => import('../pageSubComponents/PublicHearing/mediaListModal.vue'),
    imgPreview: () => import('../pageSubComponents/PublicHearing/imgPreview.vue')
  },
  props: {
    sendData: Object,
    modalInDarkDivOpen: Function,
    modalInDarkDivClose: Function,
  },
  data() {
    return {
      titleList: ['N o', '공청회 제목', '공청회 대표 이미지', '작성일', '작성자', ''],
      listCount: 0,
      selectCount: 0,
      selectPhObj: {},
      list: [],
      addPhModalYN: false,
      mediaListModalYN: false,
      imgPreviewYN: false,
      imgPreviewTitle: '',
      imgPreviewURL: '',
    }
  },
  created() {
    this.getList();
  },
  methods: {
    getList () {
      useRest({
        url: Store.globalURL + 'admin_phList',
        success: (data) => {
          this.list = data;
          this.listCount = data.length;
        }
      });
    },
    setSelectPhObj(val) {this.selectPhObj = val},
    setSelectCount(val) {this.selectCount = val},
    setImgPreviewYN(val, x, y) {
      this.imgPreviewYN = val;
      this.imgPreviewTitle = x;
      this.imgPreviewURL = y;
    },
    setImgPreviewTitle(val) {this.imgPreviewTitle = val},
    setImgPreviewURL(val) {this.imgPreviewURL = val},
    phAllCheck(e) {
      let bool = e.target.checked;
      document.querySelectorAll('[id^="phChk_"]').forEach(el => el.checked = (bool ? true : false));
      this.selectCount = document.querySelectorAll('[id^="phChk_"]:checked').length;
    },
    addPhModalOpen(bool, newYN) {
      this.addPhModalYN = bool;
      (bool ? this.modalInDarkDivOpen : this.modalInDarkDivClose)();
      if (newYN) this.selectPhObj = {}
    },
    mediaListModalOpen(bool) {
      this.mediaListModalYN = bool;
      (bool ? this.modalInDarkDivOpen : this.modalInDarkDivClose)();
    },
    selectedDel(e) {
      let els = document.querySelectorAll('[id^=phChk_');
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
        title: '공청회 관리',
        text: arr.join(', ') + '의 항목이 삭제되었습니다.'
      });
    },
  },
  computed: {
    
  }
}
</script>

<style lang="scss" scoped>
.main {
  padding: 10px;
  height: calc(100% - 60px);
  overflow: auto;
  table {
    border-collapse: collapse;
    width: 100%;
    border-color: #ccc;
    table-layout: fixed;
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
        &:nth-of-type(1) {width: 50px; max-width: 50px;}
        &:nth-of-type(2) {width: 70px; max-width: 70px;}
        &:nth-of-type(3) {width: auto; min-width: 270px;}
        &:nth-of-type(4) {width: 150px;}
        &:nth-of-type(5) {width: 160px;}
        &:nth-of-type(6) {width: 130px;}
        &:nth-of-type(7) {width: 210px;}
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
td {height: 34px;font-size: 14px;text-align: center;color: #999;}
</style>
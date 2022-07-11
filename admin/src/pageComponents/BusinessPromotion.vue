<template>
  <section>
    <section class="main">
      <table border="1">
        <thead>
          <tr>
            <th>
              <input type="checkbox" id="pro-all-check" @click="proAllCheck" />
              <label for="pro-all-check" />
            </th>
            <th v-for="title in titleList" :key="title" v-text="title"/>
          </tr>
        </thead>
        <tbody>
          <promotionList v-for="(item, idx) in promotionList" 
            :key="idx" :item="item" :idx="idx" :promotionList="promotionList"
            @setSelectCount="setSelectCount"
            @setModalType="setModalType"
            @setSelectProObj="setSelectProObj"
            @setAddProModalYN="setAddProModalYN"
          />
          <tr v-if="promotionList.length == 0">
            <td colspan="9">리스트가 없습니다.</td>
          </tr>
        </tbody>
      </table>
    </section>
    <footer class="finder-footer">
      <div class="left">
        <button @click="addProModalOpen">홍보물 추가</button>
        <button @click="proCategoryModalOpen">카테고리 관리</button>
        <button v-if="selectCount != 0" @click="selectedDel">선택삭제</button>
        <span>선택 수 : {{ selectCount }}</span>
      </div>
      <div class="right">
        <span class="total-count">
          총 리스트 수 : {{ listCount }}
        </span>
      </div>
    </footer>

    <addPromotionModal 
      v-if="addProModalYN" 
      :modalType="modalType"
      :selectProObj="selectProObj"
      @setAddProModalYN="setAddProModalYN"
    />

    <promotionCategoryModal
      v-if="proCategoryModalYN"
      :promotionList="promotionList"
      @proCategoryModalClose="proCategoryModalClose"
    />

  </section>
</template>

<script>
import { useFetch, useRest } from '../hook';
import { Store } from '../store';

export default {
  components: {
    addPromotionModal: () => import('../pageSubComponents/BusinessPromotion/addPromotionModal'),
    promotionCategoryModal: () => import('../pageSubComponents/BusinessPromotion/promotionCategoryModal'),
    promotionList: () => import('../pageSubComponents/BusinessPromotion/promotionList'),
  },
  props: {
    sendData: Object,
    modalInDarkDivOpen: Function,
    modalInDarkDivClose: Function,
  },
  data() {
    return {
      titleList: ['N o', '카테고리', '제 목', '진행 시작일', '진행 마감일', '작 성 자', '작 성 일', ''],
      modalType: 'C',
      selectProObj: {},
      listCount: 0,
      selectCount: 0,
      promotionList: [],
      addProModalYN: false,
      proCategoryModalYN: false,
    }
  },
  created() {
    this.getList();
  },
  methods: {
    setModalType(val) {this.modalType = val},
    setSelectProObj(val) {this.selectProObj = val},
    setAddProModalYN(val) {this.addProModalYN = val},
    setSelectCount(val) {this.selectCount = val},
    getList() {
      // useFetch(Store.requestURL + 'admin_promotionList', 'GET', null, (data) => {
      //   this.promotionList = data;
      //   this.listCount = this.promotionList.length;
      // });
      useRest({
        url: Store.globalURL + 'admin_businessPromotionList',
        success: (data) => {
          this.promotionList = data;
          this.listCount = this.promotionList.length;
        }
      })
    },
    proAllCheck(e) {
      let bool = e.target.checked;
      document.querySelectorAll('[id^="proChk_"]').forEach(el => el.checked = (bool ? true : false));
      this.selectCount = document.querySelectorAll('[id^="proChk_"]:checked').length;
    },
    addProModalOpen(e) {
      this.modalType = 'C';
      this.selectProObj = {};
      this.addProModalYN = true;
    },
    proCategoryModalOpen(e) {
      this.proCategoryModalYN = true;
      this.modalInDarkDivOpen();
    },
    proCategoryModalClose(e) {
      this.proCategoryModalYN = false;
      this.modalInDarkDivClose();
    },
    selectedDel(e) {
      let els = document.querySelectorAll('[id^=proChk_');
      let arr = [];
      els.forEach(el => {
        let seq = el.id.split('_')[1];
        if (el.checked) {
          arr.push(seq);
        }
      });

      // fetch('http://bpcp1.iptime.org:8080/admin_proDataDEL',{
      //   method: 'POST',
      //   body: new URLSearchParams({proSeq: 12}),
      // }).then((data) => {
      //   console.log(data);
      //   this.getList();
      // });

      Store.setAlertYN(true);
      Store.setAlertInfo({
        icon: 'success',
        title: '공지사항',
        text: arr.join(', ') + '의 항목이 삭제되었습니다.'
      });
    },
  }
}
</script>

<style lang="scss" scoped>
.main {
  padding: 20px;
  height: calc(100% - 60px);
  overflow: auto;
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
        &:nth-of-type(1) {width: 50px;}
        &:nth-of-type(2) {width: 60px;}
        &:nth-of-type(3) {width: 150px;}
        &:nth-of-type(4) {width: auto;}
        &:nth-of-type(5) {width: 110px;}
        &:nth-of-type(6) {width: 110px;}
        &:nth-of-type(7) {width: 110px;}
        &:nth-of-type(8) {width: 110px;}
        &:nth-of-type(9) {width: 100px;}
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
  border-top: 1px solid #ddd;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  padding: 0 20px;
  button {
    padding: 5px 14px;
    margin-right: 5px;
    border: none;
    background-color: #efefef;
  }
  label {
    padding: 0 2px;
    margin: 4px;
  }
  .total-count {
    margin-left: 20px;
  }
}
td {height: 34px;font-size: 14px;text-align: center;color: #999;}
</style>
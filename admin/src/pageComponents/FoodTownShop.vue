<template>
  <section>
    <section class="main">
      <table border="1">
        <thead>
          <tr>
            <th>
              <input type="checkbox" id="shop-all-check" @click="shopAllCheck" />
              <label for="shop-all-check" />
            </th>
            <th v-for="title in titleList" :key="title" v-text="title"/>
          </tr>
        </thead>
        <tbody>
          <shopList v-for="(item, idx) in shopList" 
            :key="idx" :item="item" :idx="idx" :shopList="shopList"
            @setSelectCount="setSelectCount"
            @setModalType="setModalType"
            @setSelectShopObj="setSelectShopObj"
            @setAddShopModalYN="setAddShopModalYN"
          />
          <tr v-if="shopList.length == 0">
            <td colspan="7">리스트가 없습니다.</td>
          </tr>
        </tbody>
      </table>
    </section>
    <footer class="finder-footer">
      <div class="left">
        <button @click="addShopModalOpen">상점 추가</button>
        <button v-if="selectCount != 0" @click="selectedDel">선택삭제</button>
        <span>선택 수 : {{ selectCount }}</span>
      </div>
      <div class="right">
        <span class="total-count">
          총 리스트 수 : {{ listCount }}
        </span>
      </div>
    </footer>

    <addShopModal 
      v-if="addShopModalYN" 
      :modalType="modalType"
      :selectShopObj="selectShopObj"
      @getList="getList"
      @add-shop-modal-close="addShopModalClose"
    />

  </section>
</template>

<script>
import { useFetch, useRest } from '../hook';
import { Store } from '../store';

export default {
  components: {
    addShopModal: () => import('../pageSubComponents/FoodTownShop/addShopModal'),
    shopList: () => import('../pageSubComponents/FoodTownShop/shopList')
  },
  props: {
    sendData: Object,
    modalInDarkDivOpen: Function,
    modalInDarkDivClose: Function,
  },
  data() {
    return {
      titleList: ['N o', '상 점 명', '상 점 주', '상 점 소 개', '등 록 일', '위 치'],
      modalType: 'C',
      selectShopObj: {},
      listCount: 0,
      selectCount: 0,
      shopList: [],
      addShopModalYN: false,
    }
  },
  created() {
    this.getList();
  },
  methods: {
    setModalType(val) {this.modalType = val},
    setSelectShopObj(val) {this.selectShopObj = val},
    setAddShopModalYN(val) {this.addShopModalYN = val},
    setSelectCount(val) {this.selectCount = val},

    getList() {
      useRest({
        url: Store.globalURL + 'admin_foodShopList',
        success: (data) => {
          this.shopList = data;
          this.listCount = this.shopList.length;
        }
      })
    },
    shopAllCheck(e) {
      let bool = e.target.checked;
      document.querySelectorAll('[id^="shopChk_"]').forEach(el => el.checked = (bool ? true : false));
      this.selectCount = document.querySelectorAll('[id^="shopChk_"]:checked').length;
    },
    addShopModalOpen(e) {
      this.modalType = 'C';
      this.selectShopSeq = '';
      this.addShopModalYN = true;
    },
    addShopModalClose(e) {
      this.addShopModalYN = false;
    },
    selectedDel(e) {
      let els = document.querySelectorAll('[id^=shopChk_');
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
        title: '상점 관리',
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
        &:nth-of-type(1) {width: 60px;}
        &:nth-of-type(2) {width: 70px;}
        &:nth-of-type(3) {width: 200px;}
        &:nth-of-type(4) {width: 120px;}
        &:nth-of-type(5) {width: auto;}
        &:nth-of-type(6) {width: 130px;}
        &:nth-of-type(7) {width: 120px;}
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
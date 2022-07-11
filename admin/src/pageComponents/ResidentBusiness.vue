<template>
  <section>
    <section class="main">
      <table border="1">
        <thead>
          <tr>
            <th>
              <input type="checkbox" id="resiBsns-all-check" @click="resiBsnsAllCheck" />
              <label for="resiBsns-all-check" />
            </th>
            <th v-for="title in titleList" :key="title" v-text="title"/>
          </tr>
        </thead>
        <tbody>
          <businessList v-for="(item, idx) in resiBsnsList" :key="idx"
            :item="item" :idx="idx" :resiBsnsList="resiBsnsList"
            :modalInDarkDivOpen="modalInDarkDivOpen"
            @setSelectCount="setSelectCount"
            @setModalType="setModalType"
            @selectResiBsnsData="selectResiBsnsData"
            @setAddResiBsnsModalYN="setAddResiBsnsModalYN"
            @setResiBsnsRequestModalYN="setResiBsnsRequestModalYN"
          />
          <tr v-if="resiBsnsList.length == 0">
            <td colspan="7">리스트가 없습니다.</td>
          </tr>
        </tbody>
      </table>
    </section>
    <footer class="finder-footer">
      <div class="left">
        <button @click="addResiBsnsModalOpen">공모사업 추가</button>
        <button v-if="selectCount != 0" @click="selectedDel">선택삭제</button>
        <span>선택 수 : {{ selectCount }}</span>
      </div>
      <div class="right">
        <span class="total-count">
          총 리스트 수 : {{ listCount }}
        </span>
      </div>
    </footer>

    <addResiBsnsModal 
      v-if="addResiBsnsModalYN" 
      :modalType="modalType"
      :selectResiBsnsData="selectResiBsnsData"
      @addResiBsnsModalOpen="addResiBsnsModalOpen"
    />

    <resiBsnsRequestModal
      v-if="resiBsnsRequestModalYN" 
      :selectResiBsnsData="selectResiBsnsData"
      :resiBsnsRequestNoModalYN="resiBsnsRequestNoModalYN"
      @resiBsnsRequestNoModalOpen="resiBsnsRequestNoModalOpen"
      @resiBsnsRequestModalClose="resiBsnsRequestModalClose"
    />

    <resiBsnsRequestNoModal
      v-if="resiBsnsRequestNoModalYN"
      :selectResiBsnsData="selectResiBsnsData"
      @resiBsnsRequestNoModalOpen="resiBsnsRequestNoModalOpen"
      @resiBsnsRequestNoModalClose="resiBsnsRequestNoModalClose"
    />

  </section>
</template>

<script>
import { useRest } from '../hook';
import { Store } from '../store';

export default {
  components: {
    addResiBsnsModal: () => import('../pageSubComponents/ResiBsns/addResiBsnsModal'),
    resiBsnsRequestModal: () => import('../pageSubComponents/ResiBsns/resiBsnsRequestModal'),
    resiBsnsRequestNoModal: () => import('../pageSubComponents/ResiBsns/resiBsnsRequestNoModal.vue'),
    businessList: () => import('../pageSubComponents/ResiBsns/businessList.vue')
  },
  props: {
    sendData: Object,
    modalInDarkDivOpen: Function,
    modalInDarkDivClose: Function,
  },
  data() {
    return {
      titleList: ['N o', '사 업 제 목', '작 성 자', '작 성 일', '신청자 현황', '위 치'],
      modalType: 'C',
      selectResiBsnsData: {},
      listCount: 0,
      selectCount: 0,
      resiBsnsList: [],
      addResiBsnsModalYN: false,
      resiBsnsRequestModalYN: false,
      resiBsnsRequestNoModalYN: false
    }
  },
  created() {
    this.getList();
  },
  methods: {
    setSelectCount(val) {this.selectCount = val},
    setModalType(val) {this.modalType = val},
    setSelectResiBsnsData(val) {this.selectResiBsnsData = val},
    setAddResiBsnsModalYN(val) {this.addResiBsnsModalYN = val},
    setResiBsnsRequestModalYN(val) {this.resiBsnsRequestModalYN = val},
    getList() {
      useRest({
        url: Store.globalURL + 'admin_resiBsnsList',
        success: (data) => {
          this.resiBsnsList = data
          this.listCount = this.resiBsnsList.length;
        }
      });
    },
    resiBsnsAllCheck(e) {
      let bool = e.target.checked;
      document.querySelectorAll('[id^="resiBsnsChk_"]').forEach(el => el.checked = (bool ? true : false));
      this.selectCount = document.querySelectorAll('[id^="resiBsnsChk_"]:checked').length;
    },
    addResiBsnsModalOpen(bool) {
      this.modalType = 'C';
      this.selectResiBsnsData = {};
      this.addResiBsnsModalYN = bool;
      (bool) ? (
        this.modalInDarkDivOpen
      ) : (
        this.modalInDarkDivClose
      )();
    },
    resiBsnsRequestModalClose() {
      this.selectResiBsnsData = {};
      this.resiBsnsRequestModalYN = false;
      this.modalInDarkDivClose();
    },
    resiBsnsRequestNoModalOpen() {
      this.resiBsnsRequestNoModalYN = true;
      this.modalInDarkDivOpen();
    },
    resiBsnsRequestNoModalClose() {
      this.resiBsnsRequestNoModalYN = false;
    },
    selectedDel(e) {
      let els = document.querySelectorAll('[id^=resiBsnsChk_');
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
        &:nth-of-type(1) {width: 50px;}
        &:nth-of-type(2) {width: 80px;}
        &:nth-of-type(3) {width: auto;}
        &:nth-of-type(4) {width: 160px;}
        &:nth-of-type(5) {width: 160px;}
        &:nth-of-type(6) {width: 120px;}
        &:nth-of-type(7) {width: 105px;}
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
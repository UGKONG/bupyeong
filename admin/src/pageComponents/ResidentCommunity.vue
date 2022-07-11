<template>
  <section>
    <section class="main">
      <table border="1">
        <thead>
          <tr>
            <th>
              <input type="checkbox" id="comm-all-check" @click="commAllCheck" />
              <label for="comm-all-check" />
            </th>
            <th v-for="item in titleList" :key="item" v-text="item" />
            <th colspan="2" />
          </tr>
        </thead>
        <tbody>
          <commList v-for="(item, idx) in commList"
            :key="idx" :item="item" :idx="idx" :commList="commList"
            :modalInDarkDivOpen="modalInDarkDivOpen"
            @setSelectCount="setSelectCount"
            @editModalOpen="editModalOpen"
            @setSelectCommData="setSelectCommData"
            @setRequestModalYN="setRequestModalYN"
            @setResidentModalYN="setResidentModalYN"
          />
          <tr v-if="commList.length == 0">
            <td colspan="7">리스트가 없습니다.</td>
          </tr>
        </tbody>
      </table>
    </section>
    <footer class="finder-footer">
      <div class="left">
        <button @click="addModalOpen">공동체 추가</button>
        <button v-if="selectCount != 0" @click="selectedDel">선택삭제</button>
        <span>선택 수 : {{ selectCount }}</span>
      </div>
      <div class="right">
        <span class="total-count">
          총 리스트 수 : {{ listCount }}
        </span>
      </div>
    </footer>

    <addCommModal 
      v-if="addCommModalYN" 
      :modalType="modalType"
      :selectCommData="selectCommData"
      @addModalOpen="addModalOpen"
    />

    <requestModal 
      v-if="requestModalYN"
      :selectCommData="selectCommData"
      @subModalClose="subModalClose"
    />

    <residentModal 
      v-if="residentModalYN"
      :selectCommData="selectCommData"
      @subModalClose="subModalClose"
    />

  </section>
</template>

<script>
import { Store } from '../store';
import { useRest } from '../hook';

export default {
  components: {
    addCommModal: () => import('../pageSubComponents/ResiComm/addCommModal'),
    requestModal: () => import('../pageSubComponents/ResiComm/requestModal'),
    residentModal: () => import('../pageSubComponents/ResiComm/residentModal'),
    commList: () => import('../pageSubComponents/ResiComm/commList'),
  },
  props: {
    sendData: Object,
    modalInDarkDivOpen: Function,
    modalInDarkDivClose: Function,
  },
  data() {
    return {
      titleList: ['N o', '공동체명', '공동체장', '개설일'],
      modalType: 'C',
      selectCommData: {},
      listCount: 0,
      selectCount: 0,
      commList: [],
      addCommModalYN: false,
      requestModalYN: false,
      residentModalYN: false,
    }
  },
  created() {
    this.getList();
  },
  methods: {
    setModalType(val) {this.modalType = val},
    setSelectCommData(val) {this.selectCommData = val},
    setSelectCount(val) {this.selectCount = val},
    setAddCommModalYN(val) {this.addCommModalYN = val},
    setRequestModalYN(val) {this.requestModalYN = val},
    setResidentModalYN(val) {this.residentModalYN = val},

    getList() {
      useRest({
        url: Store.globalURL + 'admin_resiCommList',
        success: (data) => {
          this.commList = data;
          this.listCount = this.commList.length;
        }
      });
    },

    addModalOpen(Y) {
      if (Y) {
        this.modalType = 'C';
        this.selectCommData = {};
        this.addCommModalYN = true;
      } else {
        this.addCommModalYN = false;
      }
    },
    editModalOpen() {
      this.modalType = 'U';
      this.selectCommData = {};
      this.addCommModalYN = true;
    },

    subModalClose() {
      this.requestModalYN = false;
      this.residentModalYN = false;
      this.modalInDarkDivClose();
    },

    commAllCheck(e) {
      let bool = e.target.checked;
      document.querySelectorAll('[id^="commChk_"]').forEach(el => el.checked = (bool ? true : false));
      this.selectCount = document.querySelectorAll('[id^="commChk_"]:checked').length;
    },
    selectedDel(e) {
      let els = document.querySelectorAll('[id^=commChk_');
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
        title: '과정 관리',
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
        white-space: nowrap;
        &:nth-of-type(1) {width: 44px;}
        &:nth-of-type(2) {width: 60px;}
        &:nth-of-type(3) {width: auto;}
        &:nth-of-type(4) {width: 120px;}
        &:nth-of-type(5) {width: 120px;}
        &:nth-of-type(6) {width: 250px;}
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
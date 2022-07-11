<template>
  <section>
    <section class="main">
      <table border="1">
        <thead>
          <tr>
            <th>
              <input type="checkbox" id="contest-all-check" @click="contestAllCheck" />
              <label for="contest-all-check" />
            </th>
            <th v-for="title in titleList" :key="title" v-text="title"/>
          </tr>
        </thead>
        <tbody>
          <contestList v-for="(item, idx) in contestList" 
            :key="idx" :item="item" :idx="idx" :contestList="contestList"
            @setSelectCount="setSelectCount"
            @setModalType="setModalType"
            @setSelectContestObj="setSelectContestObj"
            @setAddContestModalYN="setAddContestModalYN"
          />
          <tr v-if="contestList.length == 0">
            <td colspan="8">리스트가 없습니다.</td>
          </tr>
        </tbody>
      </table>
    </section>
    <footer class="finder-footer">
      <div class="left">
        <button @click="addContestModalOpen">공모일정 추가</button>
        <button v-if="selectCount != 0" @click="selectedDel">선택삭제</button>
        <span>선택 수 : {{ selectCount }}</span>
      </div>
      <div class="right">
        <span class="total-count">
          총 리스트 수 : {{ listCount }}
        </span>
      </div>
    </footer>

    <addContestModal 
      v-if="addContestModalYN" 
      :modalType="modalType"
      :selectContestObj="selectContestObj"
      @getList="getList"
      @add-contest-modal-close="addContestModalClose"
    />

  </section>
</template>

<script>
import { useFetch, useRest } from '../hook';
import { Store } from '../store';

export default {
  components: {
    addContestModal: () => import('../pageSubComponents/ContestSchedule/addContestModal'),
    contestList: () => import('../pageSubComponents/ContestSchedule/contestList'),
  },
  props: {
    sendData: Object,
    modalInDarkDivOpen: Function,
    modalInDarkDivClose: Function,
  },
  data() {
    return {
      titleList: ['N o', '공모일정 제목', '공모 시작일', '공모 마감일', '작 성 자', '작 성 일', ''],
      modalType: 'C',
      selectContestObj: '',
      listCount: 0,
      selectCount: 0,
      contestList: [],
      addContestModalYN: false,
    }
  },
  created() {
    this.getList();
  },
  methods: {
    setModalType(val) {this.modalType = val},
    setSelectContestObj(val) {this.selectContestObj = val},
    setAddContestModalYN(val) {this.addContestModalYN = val},
    setSelectCount(val) {this.selectCount = val},
    getList() {
      useRest({
        url: Store.globalURL + 'admin_contestList',
        success: (data) => {
          this.contestList = data;
          this.listCount = this.contestList.length;
        }
      })
    },
    contestAllCheck(e) {
      let bool = e.target.checked;
      document.querySelectorAll('[id^="contestChk_"]').forEach(el => el.checked = (bool ? true : false));
      this.selectCount = document.querySelectorAll('[id^="contestChk_"]:checked').length;
    },
    addContestModalOpen(e) {
      this.modalType = 'C';
      this.selectContestSeq = '';
      this.addContestModalYN = true;
    },
    addContestModalClose(e) {
      this.addContestModalYN = false;
    },
    selectedDel(e) {
      let els = document.querySelectorAll('[id^=contestChk_');
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
        &:nth-of-type(3) {width: auto;}
        &:nth-of-type(4) {width: 120px;}
        &:nth-of-type(5) {width: 120px;}
        &:nth-of-type(6) {width: 130px;}
        &:nth-of-type(7) {width: 120px;}
        &:nth-of-type(8) {width: 100px;}
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
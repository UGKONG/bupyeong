<template>
  <section>
    <section class="main">
      <table border="1">
        <thead>
          <tr>
            <th>
              <input type="checkbox" id="business-all-check" @click="businessAllCheck" />
              <label for="business-all-check" />
            </th>
            <th v-for="title in titleList" :key="title" v-text="title"/>
          </tr>
        </thead>
        <tbody>
          <businessList v-for="(item, idx) in businessFilterList"
            :key="idx" :item="item" :idx="idx" :businessList="businessList"
            :recordListModalOpen="recordListModalOpen"
            @setSelectCount="setSelectCount"
            @setSelectBusinessData="setSelectBusinessData"
          />
          <tr v-if="businessList.length == 0">
            <td colspan="5">리스트가 없습니다.</td>
          </tr>
        </tbody>
      </table>
    </section>
    <footer class="finder-footer">
      <div class="left">
        <button @click="addBusinessModalOpen">사업추가</button>
        <button v-if="selectCount != 0" @click="selectedDel" class="del">선택삭제</button>
        <span>선택 수 : {{ selectCount }}</span>
        <select v-model="selectYear">
          <option value="" v-text="'년도별 보기'" />
          <option v-for="year in yearList" :key="year" :value="year" v-text="year + '년'" />
        </select>
        <p>
          <label>
            <input type="radio" name="orderType" value="date" v-model="orderType" />
            <span>최신순</span>
          </label>
          <label>
            <input type="radio" name="orderType" value="name" v-model="orderType" />
            <span>이름순</span>
          </label>
        </p>
      </div>
      <div class="right">
        <span class="total-count">
          총 리스트 수 : {{ listCount }}
        </span>
      </div>
    </footer>

    <addBusinessModal 
      v-if="addBusinessModalYN"
      @addBusinessModalOpen="addBusinessModalOpen"
    />

    <recordListModal 
      v-if="recordListModalYN"
      :selectBusinessData="selectBusinessData"
      :modalInDarkDivOpen="modalInDarkDivOpen"
      :modalInDarkDivClose="modalInDarkDivClose"
      @recordListModalOpen="recordListModalOpen"
    />

  </section>
</template>

<script>
import { useRest } from '../hook';
import { Store } from '../store';
import { useOrderArr } from '../hook';

export default {
  components: {
    addBusinessModal: () => import('../pageSubComponents/BusinessRecord/addBusinessModal'),
    recordListModal: () => import('../pageSubComponents/BusinessRecord/recordListModal'),
    businessList: () => import('../pageSubComponents/BusinessRecord/businessList'),
  },
  props: {
    sendData: Object,
    modalInDarkDivOpen: Function,
    modalInDarkDivClose: Function,
  },
  data() {
    return {
      titleList: ['N o', '사업 제목', '생 성 자', '작 성 일'],
      yearList: [],
      selectYear: '',
      selectBusinessData: {},
      listCount: 0,
      selectCount: 0,
      businessList: [],
      addBusinessModalYN: false,
      recordListModalYN: false,
      orderType: 'date',
    }
  },
  watch: {
    businessFilterList(val) {
      this.listCount = val.length;
    },
  },
  created() {

    useRest({
      url: Store.globalURL + 'admin_businessList',
      success: (data) => {
        this.businessList = data
      }
    });

    let date = new Date();
    let startYear = 2012;
    let endYear = date.getFullYear();
    for (let year = startYear; year <= endYear; year++) {
      this.yearList.unshift(year);
    }
  },
  methods: {
    setSelectCount(val) {this.selectCount = val},
    setSelectBusinessData(val) {this.selectBusinessData = val},
    businessAllCheck(e) {
      let bool = e.target.checked;
      document.querySelectorAll('[id^="businessChk_"]').forEach(el => el.checked = (bool ? true : false));
      this.selectCount = document.querySelectorAll('[id^="businessChk_"]:checked').length;
    },
    addBusinessModalOpen(bool) {
      this.addBusinessModalYN = bool;
      (bool ? this.modalInDarkDivOpen : this.modalInDarkDivClose)();
    },
    recordListModalOpen(bool) {
      this.recordListModalYN = bool;
      (bool ? this.modalInDarkDivOpen : this.modalInDarkDivClose)();
      if (!bool) this.selectBusinessData = {};
    },
    selectedDel(e) {
      let els = document.querySelectorAll('[id^=businessChk_');
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
        title: '사업기록',
        text: arr.join(', ') + '의 항목이 삭제되었습니다.'
      });
    },
  },
  computed: {
    businessFilterList() {
      let newArr = [...this.businessList];

      newArr = this.orderType == 'date' ? (
        useOrderArr(newArr, 'writeDT', 'down', 'string')
      ) : (
        useOrderArr(newArr, 'title', 'up', 'string')
      )

      if (this.selectYear == '') return newArr;
      return newArr.filter(x => x.writeDT.split('-')[0] == this.selectYear);
    }
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
        &:nth-of-type(2) {width: 70px;}
        &:nth-of-type(3) {width: auto;}
        &:nth-of-type(4) {width: 170px;}
        &:nth-of-type(5) {width: 170px;}
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
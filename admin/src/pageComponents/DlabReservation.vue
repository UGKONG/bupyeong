<template>
  <section>
    <article class="contents">
      <div class="header">
        <h3>장소 선택 : </h3>
        <ul>
          <positionList :item="dlabPositionAll"
            :selectPositionSeq="selectPositionSeq"
            @setSelectPositionSeq="setSelectPositionSeq"
          />
          <positionList v-for="(item, idx) in positionList"
            :selectPositionSeq="selectPositionSeq"
            @setSelectPositionSeq="setSelectPositionSeq"
            :key="idx" :item="item"
          />
        </ul>
      </div>
      <table class="ui celled table">
        <thead>
          <tr>
            <th v-for="(item, idx) in title" v-text="item"
              :key="idx" :colspan="title.length == idx + 1 ? 2 : 1" 
            />
          </tr>
        </thead>
        <tbody>
          <reservationList v-for="(item, idx) in reservationList" 
            :key="idx" :item="item" :idx="idx"
          />
          <tr class="nullList" v-if="nullList">
            <td :colspan="allCol">신청자가 없습니다.</td>
          </tr>
        </tbody>
      </table>
    </article>
    <footer class="finder-footer">
      <div class="left">
        <button @click="positionModalOpen">장소 관리</button>
        <button v-if="selectCount != 0" @click="selectedDel">선택삭제</button>
      </div>
      <div class="right">
        <span class="total-count">
          <span class="allCount">전체 {{ allCount }}</span>
          <span class="yesCount">수락 {{ yesCount }}</span>
          <span class="noCount">거절 {{ noCount }}</span>
          <span class="yetCount">신청 {{ yetCount }}</span>
        </span>
      </div>
    </footer>

    <positionModal
      v-if="positionModalYN"
      @positionModalClose="positionModalClose"
    />
  </section>
</template>

<script>
import { useRest } from '../hook';
import { Store } from '../store';
import editIcon from '../img/icon/edit.png';

export default {
  components: {
    reservationList: () => import('../pageSubComponents/DlabReservation/reservationList.vue'),
    positionList: () => import('../pageSubComponents/DlabReservation/positionList.vue'),
    positionModal: () => import('../pageSubComponents/DlabReservation/positionModal.vue')
  },
  props: {
    sendData: Object,
    modalInDarkDivOpen: Function,
    modalInDarkDivClose: Function,
  },
  data() {
    return {
      editIcon,
      title: ['N o', '신청자명', '연락처', '장 소', '예약일', '예약시간', '상태'],
      selectCount: 0,
      positionModalYN: false,
      // 과정 데이터 불러오기
      reservationList: [],
      positionList: [],
      selectPositionSeq: 0,
      dlabPositionAll: {poSeq: 0, poName: '전체'},
    }
  },
  watch: {
    selectPositionSeq (val, oldVal) {
      this.getReservationList(val);
    }
  },
  created () {

    useRest({  // GET 장소
      url: Store.globalURL + 'admin_dlabPositionList',
      success: (positionData) => {
        this.positionList = positionData;
      }
    });
    
    this.getReservationList(this.dlabPositionAll.poSeq);

  },
  methods: {
    setSelectPositionSeq (val) {
      this.selectPositionSeq = val;
    },
    getReservationList (poSeq) {
      useRest({  // GET 해당 장소 예약자 리스트
        url: Store.globalURL + 'admin_dlabReservationList?' + (poSeq != 0 ? 'dlabPositionSeq=' + poSeq : ''),
        success: (data) => this.reservationList = data
      });
    },
    positionModalOpen () {
      this.positionModalYN = true;
      this.modalInDarkDivOpen();
    },
    positionModalClose () {
      this.positionModalYN = false;
      this.modalInDarkDivClose();
    },
    selectedDel () {

    }
  },
  computed: {
    nullList () {
      return this.reservationList.length == 0;
    },
    allCol () {
      return this.title.length + 1;
    },
    allCount () {
      return (this.reservationList).length;
    },
    yesCount () {
      return (this.reservationList.filter(x => x.reservationState == 1)).length;
    },
    noCount () {
      return (this.reservationList.filter(x => x.reservationState == 2)).length;
    },
    yetCount () {
      return (this.reservationList.filter(x => x.reservationState == 0)).length;
    },
  },
}
</script>

<style lang="scss" scoped>
section.sModal {
  position: fixed;
  left: 50%;
  top: 50%;
  width: 100%;
  height: 100%;
  transform: translate(-50%, -50%);
  border: 1px solid #aaa;
  background-color: #fff;
  z-index: 1800;
  overflow: hidden;
  user-select: none;
  box-shadow: 1px 2px 4px #00000050;
}
article.contents {
  overflow: auto;
  
  div.header {
    padding: 20px 18px 10px 18px;
    overflow: auto;
    display: flex;
    align-items: center;
    justify-content: flex-start;

    h3 {
      font-size: 17px;
      font-weight: 400;
      width: 80px;
    }
    ul {
      display: flex;
      align-items: center;
      justify-content: flex-start;
      height: 100%;
      margin: 0 !important;
    }
  }

  table {
    table-layout: fixed;
    border-radius: 0;
    thead {
      position: sticky;
      top: -1px;
      z-index: 2;
    }
    th {
      background-color: #f9fafb;
      text-align: center;
      &:nth-of-type(1) {width: 80px;}
    }
    .nullList {
      text-align: center;
      color: #777;
      padding: 7px 0;
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
    font-weight: 500;
  }

  .allCount, .yesCount, .noCount, .yetCount {
    display: inline-block;
    margin-left: 14px;
  }
  
  .allCount { color: #513dde }
  .yesCount { color: darkgreen }
  .noCount { color: orangered }
  .yetCount { color: #555 }
}
</style>
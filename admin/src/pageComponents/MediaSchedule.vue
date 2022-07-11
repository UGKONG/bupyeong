<template>
  <section>
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
          <scheduleList v-for="(item, idx) in scheduleList" 
            :key="idx" :item="item" :idx="idx" :staffYN="staffYN"
            :scheduleList="scheduleList"
            :modalInDarkDivOpen="modalInDarkDivOpen"
            @setSelectCount="setSelectCount"
            @setModalType="setModalType"
            @setSelectMediaObj="setSelectMediaObj"
            @setAddScheduleModalYN="setAddScheduleModalYN"
            @setMediaPreviewYN="setMediaPreviewYN"
          />
          <tr v-if="scheduleList.length == 0">
            <td colspan="11">리스트가 없습니다.</td>
          </tr>
        </tbody>
      </table>
    </section>
    <footer class="finder-footer">
      <div class="left">
        <button @click="addScheduleModalOpen">미디어 신청</button>
        <button v-if="selectCount != 0" @click="selectedDel">선택삭제</button>
        <span>선택 수 : {{ selectCount }}</span>
        <label for="selectYear" style="margin-left: 20px;">필터 : </label>
        <select id="selectYear" style="height: 30px; width: 70px;">
          <option v-for="i in 5" :key="i" :value="2019 + i" v-text="2019 + i + '년'" />
        </select>
        <select id="selectMonth" style="height: 30px; width: 60px;">
          <option v-for="i in 12" :key="i" :value="i" v-text="i + '월'" />
        </select>
      </div>
      <div class="right">
        <span class="total-count">
          총 리스트 수 : {{ listCount }}
        </span>
      </div>
    </footer>

    <addScheduleModal
      v-if="addScheduleModalYN" 
      :modalType="modalType"
      :selectMediaObj="selectMediaObj"
      @getList="getList"
      @add-media-modal-close="addScheduleModalClose"
      :modalInDarkDivOpen="modalInDarkDivOpen"
      :modalInDarkDivClose="modalInDarkDivClose"
    />

    <mediaPreview
      v-if="mediaPreviewYN"
      :mediaPreviewTitle="mediaPreviewTitle"
      :mediaPreviewURL="mediaPreviewURL"
      :modalInDarkDivOpen="modalInDarkDivOpen"
      :modalInDarkDivClose="modalInDarkDivClose"
      @setMediaPreviewYN="setMediaPreviewYN"
    />

  </section>
</template>

<script>
import { useFetch, useRest } from '../hook';
import { Store } from '../store';

export default {
  components: {
    addScheduleModal: () => import('../pageSubComponents/MediaSchedule/addScheduleModal'),
    scheduleList: () => import('../pageSubComponents/MediaSchedule/scheduleList'),
    mediaPreview: () => import('../pageSubComponents/MediaSchedule/mediaPreview'),
  },
  props: {
    sendData: Object,
    modalInDarkDivOpen: Function,
    modalInDarkDivClose: Function,
  },
  data() {
    return {
      staffYN: true,
      titleList: ['N o', '제 목', '홍보일', '선택 시간', '재생 방법', '재생 속성', '상 태', '작성일', '작성자', ''],
      modalType: 'C',
      selectMediaObj: {},
      listCount: 0,
      selectCount: 0,
      scheduleList: [],
      addScheduleModalYN: false,
      mediaPreviewYN: false,
      mediaPreviewURL: '',
      mediaPreviewTitle: '',
    }
  },
  created() {
    this.getList();
  },
  methods: {
    setModalType(val) {this.modalType = val},
    setSelectMediaObj(val) {this.selectMediaObj = val},
    setSelectCount(val) {this.selectCount = val},
    setAddScheduleModalYN(val) {this.addScheduleModalYN = val},
    setMediaPreviewYN(val, url, title) {
      this.mediaPreviewYN = val; 
      this.mediaPreviewURL = url;
      this.mediaPreviewTitle = title;
    },

    getList() {
      useRest({
        url: Store.globalURL + 'admin_mediaScheduleList',
        success: (data) => {
          this.scheduleList = data;
          this.listCount = this.scheduleList.length;
        }
      });
    },
    mediaAllCheck(e) {
      let bool = e.target.checked;
      document.querySelectorAll('[id^="mediaChk_"]').forEach(el => el.checked = (bool ? true : false));
      this.selectCount = document.querySelectorAll('[id^="mediaChk_"]:checked').length;
    },
    addScheduleModalOpen(e) {
      this.modalType = 'C';
      this.selectMediaSeq = '';
      this.addScheduleModalYN = true;
    },
    addScheduleModalClose(e) {
      this.addScheduleModalYN = false;
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
        title: '미디어 스케줄 관리',
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
        &:nth-of-type(5) {width: 120px;}
        &:nth-of-type(6) {width: 110px;}
        &:nth-of-type(7) {width: 110px;}
        &:nth-of-type(8) {width: 120px;}
        &:nth-of-type(9) {width: 120px;}
        &:nth-of-type(10) {width: 120px;}
        &:nth-of-type(11) {width: 120px;}
        &:nth-of-type(12) {width: 100px;}
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
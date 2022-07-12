<template>
  <section>
    <section class="main">
      <table border="1">
        <thead>
          <tr>
            <th>
              <input
                type="checkbox"
                id="notice-all-check"
                @click="noticeAllCheck"
              />
              <label for="notice-all-check" />
            </th>
            <th v-for="title in titleList" :key="title" v-text="title" />
          </tr>
        </thead>
        <tbody>
          <noticeList
            v-for="(item, idx) in noticeList"
            :key="idx"
            :item="item"
            :idx="idx"
            :noticeList="noticeList"
            @setSelectCount="setSelectCount"
            @setModalType="setModalType"
            @setSelectNoticeSeq="setSelectNoticeSeq"
            @setAddNoticeModalYN="setAddNoticeModalYN"
          />
          <tr v-if="noticeList.length == 0">
            <td colspan="6">리스트가 없습니다.</td>
          </tr>
        </tbody>
      </table>
    </section>
    <footer class="finder-footer">
      <div class="left">
        <button @click="addNoticeModalOpen">공지추가</button>
        <button @click="noticeCategoryModalOpen">카테고리 관리</button>
        <button v-if="selectCount != 0" @click="selectedDel">선택삭제</button>
        <span>선택 수 : {{ selectCount }}</span>
      </div>
      <div class="right">
        <span class="total-count"> 총 리스트 수 : {{ listCount }} </span>
      </div>
    </footer>

    <addNoticeModal
      v-if="addNoticeModalYN"
      :modalType="modalType"
      :selectNoticeSeq="selectNoticeSeq"
      @getList="getList"
      @add-notice-modal-close="addNoticeModalClose"
    />

    <noticeCategoryModal
      v-if="noticeCategoryModalYN"
      :noticeList="noticeList"
      @getList="getList"
      @notice-category-modal-close="noticeCategoryModalClose"
    />
  </section>
</template>

<script>
import { useAlert, useForm, useAxios } from "../hook";
import axios from "axios";

export default {
  components: {
    addNoticeModal: () => import("../pageSubComponents/Notice/addNoticeModal"),
    noticeCategoryModal: () =>
      import("../pageSubComponents/Notice/noticeCategoryModal"),
    noticeList: () => import("../pageSubComponents/Notice/noticeList"),
  },
  props: {
    sendData: Object,
    modalInDarkDivOpen: Function,
    modalInDarkDivClose: Function,
  },
  data() {
    return {
      titleList: ["N o", "카테고리", "제 목", "작 성 자", "작 성 일"],
      modalType: "C",
      selectNoticeSeq: "",
      listCount: 0,
      selectCount: 0,
      noticeList: [],
      addNoticeModalYN: false,
      noticeCategoryModalYN: false,
    };
  },
  created() {
    this.getList();
  },
  methods: {
    setModalType(val) {
      this.modalType = val;
    },
    setSelectNoticeSeq(val) {
      this.selectNoticeSeq = val;
    },
    setAddNoticeModalYN(val) {
      this.addNoticeModalYN = val;
    },
    setSelectCount(val) {
      this.selectCount = val;
    },
    getList() {
      useAxios.get("/admin/ntc").then(({ data }) => {
        if (!data?.RESULT) return (this.noticeList = []);
        this.noticeList = data.NTC_LIST;
        this.listCount = data?.NTC_LIST?.length;

        let els = document.querySelectorAll(
          "#notice-all-check, [id^=noticeChk_"
        );
        els.forEach((el) => (el.checked = false));
        this.selectCount = 0;
      });
    },
    noticeAllCheck(e) {
      let bool = e.target.checked;
      document
        .querySelectorAll('[id^="noticeChk_"]')
        .forEach((el) => (el.checked = bool ? true : false));
      this.selectCount = document.querySelectorAll(
        '[id^="noticeChk_"]:checked'
      ).length;
    },
    addNoticeModalOpen(e) {
      this.modalType = "C";
      this.selectNoticeSeq = "";
      this.addNoticeModalYN = true;
    },
    addNoticeModalClose(e) {
      this.addNoticeModalYN = false;
    },
    noticeCategoryModalOpen(e) {
      this.noticeCategoryModalYN = true;
      this.modalInDarkDivOpen();
    },
    noticeCategoryModalClose(e) {
      this.noticeCategoryModalYN = false;
      this.modalInDarkDivClose();
    },
    selectedDel(e) {
      let els = document.querySelectorAll("[id^=noticeChk_]:checked");

      els.forEach((el) => {
        let seq = Number(el.id.split("_")[1]);
        useAxios
          .delete("/admin/ntc/" + seq)
          .then(({ data }) => {
            if (!data.RESULT && data?.CAUSE == "SESSIONFAIL")
              return this.$store.dispatch("sessionFail");
            // console.log(data);
            if (!data.RESULT) {
              useAlert.error("공지사항", "공지사항을 삭제 실패하였습니다.");
              return;
            }
            useAlert.success("공지사항", "선택한 항목이 삭제되었습니다.");
            this.getList();
          })
          .catch(() => {
            useAlert.error("공지사항", "공지사항을 삭제 실패하였습니다.");
          });
      });
    },
  },
};
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
        &:nth-of-type(1) {
          width: 50px;
        }
        &:nth-of-type(2) {
          width: 70px;
        }
        &:nth-of-type(3) {
          width: 150px;
        }
        &:nth-of-type(4) {
          width: auto;
        }
        &:nth-of-type(5) {
          width: 14%;
        }
        &:nth-of-type(6) {
          width: 14%;
        }
        label {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
        }
      }
    }
    td {
      height: 34px;
      font-size: 14px;
      text-align: center;
      color: #999;
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
</style>
<template>
  <section class="sModal">
    <header>
      <article>
        <h1>
          <div
            class="icon"
            :style="{ backgroundImage: 'url(' + editIcon + ')' }"
          />
          <span>공지사항 {{ returnModalType }}</span>
        </h1>
      </article>
      <article>
        <button @click="$emit('add-notice-modal-close')">
          <span v-for="x in 2" :key="x" />
        </button>
        <button class="saveBtn" @click="noticeSave">
          <i class="far fa-save" />저 장
        </button>
      </article>
    </header>
    <article class="contents">
      <div class="c-top">
        <div class="top-left">
          <p>
            <input
              type="checkbox"
              id="noticeTopFixedChk"
              v-model="addNoticeData.TOPFIX_YN"
              hidden
            />
            <label for="noticeTopFixedChk" v-text="'상단에 공지 고정'" />
            <label for="noticeTopFixedChk" switch><span /></label>
          </p>
          <p v-if="addNoticeData.TOPFIX_YN" class="s">
            <label for="noticeTopFixedDate" v-text="'고정 기간 : '" />
            <input
              type="date"
              id="noticeTopFixedDate"
              v-model="addNoticeData.TOPFIX_LDAY"
            />
            <small>까지</small>
          </p>
        </div>
        <div class="top-right">
          <input
            type="checkbox"
            id="commentsYN"
            v-model="addNoticeData.CMNT_YN"
            hidden
          />
          <label for="commentsYN" v-text="'댓글작성 가능'" />
          <label for="commentsYN" switch><span /></label>
        </div>
      </div>
      <div class="c-bottom">
        <p class="title">
          <span>
            <label class="required" for="noticeTitle" v-text="'제 목 : '" />
            <input
              id="noticeTitle"
              v-model="addNoticeData.NTC_TITLE"
              ref="titleRef"
            />
          </span>
          <span>
            <label for="noticeCategory" v-text="'카테고리 : '" />
            <select id="noticeCategory" v-model="addNoticeData.NTC_CTGR_SN">
              <option
                v-for="item in noticeCategoryList"
                :key="item.NTC_CTGR_SN"
                :value="item.NTC_CTGR_SN"
                v-text="item.NTC_CTGR_NM"
              />
            </select>
          </span>
        </p>
        <label
          class="contents required"
          for="noticeContents"
          v-text="'내 용'"
        />
        <textarea
          id="noticeContents"
          v-model="addNoticeData.NTC_CN"
          ref="contentsRef"
        />
        <uploadFiles
          :fileList="addNoticeFileList"
          @setFileList="setNoticeFileList"
          :delUrl="'/admin/ntc_atchfile'"
        />
        <div class="info">
          <span> 작성자 : {{ addNoticeData.WRTR_NM }} </span>
        </div>
      </div>
    </article>
  </section>
</template>

<script>
import editIcon from "../../img/icon/edit.png";
import { useAlert, useForm, useAxios } from "../../hook";

export default {
  components: {
    uploadFiles: () => import("../common/uploadFiles.vue"),
    Checkbox: () => import("../../htmlTemplate/Checkbox.vue"),
  },
  props: ["modalType", "selectNoticeSeq"],
  data() {
    return {
      editIcon,
      noticeCategoryList: [],
      addNoticeData: {},
      addNoticeFileList: [],
    };
  },
  created() {
    this.getCategoryList();
  },
  methods: {
    getCategoryList() {
      useAxios.get("/admin/ntc_ctgr").then(({ data }) => {
        console.log(data);
        if (!data.RESULT && data?.CAUSE == "SESSIONFAIL")
          return this.$store.dispatch("sessionFail");
        this.noticeCategoryList = data.NTC_CTGR_LIST;
        this.editData = [...data.NTC_CTGR_LIST];

        if (this.modalType == "C") {
          this.addNoticeData = {
            ATCHFILE_LIST: [],
            CMNT_YN: false,
            NTC_CN: "",
            NTC_CTGR_SN: "",
            NTC_TITLE: "",
            POI_SN: null,
            TOPFIX_LDAY: "",
            TOPFIX_YN: false,
            WRTR_NM: this.$store?.loginInfo?.MBR_NM,
            WRTR_SN: this.$store?.loginInfo?.WRTR_SN,
          };
          this.addNoticeData.NTC_CTGR_SN =
            this.noticeCategoryList[0].NTC_CTGR_SN;
          return;
        }
        this.getDetailData();
      });
    },
    getDetailData() {
      useAxios.get("/admin/ntc/" + this.selectNoticeSeq).then(({ data }) => {
        console.log(data);
        if (!data.RESULT && data?.CAUSE == "SESSIONFAIL")
          return this.$store.dispatch("sessionFail");
        if (data.TOPFIX_LDAY !== "")
          data.TOPFIX_LDAY = data.TOPFIX_LDAY.split(" ")[0];
        this.addNoticeData = {
          ...data,
          CMNT_YN: data?.CMNT_YN == "Y",
          TOPFIX_YN: data?.TOPFIX_YN == "Y",
        };
        this.addNoticeFileList = data?.ATCHFILE_LIST ?? [];
      });
    },

    noticeSave() {
      console.log(this.addNoticeData);
      let titleValue = this.$refs.titleRef.value;
      let contentsValue = this.$refs.contentsRef.value;
      if (titleValue == "" || contentsValue == "") {
        return useAlert.warn("공지사항 작성", "제목 또는 내용을 입력해주세요.");
      }
      if (
        this.addNoticeData.TOPFIX_YN == true &&
        this.addNoticeData.TOPFIX_LDAY == ""
      ) {
        return useAlert.warn("공지사항 작성", "고정 기간을 입력해주세요.");
      }

      let data = { ...this.addNoticeData };
      data = {
        ...data,
        NTC_CTGR_SN: this.addNoticeData?.NTC_CTGR_SN || 1,
        POI_SN: this.addNoticeData?.POI_SN || 1,
        TOPFIX_YN: this.addNoticeData?.TOPFIX_YN ? "Y" : "N",
        CMNT_YN: this.addNoticeData?.CMNT_YN ? "Y" : "N",
      };
      let files = { ATCHFILE_LIST: this.addNoticeFileList };

      this.$store.dispatch("setProgressPercent", 0);

      useAxios
        .post(
          "/ntc" + (this.modalType == "C" ? "" : "/" + this.selectNoticeSeq),
          useForm(data, files),
          {
            // onUploadProgress: (e) => {
            //   const { loaded, total } = e;
            //   let percent = Math.floor((loaded * 100) / total);
            //   this.$store.dispatch("setProgressPercent", percent);
            // },
          }
        )
        .then(({ data }) => {
          this.$store.dispatch("setProgressPercent", 0);
          if (!data.RESULT && data?.CAUSE == "SESSIONFAIL")
            return this.$store.dispatch("sessionFail");
          if (!data.RESULT)
            return useAlert.error("공지사항 저장", "공지가 저장실패였습니다.");

          this.$emit("getList");
          this.$emit("add-notice-modal-close");
          useAlert.success("공지사항 저장", "공지가 저장되었습니다.");
        })
        .catch(() => {
          useAlert.error("공지사항 저장", "공지가 저장실패였습니다.");
        });
    },
    setNoticeFileList(value) {
      this.addNoticeFileList = value;
    },
  },
  computed: {
    returnModalType() {
      let result =
        this.modalType == "C" ? "작성" : this.modalType == "U" ? "수정" : "";
      return result;
    },
  },
};
</script>

<style lang="scss" scoped>
[switch] {
  width: 50px;
  height: 28px;
  margin-left: 10px;
  display: inline-block;
  border: 1px solid #eee;
  background-color: #ddd;
  padding: 2px;
  border-radius: 100px;
  transform: translateY(2px);
  overflow: hidden;
  cursor: pointer;
  transition: 0.3s;
  position: relative;
  span {
    position: absolute;
    top: 2px;
    left: 2px;
    width: 26px;
    height: calc(100% - 4px);
    background-color: #fff;
    display: block;
    border-radius: 100px;
    transition: 0.3s;
  }
}
input:checked ~ [switch] {
  background-color: #4bc64b;
  & > span {
    left: 20px;
  }
}

section.sModal {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border: 1px solid #aaa;
  /* border-radius: 10px; */
  width: calc(100% + 2px);
  height: calc(100% + 2px);
  background-color: #fff;
  z-index: 1800;
  overflow: hidden;
  user-select: none;
  box-shadow: 1px 2px 4px #00000050;

  label {
    font-size: 14px;
    margin-right: 4px;
    color: #232323;
  }
  .c-top {
    width: 100%;
    height: 66px;
    padding: 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    & > div {
      display: flex;
      align-items: center;
    }
    p {
      margin-right: 20px;
      display: flex;
      align-items: center;

      &.s {
        font-size: 14px;
        label {
          margin-right: 8px;
        }
      }
      input:not([type="checkbox"]) {
        padding: 0 5px;
        width: 150px;
        height: 30px;
        border-radius: 0;
        border: 1px solid #ccc;
        margin-right: 4px;
      }
    }
  }

  .c-bottom {
    width: 100%;
    height: calc(100% - 66px);
    padding: 0 20px 20px;
    overflow: auto;
    p {
      &.title {
        padding: 10px 0;
        display: flex;
        align-items: center;
        justify-content: space-between;
        & > span:nth-of-type(1) {
          width: 70%;
        }
        & > span:nth-of-type(2) {
          width: auto;
        }
        input {
          padding: 0 5px;
          width: calc(100% - 80px);
          min-width: 50%;
          height: 30px;
          border-radius: 0;
          border: 1px solid #ccc;
          margin-right: 20px;
        }
        select {
          padding: 0 5px;
          width: 180px;
          height: 30px;
          border-radius: 0;
          border: 1px solid #ccc;
        }
      }
    }
    .contents {
      display: block;
      height: unset;
      margin-bottom: 6px;
    }
    #noticeContents {
      width: 100%;
      height: calc(100% - 306px);
      resize: none;
      border: 1px solid #ccc;
      padding: 6px;
    }
    .info {
      height: 30px;
      display: flex;
      align-items: flex-end;
      font-size: 14px;
      span {
        margin-right: 20px;
      }
    }
  }
}
</style>
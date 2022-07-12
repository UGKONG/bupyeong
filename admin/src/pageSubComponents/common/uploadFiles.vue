<template>
  <section class="v-upload-files">
    <table class="ui celled table">
      <thead>
        <tr>
          <th
            v-for="title in uploadFileTableTitle"
            :key="title"
            v-text="title"
          />
        </tr>
      </thead>
      <tbody>
        <tr v-for="(file, idx) in fileList" :key="idx">
          <td v-text="idx + 1" @click="() => fileDownload(file.ATCHFILE_URL)" />
          <td
            v-text="file.name || file.ATCHFILE_NM"
            @click="() => fileDownload(file.ATCHFILE_URL)"
          />
          <td
            v-text="file.type || file.FILE_TYPE"
            @click="() => fileDownload(file.ATCHFILE_URL)"
          />
          <td
            v-text="
              file.size
                ? useFileSize(file.size) == '0.00'
                  ? '0'
                  : useFileSize(file.size)
                : useFileSize(file.FILE_SIZE) == '0.00'
                ? '0'
                : useFileSize(file.FILE_SIZE)
            "
            @click="() => fileDownload(file.ATCHFILE_URL)"
          />
          <td>
            <button
              class="v-delBtn"
              :data-index="idx"
              @click="delFile"
              :data-seq="file.ATCHFILE_SN"
            >
              <i class="fas fa-minus" />
            </button>
          </td>
        </tr>
        <tr v-show="fileCutline" v-if="!disabled">
          <td colspan="5">
            <input
              type="file"
              name="v-upload-file"
              id="v-upload-file"
              @change="uploadFile"
            />
            <label for="v-upload-file" class="v-addBtn">첨부파일 추가</label>
          </td>
        </tr>
      </tbody>
    </table>
  </section>
</template>

<script>
import { Store } from "../../store";
import { useAlert, useFileSize, useForm } from "@hook";
import axios from "axios";

export default {
  props: {
    fileList: Array,
    length: {
      type: Number,
      default: 4,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    url: {
      type: String,
      default: "/",
    },
    prop: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      uploadFileTableTitle: ["No", "파일명", "종류", "용량", ""],
    };
  },
  methods: {
    fileDownload(url, name) {
      window.open(url);
      return;
      let a = window.document.createElement("a");
      a.setAttribute("blank", "new");
      a.setAttribute("herf", url);
      a.click();
      a.remove();
    },
    uploadFile(e) {
      if (e.target.files.length == 0) return;
      let fileObj = e.target.files[0];
      let sameFileYN =
        this.fileList.filter(
          (x) =>
            x.lastModified == fileObj.lastModified &&
            x.name == fileObj.name &&
            x.size == fileObj.size
        ).length > 0
          ? true
          : false;
      if (sameFileYN)
        return useAlert.warn("첨부파일", "해당 첨부파일이 이미 존재합니다.");
      let tempArr = [...this.fileList];

      tempArr.push(fileObj);
      this.$emit("setFileList", tempArr);
    },
    delFile(e) {
      let seq = Number(e.currentTarget.getAttribute("data-seq"));

      Store.setConfirmYN(true);
      Store.setConfirmInfo({
        icon: "info",
        title: "첨부파일 삭제",
        text: "첨부파일 삭제는 바로 적용됩니다. 정말 삭제하시겠습니까?",
        ok: () => {
          let idx = Number(e.target.getAttribute("data-index"));
          let tempArr = [];

          if (!seq) {
            for (let i in this.fileList) {
              if (i != idx) tempArr.push(this.fileList[i]);
            }
            this.$emit("setFileList", tempArr);
            return;
          }

          let data = { TASK: this.prop, ATCHFILE_SN: seq };
          axios
            .post(this.$store.state.dbUrl + this.url, useForm(data))
            .then(({ data }) => {
              if (!data.RESULT && data?.CAUSE == "SESSIONFAIL")
                return this.$store.dispatch("sessionFail");
              if (!data.RESULT)
                return useAlert.error(
                  "공지사항 파일",
                  "파일이 삭제되지 않았습니다."
                );

              for (let i in this.fileList) {
                if (i != idx) tempArr.push(this.fileList[i]);
              }
              this.$emit("setFileList", tempArr);
            })
            .catch(() => {
              useAlert.error("공지사항 파일", "파일이 삭제되지 않았습니다.");
            });
        },
        no: () => null,
      });
    },
    returnFileType(fileName) {
      let result;
      if (fileName.indexOf(".") == -1) return null;
      result = fileName.split(".");
      result = result[result.length - 1];
      return result;
    },
    useFileSize(size) {
      return useFileSize(size);
    },
  },
  computed: {
    fileCutline() {
      return this.fileList.length >= this.length ? false : true;
    },
  },
};
</script>

<style lang="scss" scoped>
section.v-upload-files {
  width: 100%;
  height: 196px !important;
  border: 1px solid #ddd;

  .ui.celled.table {
    table-layout: fixed;
    border-radius: 0%;
    border-collapse: collapse;
    border-right: 0;
    border-left: 0;
    thead {
      border-left: 0;
      border-bottom: 0;
    }
    label {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }
    tr:last-of-type > td {
      padding: 0;
      height: 38px;
      & > input {
        display: none;
      }
    }
    th {
      position: relative;
      padding: 8px 11px;
      border-bottom: 0;
      border-right: 0;
      &:nth-of-type(1) {
        width: 50px;
        text-align: center;
        border-left: 0;
      }
      &:nth-of-type(2) {
        width: 50%;
      }
      &:nth-of-type(3) {
        width: 25%;
      }
      &:nth-of-type(4) {
        width: 25%;
      }
      &:last-of-type {
        width: 50px;
        border-left: none;
      }
    }
    td {
      position: relative;
      padding: 8px 11px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;

      &:nth-of-type(1) {
        width: 50px;
        text-align: center;
        border-left: 0;
      }
      &:last-of-type {
        width: 50px;
        text-align: center;
        border-right: 0;
      }

      .v-addBtn {
        width: 100%;
        height: 100%;
        border: none;
        position: relative;
        background-color: rgb(239, 239, 239);
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #555;
        &:hover {
          color: #000;
        }
      }
      .v-delBtn {
        width: 20px;
        height: 20px;
        min-width: 20px;
        min-height: 20px;
        max-width: 20px;
        max-height: 20px;
        padding: 0 !important;
        border-radius: 50%;
        border: none;
        background-color: #ff6262;
        color: #fff;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        font-size: 10px;
      }
    }
  }
}
</style>
<template>
  <section class="v-upload-files" :style="{ marginTop: marginTop + 'px' }">
    <table class="ui celled">
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
        <tr
          v-for="(file, idx) in fileList"
          :key="idx"
          @click="
            fileClick(file.url || file.ATCH_FILE_URL, file.name || file.FN)
          "
        >
          <td v-text="idx + 1" />
          <td v-text="file.name || file.FN" />
          <td v-text="file.type || file.FILE_TYPE" />
          <td v-text="fileSizeText(file.size || file.FILE_SZ)" />
        </tr>
      </tbody>
    </table>
  </section>
</template>

<script>
import { useDownload, useFileSize } from "@hook";

export default {
  props: {
    fileList: {
      type: Array,
      default: () => [],
    },
    marginTop: {
      type: Number,
      default: 50,
    },
  },
  data() {
    return {
      uploadFileTableTitle: ["No", "파일명", "종류", "용량"],
    };
  },
  methods: {
    fileClick(url, name) {
      useDownload(url, name);
    },
    useFileSize(size) {
      return useFileSize(size);
    },
    fileSizeText(size) {
      return useFileSize(size) == "0.00" ? "0" : useFileSize(size);
    },
  },
};
</script>

<style lang="scss" scoped>
section.v-upload-files {
  user-select: none;
  width: 100%;
  /* height: 196px !important;
  border: 1px solid #ddd; */

  table {
    table-layout: fixed;
    border-radius: 0%;
    thead {
      border-bottom: 0;
      tr {
        border-bottom: 0;
      }
    }
    tbody tr {
      &:hover {
        background-color: #eee;
        cursor: pointer;
      }
      &:active {
        background-color: #ddd;
      }
    }
    th {
      position: relative;
      padding: 8px 11px;
      border-bottom: 0;
      &:nth-of-type(1) {
        width: 80px;
      }
      &:nth-of-type(2) {
        width: auto;
      }
      &:nth-of-type(3) {
        width: 200px;
      }
      &:nth-of-type(4) {
        width: 200px;
      }
    }
    td {
      position: relative;
      padding: 8px 11px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
}

@media screen and (max-width: 900px) {
  th:nth-of-type(1) {
    width: 50px !important;
  }
  th:nth-of-type(2) {
  }
  th:nth-of-type(3) {
    width: 120px !important;
  }
  th:nth-of-type(4) {
    width: 100px !important;
  }
}
@media screen and (max-width: 499px) {
  th:nth-of-type(1) {
    width: 50px !important;
  }
  th:nth-of-type(2) {
    width: auto !important;
  }
  th:nth-of-type(3) {
    display: none !important;
  }
  th:nth-of-type(4) {
    width: 100px !important;
  }
  td:nth-of-type(3) {
    display: none !important;
  }
}
</style>
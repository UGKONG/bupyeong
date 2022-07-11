<template>
  <section class="sModal">
    <header>
      <article>
        <h1>
          <div class="icon" :style="{ backgroundImage: 'url(' + editIcon + ')' }" />
          <span>공동체 신청자</span>
        </h1>
      </article>
      <article>
        <button @click="$emit('subModalClose')">
          <span v-for="x in 2" :key="x" />
        </button>
      </article>
    </header>

    <article class="contents">
      <h2>과정 제목 : {{ selectCommData.commTitle }}</h2>
      <table class="ui celled table">
        <thead>
          <tr>
            <th v-text="tableTitle[0]" />
            <th v-text="tableTitle[1]" />
            <th v-text="tableTitle[2]" />
            <th v-text="tableTitle[3]" />
          </tr>
        </thead>
        <tbody>
          <requestList v-for="(item, idx) in requestList"
            :key="idx" :item="item" :idx="idx"
          />
          <tr v-if="requestList.length == 0">
            <td colspan="5" style="color: #777;padding: 7px 0;">리스트가 없습니다.</td>
          </tr>
        </tbody>
      </table>
    </article>
  </section>
</template>

<script>
import { Store } from '../../store';
import { useRest } from '../../hook';
import editIcon from '../../img/icon/edit.png';

export default {
  components: {
    requestList: () => import('./requestList.vue'),
  },
  props: {
    selectCommData: Object,
  },
  data() {
    return {
      editIcon,
      tableTitle: ['No', '신청자명', '연락처', '상태'],
      // 과정 데이터 불러오기
      requestList: [],
    }
  },
  created () {
    useRest({
      url: Store.globalURL + 'admin_commRequestList',
      success: (data) => this.requestList = data
    });
  },
}
</script>

<style lang="scss" scoped>
section.sModal {
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  border: 1px solid #aaa;
  width: 500px;
  height: 600px;
  width: 100%;
  height: 100%;
  background-color: #fff;
  z-index: 1800;
  overflow: hidden;
  user-select: none;
  box-shadow: 1px 2px 4px #00000050;
}
article.contents {
  overflow: auto;
  padding: 8px;
  
  h2 {
    padding: 14px 10px 0;
    font-size: 17px;
    font-weight: 500;
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
  }
}
</style>
<template>
  <aside class="viewer">
    <header>
      과정 신청내역    
      <article>
        <button @click="$emit('resiBsnsRequestDocViewModalClose')">
          <span v-for="x in 2" :key="x" />
        </button>
      </article>
    </header>
    <div class="contents" style="height: calc(100% - 210px);">
      <p>
        <span>신청자명: {{requestData.requestName}}</span>
        <span>연락처: {{requestData.requestPhone}}</span>
      </p>
      <table class="ui celled table">
        <thead><tr>
          <th>No</th>
          <th>신청일</th>
          <th colspan="2">상태</th>
          <th>신청서</th>
        </tr></thead>
        <tbody>
          <tr v-for="(request, idx) in requestList" :key="idx">
            <td>{{ idx + 1 }}</td>
            <td>{{ request.requestDT }}</td>
            <td :colspan="request.requestState != '2' ? 2 : 1">{{ stateView(request.requestState) }}</td>
            <td v-if="request.requestState == 2">
              <button :data-seq="request.requestSeq" @click="noTextView">사유 보기</button>
            </td>
            <td>
              <button :data-url="request.requestDownloadLink" @click="requestDocDown">
                신청서 보기
              </button>
            </td>
          </tr>
          <tr v-if="requestList.length == 0">
            <td colspan="4" style="
              color: #777;
              padding: 8px 0;
            ">리스트가 없습니다.</td>
          </tr>
        </tbody>
      </table>
    </div>
    <article class="because">
      <h2>거절 사유</h2>
      <div class="text">
        <p><b>{{ !noText ? '' : noText.date }}</b></p>
        {{ !noText ? '사유보기 버튼을 눌러주세요.' : noText.text }}
      </div>
    </article>
  </aside>
</template>

<script>
import { useRest } from '../../hook';
import { Store } from '../../store';
export default {
  props: {
    requestData: Object,
  },
  data() {
    return {
      tableTitle: ['No', '신청일', '상태', '신청서'],
      requestList: [],
      noText: null,
    }
  },
  created() {
    useRest({
      url: Store.globalURL + 'admin_resiBsnsRequestedList',
      success: (data) => this.requestList = data
    });
  },
  methods: {
    stateView(state) {
      return state == '0' ? '신청중' : state == '1' ? '수락됨' : '거절됨';
    },
    requestDocDown(e) {
      let url = e.target.getAttribute('data-url');
      let a = document.createElement('a');
      a.setAttribute('target', 'new');
      a.setAttribute('href', url);
      a.click();
      a.remove();
    },
    noTextView(e) {
      let seq = e.target.getAttribute('data-seq');
      let obj = this.requestList.find(x => x.requestSeq == seq);
      this.noText = {
        date: obj.requestDT,
        text: obj.requestNoText
      }
    }
  },
  computed: {

  }
}
</script>

<style lang="scss" scoped>
aside {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #fff;
  box-shadow: 1px 2px 4px #00000040;
  /* border-radius: 4px; */
  overflow: hidden;
  z-index: 1900;

  header {
    font-size: 17px;
    font-weight: 500;
    height: 60px;
    position: relative;
    display: flex;
    align-items: center;
    padding: 0 10px;
    background-color: #FDF4F5;
    article .saveBtn {
      padding: 1px 0 0;
      font-size: 14px;
    }
  }

  .contents {
    overflow: auto;
    padding: 8px;

    & > p {
      padding: 6px 6px 0;
      color: #444;
      font-size: 16px;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    table {
      table-layout: fixed;
      border-radius: 0;

      thead {
        position: sticky;
        top: -9px;
      }

      th {
        height: 40px;
        padding: unset;
        text-align: center;
        letter-spacing: 1px;
        font-weight: 500;

        &:nth-of-type(1) {width: 80px;}
        /* &:nth-of-type(2) {width: 120px;}
        &:nth-of-type(3) {width: 170px;}
        &:nth-of-type(4) {width: auto;} */
      }

      td {
        text-align: center;
        padding: 8px 0;

        button {
          background-color: transparent;
          padding: 1px;
          box-shadow: none;
          border-bottom: 1px solid transparent;

          &:hover {
            border-bottom: 1px solid #aaa;
            font-weight: 500;
          }
        }
      }
    }
  }

  .because {
    height: 150px;
    padding: 10px;
    border-top: 1px solid #ccc;
    h2 {
      font-weight: 500;
      font-size: 14px;
      height: 30px;
    }
    div {
      height: calc(100% - 30px);
      overflow: auto;
    }
  }
}
</style>
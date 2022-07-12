<template>
  <main>
    <h2
      banner
      :style="{
        backgroundImage: 'url(' + noticeBanner + ')',
        backgroundColor: '#badc86',
        height: '200px',
      }"
    >
      <div>
        <span>주민공모사업</span>
        <p history>
          <i :class="$store.state.FontAwesome.fill.home" />
          <i :class="$store.state.FontAwesome.stroke.angle.right" /> 뉴딜참여
          <i :class="$store.state.FontAwesome.stroke.angle.right" />
          주민공모사업
        </p>
      </div>
    </h2>

    <h2 sub>
      주민공모사업 리스트
      <span>
        <button @click="setRequestModalYN(true)">신청 현황</button>
      </span>
    </h2>
    <section>
      <div class="description">
        <!-- 임시 소개글 -->
        <div
          class="se-component se-quotation se-l-quotation_underline"
          id="SE-90990831-b257-439d-8f26-9aa3c8cca6e4"
        >
          <div class="se-component-content">
            <div
              class="se-section se-section-quotation se-l-quotation_underline"
            ></div>
          </div>
        </div>
        <div
          class="se-component se-text se-l-default"
          id="SE-fffd64e8-411a-4b4e-85ff-ea7291eabd57"
        >
          <div class="se-component-content">
            <div class="se-section se-section-text se-l-default">
              <div class="se-module se-module-text">
                <!-- SE-TEXT { -->
                <p
                  class="se-text-paragraph se-text-paragraph-align-"
                  style=""
                  id="SE-091cc625-5217-4ac4-909f-80a074e08649"
                >
                  <span
                    style="color: #007aa6"
                    class="se-fs-fs19 se-ff-nanumbarungothic"
                    id="SE-21e06d97-f92e-455f-8217-73f5d50cca1d"
                    ><b>통합 공모사업 사업설명회</b></span
                  >
                </p>
                <!-- } SE-TEXT --><!-- SE-TEXT { -->
                <p
                  class="se-text-paragraph se-text-paragraph-align-"
                  style=""
                  id="SE-669e7eff-8743-45ce-b380-91fd8add71bc"
                >
                  <span
                    style="color: #333333; background-color: #ffffff"
                    class="se-fs-fs16 se-ff-nanumbarungothic se-style-unset"
                    id="SE-f1db81e1-bdc8-40f1-89f0-26a71e2daada"
                    >📍 </span
                  ><span
                    style=""
                    class="se-fs-fs16 se-ff-nanumbarungothic"
                    id="SE-bfd9e1b5-8d87-43d0-98fc-d23694ea811a"
                    ><b>일시 : 2022. 1. 12. (수) 14시</b></span
                  >
                </p>
                <!-- } SE-TEXT --><!-- SE-TEXT { -->
                <p
                  class="se-text-paragraph se-text-paragraph-align-"
                  style=""
                  id="SE-00cfceea-1ec9-494f-9544-906d82c2abaf"
                >
                  <span
                    style="color: #333333; background-color: #ffffff"
                    class="se-fs-fs16 se-ff-nanumbarungothic se-style-unset"
                    id="SE-d415a417-6065-4955-896f-a9ef5025d597"
                    >📍 </span
                  ><span
                    style=""
                    class="se-fs-fs16 se-ff-nanumbarungothic"
                    id="SE-99a7bac6-d64e-458b-beb5-b203905df38e"
                    ><b>장소 : 부평구청 7층 대회의실</b></span
                  >
                </p>
                <!-- } SE-TEXT --><!-- SE-TEXT { -->
                <p
                  class="se-text-paragraph se-text-paragraph-align-"
                  style=""
                  id="SE-6c60e9c3-5f00-462f-9bac-04c3d8031723"
                >
                  <span
                    style="color: #333333; background-color: #ffffff"
                    class="se-fs-fs16 se-ff-nanumbarungothic se-style-unset"
                    id="SE-e0506447-316c-4159-b033-bd1bb6ddd6db"
                    >📍 </span
                  ><span
                    style=""
                    class="se-fs-fs16 se-ff-nanumbarungothic"
                    id="SE-dbeac3d5-6f78-41fb-be9c-7cb3a5b73785"
                    ><b>사업설명회 문의 및 사전 신청 : 032-509-7488</b></span
                  >
                </p>
                <!-- } SE-TEXT --><!-- SE-TEXT { -->
                <p
                  class="se-text-paragraph se-text-paragraph-align-"
                  style=""
                  id="SE-fa8b6cdb-ee36-4f1b-9637-8cf4550e128b"
                >
                  <span
                    style=""
                    class="se-fs-fs16 se-ff-nanumbarungothic"
                    id="SE-845d94b6-9cc4-4c8c-bfbe-e8edfbc3e55c"
                    >​</span
                  >
                </p>
                <!-- } SE-TEXT --><!-- SE-TEXT { -->
                <p
                  class="se-text-paragraph se-text-paragraph-align-"
                  style=""
                  id="SE-11a771d2-526a-4f47-8b75-94b8605bba73"
                >
                  <span
                    style="color: #007aa6"
                    class="se-fs-fs16 se-ff-nanumbarungothic"
                    id="SE-8f0b2f1c-0a23-4775-b3ce-b2c67f220386"
                    ><b
                      >* 사업설명회 참석하지 못한 분들을 위한 사업설명
                      영상입니다!</b
                    ></span
                  >
                </p>
                <!-- } SE-TEXT --><!-- SE-TEXT { -->
                <p
                  class="se-text-paragraph se-text-paragraph-align-"
                  style=""
                  id="SE-5ab03bb5-cadf-4a85-b75a-ca9405d7d4a1"
                >
                  <span
                    style="color: #007aa6"
                    class="se-fs-fs16 se-ff-nanumbarungothic"
                    id="SE-7dcb0862-0967-4d8f-9810-7629293967ee"
                    ><a
                      href="https://www.youtube.com/watch?v=cN3_JcCNIRw"
                      class="se-link"
                      target="_blank"
                      ><b>https://www.youtube.com/watch?v=cN3_JcCNIRw</b></a
                    ></span
                  >
                </p>
                <!-- } SE-TEXT -->
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="option">
        <div>
          <SearchInput @setValue="setSearchValue" @search="getList" />
        </div>
      </div>
      <table>
        <thead>
          <tr>
            <th v-for="(item, idx) in head" :key="idx" v-text="item" />
          </tr>
        </thead>
        <tbody>
          <BusinessLi
            v-for="(item, idx) in list"
            :key="idx"
            :idx="idx"
            :item="item"
          />
          <tr class="listNone" v-if="!loading && listNone">
            <td :colspan="headCount">리스트가 없습니다.</td>
          </tr>
          <TableLoading :row="3" :col="4" :state="loading" />
        </tbody>
      </table>
    </section>

    <!-- Modal -->
    <RequestModal
      v-if="requestModalYN"
      @setRequestModalYN="setRequestModalYN"
    />
    <QuestionModal
      v-if="questionModalYN"
      @setQuestionModalYN="setQuestionModalYN"
    />
  </main>
</template>

<script>
import axios from "axios";
import { useAlert } from "@admin/src/hook";
import BusinessLi from "@components/ResidentBusiness/BusinessLi";
import RequestModal from "@components/ResidentBusiness/RequestModal";
import TableLoading from "@components/Skeleton/Table";
import SearchInput from "@admin/src/htmlTemplate/SearchInput";
import QuestionModal from "@components/ResidentBusiness/QuestionModal";
import noticeBanner from "@images/2/1/noticeBanner.png";

export default {
  components: {
    BusinessLi,
    RequestModal,
    TableLoading,
    SearchInput,
    QuestionModal,
  },
  data: () => ({
    head: ["No", "사업 제목", "작성일", "작성자"],
    list: [],
    requestModalYN: false,
    loading: false,
    searchValue: "",
    questionModalYN: false,
    noticeBanner,
  }),
  created() {
    this.getList();
  },
  methods: {
    setSearchValue(val) {
      this.searchValue = val;
    },
    getList() {
      this.loading = true;
      this.list = [];

      setTimeout(() => {
        axios
          .get(
            this.$store.state.dbUrl +
              "/ResidentBusinessList?q=" +
              this.searchValue
          )
          .then(({ data }) => {
            this.loading = false;
            if (this.searchValue != "" && data.length > 0)
              useAlert.info("주민공모사업", "검색결과를 찾았습니다.");
            if (this.searchValue != "" && data.length == 0)
              return useAlert.info("주민공모사업", "검색결과가 없습니다.");
            this.list = data;
          });
      }, 800);
    },
    setRequestModalYN(val) {
      if (!this.$store.state.loginYN)
        return useAlert.warn("주민공모사업", "로그인이 필요합니다.");
      this.requestModalYN = val;
    },
    setQuestionModalYN(val) {
      this.questionModalYN = val;
    },
  },
  computed: {
    headCount() {
      return this.head.length;
    },
    listNone() {
      return this.list.length == 0;
    },
    questionIcon() {
      return this.$store.state.FontAwesome.fill.question;
    },
    rightIcon() {
      return this.$store.state.FontAwesome.stroke.angle.right;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@index.scss";
main {
  .description {
    width: 100%;
    height: 200px;
    margin-bottom: 20px;
    border: 1px solid $whiteGray;
    overflow: auto;
    padding: 20px;
  }
  h2[sub] button {
    background-color: $activeColor;
    color: #fff;
    padding: 10px 22px !important;
    &:hover {
      color: #fff;
      background-color: $hoverColor;
    }
  }
  .option {
    @include flex(space-between, column);
    padding-bottom: 4px;
    margin-bottom: 10px;
    & > div {
      padding: 12px 16px;
      background-color: #eee;
      width: 100%;
      @include flex(space-between);
      button {
        align-self: stretch;
      }
    }
    ul {
      @include flex(flex-start);
      width: 100%;
      overflow: auto;
      margin-bottom: 5px;
    }
  }

  th {
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
      width: 160px;
    }
    &:nth-of-type(5) {
      width: 120px;
    }
  }
  .listNone {
    td {
      text-align: center;
    }
  }

  @media screen and (max-width: 900px) {
    th:nth-last-of-type(1),
    th:nth-last-of-type(2) {
      width: 0;
      padding: 0;
      border-left: none;
      border-right: none;
    }
  }
}
</style>
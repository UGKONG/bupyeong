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
        <span>주민공동체</span>
        <p history>
          <i :class="$store.state.FontAwesome.fill.home" />
          <i :class="rightIcon" /> 뉴딜참여 <i :class="rightIcon" /> 주민공동체
        </p>
      </div>
    </h2>

    <h2 sub>
      <h3 style="margin-bottom: 0">주민공동체 소개</h3>
    </h2>
    <section>
      <div class="description">
        <!-- 예시 텍스트 -->
        <div class="se-component-content">
          <div class="se-section se-section-text se-l-default">
            <div class="se-module se-module-text">
              <span
                style=""
                class="se-fs-fs16 se-ff-"
                id="SE-7b4ce4af-6e9e-42dd-850b-86d6695c481d"
                >도시재생 예비사업은 국토교통부에서 추진하는 도시재생뉴딜사업에
                참여하기 위한 준비 사업입니다. 그간 개별적으로 운영하던 </span
              ><span
                style="color: #0078cb"
                class="se-fs-fs16 se-ff-"
                id="SE-e65dd719-be4f-4a1d-80c5-e8ca756ff70d"
                ><b
                  >'주민참여 프로젝트 사업', 사업화 지원 사업', 소규모
                  재생사업'을 ' 도시재생예비사업'으로 통합한 것</b
                ></span
              ><span
                style=""
                class="se-fs-fs16 se-ff-"
                id="SE-20d2e39c-bdeb-464c-90b8-045dc0891229"
                >으로, 사업계획 수립, 사업화 과정 지원 관련 컨설팅 등을 추가하여
                좀 더 포괄적으로 주민역량을 강화하도록 하였습니다.</span
              >
              <!-- } SE-TEXT --><!-- SE-TEXT { -->
              <p
                class="se-text-paragraph se-text-paragraph-align-"
                style=""
                id="SE-19b6980b-905d-437e-b3b7-9d292c640d22"
              >
                <span
                  style=""
                  class="se-fs-fs16 se-ff-"
                  id="SE-53493474-719e-469d-a825-90e7bd01c4ad"
                  >​</span
                >
              </p>
              <!-- } SE-TEXT --><!-- SE-TEXT { -->
              <p
                class="se-text-paragraph se-text-paragraph-align-"
                style=""
                id="SE-f00be456-5dc8-4163-8532-8c2c8c285ff6"
              >
                <span
                  style=""
                  class="se-fs-fs16 se-ff-"
                  id="SE-df488a9f-15a1-43fe-b0b8-cb8beb0fc778"
                  ><b
                    >주민공동체 스스로 도시재생 사업에 대해 다양한 경험을
                    가짐으로써 지역 문제를 해결하고
                  </b></span
                >
              </p>
              <!-- } SE-TEXT --><!-- SE-TEXT { -->
              <p
                class="se-text-paragraph se-text-paragraph-align-"
                style=""
                id="SE-bfbe4611-b52a-4ea3-a04e-71535e503a21"
              >
                <span
                  style=""
                  class="se-fs-fs16 se-ff-"
                  id="SE-5b8aa6b6-55fb-416b-bcd0-8842e501faeb"
                  ><b
                    >도시재생뉴딜을 위한 기반을 마련하는 사업이라고 볼 수 있죠
                    :)</b
                  ></span
                >
              </p>
            </div>
          </div>
        </div>
        <div
          style="margin-top: 20px"
          class="se-section se-section-quotation se-l-quotation_line"
        >
          <div class="se-module se-module-text se-quote">
            <!-- SE-TEXT { -->
            <p
              class="se-text-paragraph se-text-paragraph-align-"
              style=""
              id="SE-b974cc19-e3e3-4407-9791-f1632b1cefb5"
            >
              <span
                style=""
                class="se-fs- se-ff-"
                id="SE-f8b1658a-d77c-4181-88fa-a5a414806175"
                ><b>우리가 만드는 새로운 길, 동수단길!</b></span
              >
            </p>
            <!-- } SE-TEXT --><!-- SE-TEXT { -->
            <p
              class="se-text-paragraph se-text-paragraph-align-"
              style=""
              id="SE-656c6976-ed7a-47ca-b0df-08765162b249"
            >
              <span
                style="color: #000000"
                class="se-fs-fs15 se-ff-"
                id="SE-4d5f11c7-fc69-4c7e-af99-125c459303e2"
                >- 위치: 부평동 645-11번지 일원</span
              >
            </p>
            <!-- } SE-TEXT --><!-- SE-TEXT { -->
            <p
              class="se-text-paragraph se-text-paragraph-align-"
              style=""
              id="SE-63cdf7d6-a7c8-4afa-92b1-40e2ce5226b7"
            >
              <span
                style="color: #000000"
                class="se-fs-fs15 se-ff-"
                id="SE-3cb1a577-f927-4899-a763-94f4c1c3bc03"
                >- 기간: 2021년 5월 ~ 2022년 4월</span
              >
            </p>
            <!-- } SE-TEXT --><!-- SE-TEXT { -->
            <p
              class="se-text-paragraph se-text-paragraph-align-"
              style=""
              id="SE-98c58513-2796-47aa-8d0a-f0fb5b06f136"
            >
              <span
                style="color: #000000"
                class="se-fs-fs15 se-ff-"
                id="SE-d16b9ae8-8766-4a40-831b-dc51219b2ebe"
                >- 면적: 49,300</span
              ><span
                style="color: #000000"
                class="se-fs-fs15 se-ff- se-style-unset"
                id="SE-c9f82ffd-6ecc-45f9-b4c9-df6653a6cb89"
                >㎡</span
              >
            </p>
            <!-- } SE-TEXT --><!-- SE-TEXT { -->
            <p
              class="se-text-paragraph se-text-paragraph-align-"
              style=""
              id="SE-b42d9e14-505d-4f16-b303-480084a93311"
            >
              <span
                style="color: #000000"
                class="se-fs-fs15 se-ff- se-style-unset"
                id="SE-80ff13ae-0cfb-45af-ac76-e5bd67cb6197"
                >- 내용 : 상생 협력 기반 조성, 골목 상권 활성화, 도시재생
                역량강화</span
              >
            </p>
            <!-- } SE-TEXT -->
          </div>
        </div>
      </div>
      <h3>주민공동체 리스트</h3>
      <div class="option">
        <div>
          <SearchInput @setValue="setSearchValue" @search="getList" />
        </div>
      </div>
      <table>
        <thead>
          <tr>
            <th v-for="item in theadList" :key="item" v-text="item" />
          </tr>
        </thead>
        <tbody>
          <ResidentCommunityLi
            v-for="(item, idx) in list"
            :key="idx"
            :item="item"
            :idx="idx"
          />
        </tbody>
      </table>
    </section>
  </main>
</template>

<script>
import axios from "axios";
import SearchInput from "@admin/src/htmlTemplate/SearchInput";
import ResidentCommunityLi from "@/components/ResidentCommunity/ResidentCommunityLi";
import noticeBanner from "@images/2/1/noticeBanner.png";

export default {
  components: {
    ResidentCommunityLi,
    SearchInput,
  },
  data: () => ({
    theadList: ["No", "공동체 이름", "공동체 소개", "구성원 수"],
    list: [],
    searchValue: "",
    noticeBanner,
  }),
  created() {
    this.getList();
  },
  methods: {
    getList() {
      axios
        .get(
          this.$store.state.dbUrl + "/admin_resiCommList?q=" + this.searchValue
        )
        .then(({ data }) => {
          this.list = data;
        });
    },
    setSearchValue(val) {
      this.searchValue = val;
    },
  },
  computed: {
    getCategory() {
      return this.$route.query.category;
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
  table {
    th {
      &:nth-of-type(1) {
        width: 70px;
      }
      &:nth-of-type(2) {
        width: 300px;
      }
      &:nth-of-type(4) {
        width: 150px;
      }
    }
    @media screen and (max-width: 900px) {
      th {
        &:nth-of-type(2) {
          width: 40%;
        }
        &:nth-of-type(3) {
          width: 60%;
        }
        &:nth-of-type(4) {
          width: 0;
          padding: 0;
          border-right: 0;
        }
      }
    }
    @media screen and (max-width: 499px) {
      th {
        &:nth-of-type(1) {
          width: 60px;
        }
        &:nth-of-type(2) {
          width: 100%;
        }
        &:nth-of-type(3) {
          width: 0;
          padding: 0;
          border-right: 0;
        }
      }
    }
  }
}
</style>
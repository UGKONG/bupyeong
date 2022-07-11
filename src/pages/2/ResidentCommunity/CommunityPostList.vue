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
          <i :class="$store.state.FontAwesome.stroke.angle.right" /> 뉴딜참여
          <i :class="$store.state.FontAwesome.stroke.angle.right" />
          주민공동체
        </p>
      </div>
    </h2>

    <h2 sub>
      {{ data.commTitle || "주민공동체 게시글 리스트" }}
      <p>
        <button @click="$router.go(-1)">뒤로가기</button>
        <button @click="communityJoin">공동체 신청</button>
        <button @click="setMemberListModalYN(true)">구성원</button>
      </p>
    </h2>
    <section>
      <div class="description">
        <h3>해당 공동체 소개내용</h3>
        1. 관리자 또는 공동체 리더가 밴드API사용을 위해
        <a :href="bandURL" target="_blank" v-text="bandURL" />에 접속하여
        서비스를 생성한다.<br />
        2. 생성 후 해당 서비스의 Access Token을 주민공동체 Band Token에 기입하고
        밴드를 선택한다.<br />
        3. 셋팅 끝.<br />
        4. 가져오기는 해당 Token의 밴드 게시글 리스트를 불러오고 어떤 게시글을
        불러올지 선택한다.<br />
        5. 가져올 수 있는 내용은 내용, 댓글 수, 글쓴이정보(유저키, 이름,
        프로필이미지, 설명), 이미지키, 이미지URL<br />
        6. 내보낼 수 있는 내용은 게시글 끝. (단, 본인의 네이버 계정으로 로그인
        한 후 업로드 할 밴드를 선택 하면 선택된 밴드로 게시글이 등록된다.)
      </div>
      <h3>
        <span>공동체 게시글 리스트</span>
        <span>
          <button @click="setBandModalYN(true)">게시글 불러오기</button>
          <button @click="write">게시글 작성</button>
        </span>
      </h3>
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
          <CommunityPostLi
            v-for="(item, idx) in list"
            :id="id"
            :key="idx"
            :item="item"
            :idx="idx"
          />
        </tbody>
      </table>
    </section>

    <!-- Modal -->
    <MemberListModal
      v-if="memberListModalYN"
      @setMemberListModalYN="setMemberListModalYN"
    />
    <BandModal
      v-if="bandModalYN"
      :getList="getList"
      @setBandModalYN="setBandModalYN"
    />
  </main>
</template>

<script>
import axios from "axios";
import SearchInput from "@admin/src/htmlTemplate/SearchInput";
import CommunityPostLi from "@/components/ResidentCommunity/CommunityPostLi";
import MemberListModal from "@/components/ResidentCommunity/MemberListModal";
import BandModal from "@/components/ResidentCommunity/BandModal";
import { useAlert } from "@admin/src/hook";
import noticeBanner from "@images/2/1/noticeBanner.png";

export default {
  components: {
    CommunityPostLi,
    SearchInput,
    MemberListModal,
    BandModal,
  },
  props: {
    id: String,
  },
  created() {
    this.getData();
  },
  data: () => ({
    data: {},
    list: [],
    searchValue: "",
    theadList: ["No", "제목", "작성자", "작성일", "첨부파일"],
    bandURL: "https://developers.band.us/develop/myapps/list",
    memberListModalYN: false,
    bandModalYN: false,
    noticeBanner,
  }),
  methods: {
    getData() {
      axios
        .get(this.$store.state.dbUrl + "/admin_resiCommData?commSeq=" + 3)
        .then(({ data }) => {
          this.getList();
          this.data = data;
        });
    },
    getList() {
      axios
        .get(
          this.$store.state.dbUrl + "/communityPostList?q=" + this.searchValue
        )
        .then(({ data }) => {
          this.list = data;
        });
    },
    communityJoin() {
      useAlert.success("주민공동체", "신청되었습니다.");
    },
    setMemberListModalYN(yn) {
      this.memberListModalYN = yn;
    },
    setSearchValue(val) {
      this.searchValue = val;
    },
    back() {
      this.$router.push("/Newdeal/ResidentCommunity");
    },
    write() {
      this.$router.push("/Newdeal/ResidentCommunity/" + this.id + "/write");
    },
    setBandModalYN(val) {
      this.bandModalYN = val;
    },
  },
  computed: {
    rightIcon() {
      return this.$store.state.FontAwesome.stroke.angle.right;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@index.scss";

main {
  button {
    padding: 6px 16px !important;
    color: #fff;
    background-color: $activeColor;
    margin-left: 5px !important;
    &:hover {
      color: #fff !important;
      background-color: $hoverColor !important;
    }
  }
  .description {
    width: 100%;
    min-height: 200px;
    max-height: 400px;
    margin-bottom: 20px;
    border: 1px solid var(--whiteGray);
    color: var(--gray);
    padding: 10px;
    word-break: break-all;
    /* @include flex(center); */

    a {
      text-decoration: underline;
    }
  }

  h3 {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;

    & > span {
      display: flex;
      align-items: center;
      white-space: nowrap;
      flex: 1;
      &:last-of-type {
        justify-content: flex-end;
      }
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
      span {
        align-self: stretch;
        @include flex();
        button {
          align-self: stretch;
          margin-left: 5px;
        }
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
        width: auto;
      }
      &:nth-of-type(3) {
        width: 200px;
      }
      &:nth-of-type(4) {
        width: 200px;
      }
      &:nth-of-type(5) {
        width: 200px;
      }
    }
  }
}

@media screen and (max-width: 900px) {
  h2[sub] {
    flex-direction: column;
    align-items: flex-start !important;
    & > p {
      width: 100%;
      margin-top: 20px;
    }
  }
  table {
    th {
      &:nth-of-type(5) {
        width: 0 !important;
        padding: 0 !important;
        border: none;
      }
      &:nth-of-type(3) {
        width: 150px !important;
      }
      &:nth-of-type(4) {
        width: 150px !important;
      }
    }
  }
}

@media screen and (max-width: 700px) {
  table {
    th {
      &:nth-of-type(1) {
        width: 60px !important;
      }
      &:nth-of-type(3) {
        width: 100px !important;
      }
      &:nth-of-type(4) {
        width: 100px !important;
      }
    }
  }
}
@media screen and (max-width: 500px) {
  main {
    h3 {
      flex-direction: column;
      & > span {
        width: 100%;
        &:last-of-type {
          margin-top: 20px;
        }
      }
    }
  }
  table {
    th {
      &:nth-of-type(3) {
        width: 0 !important;
        padding: 0 !important;
        border: none;
      }
      &:nth-of-type(4) {
        width: 0 !important;
        padding: 0 !important;
        border: none;
      }
    }
  }
}
</style>
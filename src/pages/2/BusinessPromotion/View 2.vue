<template>
  <main>
    <h2
      banner
      :style="{
        backgroundImage: 'url(' + processBanner + ')',
        backgroundColor: '#a5bdf3',
        height: '275px',
      }"
    >
      <div>
        <span>사업홍보물</span>
        <p history>
          <i :class="$store.state.FontAwesome.fill.home" />
          <i :class="$store.state.FontAwesome.stroke.angle.right" /> 뉴딜참여
          <i :class="$store.state.FontAwesome.stroke.angle.right" /> 사업홍보물
          <i :class="$store.state.FontAwesome.stroke.angle.right" /> 게시글
          상세정보
        </p>
      </div>
    </h2>
    <h2 sub>
      <span>{{ data.proTitle || "사업홍보물 상세" }}</span>
      <span>
        <button @click="copyURL">URL 복사</button>
        <button @click="print">페이지 인쇄</button>
        <button @click="popup">홍보물 팝업</button>
        <button @click="$router.go(-1)">뒤로가기</button>
      </span>
    </h2>
    <section contents>
      <span :style="{ width: !data.imgURL ? '100%' : null }">
        <div row>
          <span label>카테고리</span>
          <span content>{{ data.proCategoryName }}</span>
        </div>
        <div row>
          <span label>시작일</span>
          <span content>{{ data.proStartDT }}</span>
        </div>
        <div row>
          <span label>마감일</span>
          <span content>{{ data.proEndDT }}</span>
        </div>
        <div row>
          <span label>작성자</span>
          <span content>{{ data.writerName }}</span>
        </div>
        <div row>
          <span label>작성일</span>
          <span content>{{ data.writeDT }}</span>
        </div>
        <div row>
          <span label>URL</span>
          <span content>
            <a
              style="text-decoration: underline"
              :href="data.URL"
              target="_blank"
              >{{ data.URL }}</a
            >
          </span>
        </div>
        <div row style="flex-direction: column">
          <span label style="width: 100%">설명</span>
          <span content style="padding: 15px 12px" v-html="data.proContents" />
        </div>
      </span>
      <img v-if="data.imgURL" :src="data.imgURL" alt="홍보물 이미지" />
      <fileList :fileList="data.fileList" :marginTop="10" />
    </section>
  </main>
</template>

<script>
import axios from "axios";
import fileList from "@admin/src/pageSubComponents/common/fileList";
import processBanner from "@images/2/2/processBanner.png";
import { useAlert } from "@hook";

export default {
  components: {
    fileList,
  },
  props: {
    id: String,
  },
  data: () => ({
    data: {},
    processBanner,
  }),
  created() {
    this.getData();
  },
  methods: {
    getData() {
      axios
        .get(
          this.$store.state.dbUrl + "/admin_businessPromotionList/" + this.id
        )
        .then(({ data }) => {
          this.data = data;
        });
    },
    print() {
      window.open(this.data.imgURL, "페이지 인쇄", "width=800,height=700");
    },
    copyURL() {
      let context = this.data?.URL ?? "";
      window.navigator.clipboard
        .writeText(context)
        .then(() => useAlert.success("알림", "URL이 복사되었습니다."))
        .catch(() => console.log("복사실패.."));
    },
    popup() {
      let loc =
        "/assets/member/popup.html?img=" +
        this.data.imgURL +
        "&url=" +
        this.data.URL;
      console.log(loc);
      window.open(loc, "홍보물 팝업", "width=500,height=700");
    },
    back() {
      this.$router.push("/Newdeal/BusinessPromotion");
    },
  },
  computed: {},
};
</script>

<style lang="scss" scoped>
@import "@index.scss";

[contents] {
  @include flex(space-between);
  align-items: flex-start;
  flex-flow: wrap;
  & > span {
    display: block;
    width: calc(100% - 420px);
  }
  [row] {
    @include flex(flex-start);
    border: 1px solid #ddd;
    border-top: 0;
    &:first-of-type {
      border-top: 1px solid #ddd;
    }
  }
  [label] {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 100px;
    min-width: 100px;
    background-color: #eee;
    padding: 10px;
    align-self: stretch;
  }
  [content] {
    display: block;
    width: 100%;
    padding: 10px;
  }
}
img {
  width: 400px;
  transition: 0.2s;
}
h2[sub] {
  flex-direction: column;
  & > span {
    width: 100%;
    justify-content: flex-start !important;
    &:last-of-type {
      margin-top: 20px;
      justify-content: flex-end !important;
    }
  }
}
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

@media screen and (max-width: 900px) {
  [contents] {
    @include flex(space-between);
    align-items: flex-start;
    flex-flow: wrap;
    & > span {
      width: 100%;
      margin-bottom: 10px;
    }
  }
}
@media screen and (max-width: 500px) {
  img {
    width: 100%;
  }
}
a:hover {
  font-weight: 500 !important;
  text-decoration: underline !important;
}
</style>
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
        <span>푸드플랫폼</span>
        <p history>
          <i :class="$store.state.FontAwesome.fill.home" />
          <i :class="$store.state.FontAwesome.stroke.angle.right" /> 상권활성화
          <i :class="$store.state.FontAwesome.stroke.angle.right" />
          푸드플랫폼
        </p>
      </div>
    </h2>

    <h2 sub>
      <span>상점 리스트</span>
      <span btnWrap>
        <button
          v-for="(item, idx) in typeList"
          :key="idx"
          v-text="item.name"
          :class="{ active: activeType == item.code }"
          @click="typeClick(item.code)"
        />
      </span>
    </h2>
    <section>
      <div class="option">
        <div>
          <SearchInput
            :change="isChange"
            @setValue="setValue"
            @search="getList"
          />
          <span> </span>
        </div>
      </div>

      <!-- 게시글 -->
      <transition name="slide-y-reverse-transition" mode="out-in">
        <ImgContent v-if="activeType == 'img'" :list="list" />
        <TextContent v-if="activeType == 'text'" :list="list" />
      </transition>
    </section>
  </main>
</template>

<script>
import axios from "axios";
import SearchInput from "@admin/src/htmlTemplate/SearchInput";
import ImgContent from "@/components/Platform/ImgContent";
import TextContent from "@/components/Platform/TextContent";
import noticeBanner from "@images/2/1/noticeBanner.png";

export default {
  components: {
    SearchInput,
    ImgContent,
    TextContent,
  },
  watch: {
    activeType(val) {
      this.isChange = !this.isChange;
      this.value = "";
      this.getList();
    },
  },
  data: () => ({
    typeList: [
      { code: "img", name: "갤러리 뷰", img: {} },
      { code: "text", name: "리스브 뷰", img: {} },
    ],
    activeType: "img",
    isChange: false,
    value: "",
    list: [],
    noticeBanner,
  }),
  created() {
    this.getList();
  },
  methods: {
    getList() {
      let type =
        this.shopType == "platform"
          ? "admin_foodShopList"
          : "admin_foodTownList";
      axios
        .get(this.$store.state.dbUrl + "/" + type + "?q=" + this.value)
        .then(({ data }) => {
          this.list = data;
        });
    },
    typeClick(type) {
      this.activeType = type;
    },
    setValue(val) {
      this.value = val;
    },
  },
  computed: {
    shopType() {
      let temp = this.$route.path?.split("/");
      return temp[temp.length - 1].toLowerCase();
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@index.scss";
h2[sub] {
  justify-content: space-between;
}
[btnWrap] {
  @include flex(flex-end);
  & > button {
    white-space: nowrap;
    margin-left: 5px;
    padding: 6px 16px !important;
    background-color: #eee;
    border: 1px solid #ddd;
    color: #777;
    &:hover {
      color: #777 !important;
      background-color: #ddd !important;
    }
    &.active {
      color: #fff !important;
      background-color: #574ae1 !important;
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

@media screen and (max-width: 500px) {
  h2[sub] {
    flex-flow: column;
    & > span {
      width: 100%;
      justify-content: flex-start !important;
      &[btnwrap] {
        margin-top: 10px;
        justify-content: flex-end !important;
      }
    }
  }
}
</style>
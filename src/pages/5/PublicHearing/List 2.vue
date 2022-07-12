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
        <span>주민공청회</span>
        <p history>
          <i :class="$store.state.FontAwesome.fill.home" />
          <i :class="$store.state.FontAwesome.stroke.angle.right" /> 스마트시티
          <i :class="$store.state.FontAwesome.stroke.angle.right" />
          주민공청회
        </p>
      </div>
    </h2>

    <section>
      <div class="option">
        <span>
          <span />
          <span>
            <button
              v-for="(item, idx) in typeList"
              :key="idx"
              v-text="item.name"
              :class="{ active: activeType == item.code }"
              @click="typeClick(item.code)"
            />
          </span>
        </span>
        <div>
          <SearchInput
            :change="isChange"
            @setValue="setValue"
            @search="getList"
          />
        </div>
      </div>

      <!-- 게시글 -->
      <transition name="slide-y-reverse-transition" mode="out-in">
        <TextContent v-if="activeType == 'text'" :list="list" />
        <ImgContent v-if="activeType == 'img'" :list="list" />
      </transition>
    </section>
  </main>
</template>

<script>
import axios from "axios";
import SearchInput from "@admin/src/htmlTemplate/SearchInput";
import TextContent from "@/components/PublicHearing/TextContent";
import ImgContent from "@/components/PublicHearing/ImgContent";
import processBanner from "@images/2/2/processBanner.png";

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
      { code: "text", name: "리스브 뷰", img: {} },
      { code: "img", name: "갤러리 뷰", img: {} },
    ],
    activeType: "text",
    isChange: false,
    list: [],
    value: "",
    processBanner,
  }),
  created() {
    this.getList();
  },
  methods: {
    getList() {
      axios
        .get(this.$store.state.dbUrl + "/admin_phList?q=" + this.value)
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
};
</script>

<style lang="scss" scoped>
@import "@index.scss";

.option {
  @include flex(space-between);
  padding-bottom: 4px;

  & > span {
    width: 100%;
    @include flex(space-between);
    margin-bottom: 10px;
    & > span {
      @include flex();
      & > button {
        white-space: nowrap;
        margin-left: 5px;
        padding: 6px 16px !important;
        background-color: #eee;
        border: 1px solid #ddd;
        color: $gray;
        &:hover {
          color: $gray !important;
          background-color: $whiteGray !important;
        }
        &.active {
          color: #fff !important;
          background-color: $activeColor !important;
        }
      }
    }
  }

  ul[tab-list] {
    @include flex(flex-start);
    font-size: 13px;
    color: $gray;
    width: 70%;
    min-width: 320px;
    align-self: stretch;
    overflow-y: hidden;
    overflow-x: auto;
    padding-bottom: 2px;
  }

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
}
</style>
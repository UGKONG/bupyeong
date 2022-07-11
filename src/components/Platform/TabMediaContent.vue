<template>
  <section>
    <div option>
      <SearchInput
        @setValue="setValue"
        :width="250"
        :height="32"
        @search="getList"
      />
      <span v-if="isMaster">
        <button @click="setIsLiveModal(true)">라이브 방송</button>
        <button @click="setIsUploadModal(true)">업로드</button>
        <button @click="setIsRemoveMode(!isRemoveMode)">
          {{ isRemoveMode ? "완료" : "삭제" }}
        </button>
      </span>
    </div>
    <ul contents>
      <MediaLi
        v-for="(item, idx) in list"
        :key="idx"
        :id="id"
        :idx="idx"
        :item="item"
        :isRemoveMode="isRemoveMode"
        @getList="getList"
        @setIsRemoveMode="setIsRemoveMode"
      />
    </ul>

    <!-- Modal -->
    <transition name="fade-transition" mode="out-in">
      <UploadModal
        v-if="isUploadModal"
        :id="id"
        @setIsUploadModal="setIsUploadModal"
      />
      <LiveModal v-if="isLiveModal" :id="id" @setIsLiveModal="setIsLiveModal" />
    </transition>
  </section>
</template>

<script>
import axios from "axios";
import SearchInput from "@admin/src/htmlTemplate/SearchInput";
import MediaLi from "@/components/Platform/TabMedia/MediaLi";
import LiveModal from "@/components/Platform/TabMedia/LiveModal";
import UploadModal from "@/components/Platform/TabMedia/UploadModal";
export default {
  components: {
    LiveModal,
    UploadModal,
    MediaLi,
    SearchInput,
  },
  props: {
    id: String,
    isMaster: Boolean,
  },
  data: () => ({
    value: "",
    list: [],
    isRemoveMode: false,
    isLiveModal: false,
    isUploadModal: false,
  }),
  created() {
    this.getList();
  },
  methods: {
    getList() {
      axios
        .get(
          this.$store.state.dbUrl +
            "/shopMediaList?shopId=" +
            this.id +
            "&q=" +
            this.value
        )
        .then(({ data }) => {
          this.list = data;
        });
    },
    setIsLiveModal(val) {
      this.isLiveModal = val;
    },
    setIsUploadModal(val) {
      this.isUploadModal = val;
    },
    setValue(val) {
      this.value = val;
    },
    setIsRemoveMode(val) {
      this.isRemoveMode = val;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@index.scss";

section {
  @include wrap(block);

  [option] {
    @include shop-tab-option(space-between);
    padding-top: 4px;
    & > span {
      display: flex;
    }
    button {
      white-space: nowrap;
      margin-left: 5px;
      padding: 6px 16px !important;
      background-color: $activeColor;
      border: 1px solid #ddd;
      color: #fff;
      &:hover {
        color: #fff;
        background-color: $hoverColor !important;
      }
    }
  }
  [contents] {
    width: 100%;
    height: calc(100% - $shop-tab-optionHeight);
    padding-top: 10px;
    overflow: auto;
    @include flex(flex-start, row, wrap);
    align-items: flex-start;
    align-content: flex-start;
  }
}
</style>
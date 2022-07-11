<template>
  <section>
    <div option>
      <SearchInput
        @setValue="setValue"
        :width="250"
        :height="32"
        @search="getList"
      />
    </div>
    <ul contents>
      <MediaLi
        v-for="(item, idx) in list"
        :key="idx"
        :idx="idx"
        :item="item"
        @getList="getList"
      />
    </ul>
  </section>
</template>

<script>
import axios from "axios";
import SearchInput from "@admin/src/htmlTemplate/SearchInput";
import MediaLi from "@/components/Dlab/TabMedia1/MediaLi";

export default {
  components: {
    MediaLi,
    SearchInput,
  },
  data: () => ({
    value: "",
    list: [],
  }),
  created() {
    this.getList();
  },
  methods: {
    getList() {
      axios
        .get(
          this.$store.state.dbUrl +
            "/admin_dlabMediaList?category=1&q=" +
            this.value
        )
        .then(({ data }) => {
          this.list = data;
        });
    },
    setValue(val) {
      this.value = val;
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
    button {
      margin-left: 5px;
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
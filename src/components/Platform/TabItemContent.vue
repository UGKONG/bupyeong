<template>
  <section>
    <div option v-if="isMaster">
      <button @click="setIsModal(true)">카테고리 관리</button>
      <button
        v-text="isEdit ? '수정 완료' : '상품 수정'"
        @click="setIsEdit(isEdit ? false : true)"
      />
    </div>

    <ul contents>
      <ItemCategoryLi
        v-for="(item, idx) in categoryList"
        :key="idx"
        :item="item"
        :isEdit="isEdit"
        :itemList="filterItem(item.id)"
        :addHidden="addHidden"
        @getList="getList"
        @addList="addList"
        @popList="popList"
        @setAddHidden="setAddHidden"
      />
    </ul>

    <!-- Modal -->
    <transition name="fade-transition" mode="out-in">
      <ItemCategoryModal v-if="isModal" :id="id" @setIsModal="setIsModal" />
    </transition>
  </section>
</template>

<script>
import axios from "axios";
import ItemCategoryLi from "@/components/Platform/TabItem/ItemCategoryLi";
import ItemCategoryModal from "@/components/Platform/TabItem/ItemCategoryModal";

export default {
  components: {
    ItemCategoryLi,
    ItemCategoryModal,
  },
  props: {
    id: String,
    isMaster: Boolean,
  },
  data: () => ({
    isEdit: false,
    isModal: false,
    categoryList: [],
    list: [],
    addHidden: false,
  }),
  created() {
    this.getCategoryList();
  },
  methods: {
    getCategoryList() {
      axios
        .get(this.$store.state.dbUrl + "/shopItemCategory?shopId=" + this.id)
        .then(({ data }) => {
          this.categoryList = data;
          this.getList();
        });
    },
    getList() {
      axios
        .get(this.$store.state.dbUrl + "/shopItemList?shopId=" + this.id)
        .then(({ data }) => {
          this.list = data;
        });
    },
    addList(obj) {
      this.list.push(obj);
    },
    popList() {
      this.list.pop();
    },
    filterItem(categoryId) {
      return this.list.filter((x) => x.category == categoryId);
    },
    setIsModal(val) {
      this.isModal = val;
    },
    setIsEdit(val) {
      if (!val) {
        let filter = this.list.filter((x) => x.id == 0).length;
        if (filter > 0) {
          let result = this.list.filter((x) => x.id != 0);
          this.list = [...result];
          this.addHidden = false;
        }
      }
      this.isEdit = val;
    },
    setAddHidden(val) {
      this.addHidden = val;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@index.scss";

section {
  @include wrap(block);

  [option] {
    @include shop-tab-option();
    button {
      white-space: nowrap;
      margin-left: 5px;
      padding: 6px 16px !important;
      background-color: $activeColor;
      border: 1px solid #ddd;
      color: #fff;
      &:hover {
        color: #fff !important;
        background-color: $hoverColor !important;
      }
    }
  }
  [contents] {
    width: 100%;
    height: calc(100% - $shop-tab-optionHeight);
    padding-top: 10px;
    overflow: auto;
  }
}
</style>
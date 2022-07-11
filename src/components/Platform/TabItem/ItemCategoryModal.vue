<template>
  <section modal>
    <div wrap>
      <h2>
        카테고리 관리
        <button @click="$emit('setIsModal', false)">
          <i :class="$store.state.FontAwesome.stroke.x" />
        </button>
      </h2>
      <div contents>
        <Drag
          v-model="list"
          tag="ul"
          draggable=".item"
          :options="{ animation: 150 }"
        >
          <ItemCategoryModalLi
            v-for="(item, idx) in list"
            :key="item.id"
            :item="item"
            :idx="idx"
            class="item"
            @remove="remove"
          />
          <li class="add" @click="add">추가</li>
        </Drag>
        <div btn>
          <button @click="save">저장</button>
        </div>
      </div>
    </div>
    <div bg />
  </section>
</template>

<script>
import axios from "axios";
import Drag from "vuedraggable";
import ItemCategoryModalLi from "@/components/Platform/TabItem/ItemCategoryModalLi";
import { useAlert, useDelay } from "@hook";

export default {
  components: {
    Drag,
    ItemCategoryModalLi,
  },
  props: {
    id: String,
  },
  data: () => ({
    list: [],
  }),
  created() {
    this.getList();
  },
  methods: {
    save() {
      let filterLen = this.list.filter((x) => x.name == "").length;
      if (filterLen != 0) {
        useAlert.warn("상품 카테고리", "카테고리명을 입력해주세요.");
        return;
      }
      useAlert.success("상품 카테고리", "저장되었습니다.");
      this.$emit("setIsModal", false);
      console.log(this.list);
    },
    add() {
      let data = { id: 0, shopId: this.id, name: "", count: 0 };
      let tempList = [...this.list];
      tempList.push(data);
      this.list = tempList;

      let ul = document.querySelector("[contents] > ul");
      useDelay(0).then(() => ul.scrollTo(0, 9999999999));
    },
    remove(idx) {
      let tempList = [...this.list];
      let result = tempList.filter((x, i) => i != idx);
      this.list = result;
    },
    getList() {
      axios
        .get(this.$store.state.dbUrl + "/shopItemCategory?shopId=" + this.id)
        .then(({ data }) => {
          this.list = data;
        });
    },
  },
  computed: {},
};
</script>

<style lang="scss" scoped>
@import "@index.scss";

[contents] {
  & > ul {
    height: 330px;
    overflow: auto;
  }
  [btn] {
    @include flex(center);
    margin: 20px 0 10px;
  }

  li {
    @include border(1px solid $whiteGray, 4px);
    @include flex(flex-start, row);
    margin-bottom: 6px;
    padding: 8px;
    user-select: none;

    &.add {
      justify-content: center;
      background-color: $gray;
      color: $white;
      transition: 0.1s;
      cursor: pointer;

      &:hover {
        background-color: $darkGray;
      }
      & > * {
        @include font(15px, auto, 1px);
        margin: 0 3px;
      }
    }
  }
}
button {
  color: #fff;
  background-color: $activeColor;
  padding: 8px 18px !important;
  &:hover {
    color: #fff !important;
    background-color: $hoverColor !important;
  }
}

@media screen and (max-width: 620px) {
  [modal] > [wrap] {
    width: 100% !important;
    left: 0 !important;
    top: 0 !important;
    height: 100% !important;
    border-radius: 0 !important;
  }
}
</style>
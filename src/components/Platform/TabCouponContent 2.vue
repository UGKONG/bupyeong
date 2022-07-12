<template>
  <section>
    <div option v-if="isMaster">
      <span editInfo v-if="editMode"
        >수정과 삭제는 발행개수가 0일때만 가능합니다.</span
      >
      <button @click="setIsQRModal(true)">쿠폰인식</button>
      <button @click="setIsAddModal(true)">쿠폰생성</button>
      <button v-if="!editMode" @click="setEditMode(true)">편집</button>
      <button v-if="editMode" @click="setEditMode(false)">완료</button>
    </div>

    <table contents>
      <thead>
        <tr>
          <th
            v-for="(item, idx) in theadList"
            :key="idx"
            v-text="item"
            :style="
              item != ''
                ? {}
                : !editMode
                ? {}
                : {
                    width: '140px',
                  }
            "
          />
        </tr>
      </thead>
      <tbody>
        <CouponLi
          v-for="(item, idx) in list"
          :id="id"
          :key="idx"
          :item="item"
          :isMaster="isMaster"
          :editMode="editMode"
          @getList="getList"
          @setIsAddModal="setIsAddModal"
        />
      </tbody>
    </table>

    <!-- Modal -->
    <transition name="fade-transition" mode="out-in">
      <QRModal v-if="isQRModal" :id="id" @setIsQRModal="setIsQRModal" />
      <AddModal
        v-if="isAddModal"
        :id="id"
        :selectId="selectId"
        @getList="getList"
        @setIsAddModal="setIsAddModal"
      />
    </transition>
  </section>
</template>

<script>
import axios from "axios";
import QRModal from "@/components/Platform/TabCoupon/QRModal";
import AddModal from "@/components/Platform/TabCoupon/AddModal";
import CouponLi from "@/components/Platform/TabCoupon/CouponLi";

export default {
  components: {
    QRModal,
    AddModal,
    CouponLi,
  },
  props: {
    id: String,
    isMaster: Boolean,
  },
  data: () => ({
    theadList: [
      "쿠폰명",
      "할인정보",
      "생성일",
      "만료일",
      "생성개수",
      "발행개수",
      "상태",
      "",
    ],
    list: [],
    isAddModal: false,
    isQRModal: false,
    editMode: false,
    selectId: 0,
  }),
  created() {
    this.getList();
  },
  methods: {
    getList() {
      axios
        .get(this.$store.state.dbUrl2 + "/shopCouponList?shopId=" + this.id)
        .then(({ data }) => {
          this.list = data;
        });
    },
    setIsAddModal(val, id = 0) {
      this.isAddModal = val;
      this.selectId = id;
    },
    setIsQRModal(val) {
      this.isQRModal = val;
    },
    setEditMode(val) {
      this.editMode = val;
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
    border-bottom: none;
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
    [editInfo] {
      display: inline-block;
      margin-right: 10px;
      color: $red;
    }
  }
  [contents] {
    width: 100%;
    height: calc(100% - $shop-tab-optionHeight);
    padding-top: 10px;
    overflow: auto;

    th {
      &:nth-of-type(1) {
        width: 250px;
      }
      &:nth-of-type(2) {
        width: 100%;
      }
      &:nth-of-type(3) {
        width: 120px;
      }
      &:nth-of-type(4) {
        width: 120px;
      }
      &:nth-of-type(5) {
        width: 80px;
      }
      &:nth-of-type(6) {
        width: 80px;
      }
      &:nth-of-type(7) {
        width: 100px;
      }
      &:nth-of-type(8) {
        width: 106px;
      }
    }
  }
}
</style>
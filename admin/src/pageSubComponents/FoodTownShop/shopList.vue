<template>
  <tr>
    <td>
      <input type="checkbox" :id="'shopChk_' + item.shopSeq" @click="shopCheck" />
      <label :for="'shopChk_' + item.shopSeq" />
    </td>
    <td @click="editShop">{{ idx + 1 }}</td>
    <td @click="editShop">{{ item.shopName }}</td>
    <td @click="editShop">{{ item.shopMasterName }}</td>
    <td @click="editShop">{{ item.shopDescription }}</td>
    <td @click="editShop">{{ item.joinDT }}</td>
    <td>
      <button @click="viewPosition">위치보기</button>
    </td>
  </tr>
</template>

<script>
export default {
  props: {
    shopList: Array,
    item: Object,
    idx: Number,
  },
  data() {
    return {

    }
  },
  methods: {
    shopCheck(e) {
      let allCount = this.shopList.length;
      let els = document.querySelectorAll('[id^="shopChk_"]:checked');
      this.$emit('setSelectCount', els.length);
      document.querySelector('#shop-all-check').checked = allCount == els.length ? true : false;
    },
    editShop() {
      this.$emit('setModalType', 'U');
      this.$emit('setSelectShopObj', this.item);
      this.$emit('setAddShopModalYN', true);
    },
    viewPosition() {
      console.log(this.item.shopPosition)
    }
  },
  computed: {

  }
}
</script>

<style lang="scss" scoped>
tr {
  background-color: #fff;
  &:hover {
    background-color: #ddd;
  }
}
td {
  height: 34px;
  font-size: 15px;
  padding: 0 10px;
  text-align: center;
  position: relative;
  cursor: pointer;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  
  /* &:nth-of-type(3), */
  &:nth-of-type(5) {
    text-align: left;
  }

  label {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  button {
    padding: 2px 5px;
    box-shadow: none;

    &:hover {
      border-bottom: 1px solid #888;
    }
  }
}
</style>
<template>
  <li v-if="searchResult" @click="managerChoice">
    <div class="right">
      <p class="name">이름 : {{ item.name }}</p>
      <p class="description">연락처 : {{ item.phone }}</p>
    </div>
  </li>
</template>

<script>
export default {
  props: {
    item: Object,
    searchVal: String,
  },
  methods: {
    managerChoice(e) {
      let seq = this.item.memberSeq;
      let name = this.item.name;
      this.$emit('sendDataMasterChange', seq, name);
      this.$emit('dropDownHide');
    },
  },
  computed: {
    searchResult() {
      return (this.item.name.search(this.searchVal) > -1 || this.item.phone.search(this.searchVal) > -1);
    }
  }
}
</script>

<style lang="scss" scoped>
li {
  border: 1px solid #ddd;
  margin-bottom: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  
  &:last-of-type{margin-bottom: 0;}
  &:hover {
    border: 1px solid #444;
  }

  & > .right {
    width: 170px;
    height: 46px;
    padding: 4px;
    text-align: left;

    .name {height: 50%;}
    .description {
      height: 50%;
      overflow: auto;
    }
  }
}
</style>
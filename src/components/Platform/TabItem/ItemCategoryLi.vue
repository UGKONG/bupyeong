<template>
<li wrap>
  <h4 v-text="item.name" />
  <ul>
    <ItemLi v-for="(item, idx) in itemList" 
      :key="idx" :idx="idx" :item="item" :isEdit="isEdit" 
      @getList="getList" @popList="popList" @setAddHidden="setAddHidden"
    />

    <li add v-if="isEdit && !addHidden" @click="add">
      <i :class="$store.state.FontAwesome.stroke.plus" />
      추 가
    </li>
  </ul>
</li>
</template>

<script>
import ItemLi from '@/components/Platform/TabItem/ItemLi';

export default {
  components: {
    ItemLi,
  },
  props: {
    item: Object,
    itemList: Array,
    isEdit: Boolean,
    addHidden: Boolean,
  },
  data: () => ({
    tempArr: [],
  }),
  methods: {
    add() {
      let data = {
        id: 0,
        shopId: this.item.shopId,
        category: this.item.id,
        name: '',
        pay: '',
        imgPath: '',
      };

      this.$emit('addList', data);
      this.$emit('setAddHidden', true);
    },
    setAddHidden(val) {
      this.$emit('setAddHidden', val);
    },
    popList() {
      this.$emit('popList');
    },
    getList() {
      this.$emit('getList');
    },
  }
}
</script>

<style lang="scss" scoped>
@import '@index.scss';
[wrap] {
  margin-bottom: 24px;

  &:last-of-type {
    margin-bottom: 0;
  }

  & > h4 {
    height: 30px;
    @include font(15px, 500, 1px);
  }

  & > ul {
    @include flex(flex-start, row, wrap);

    & > li {
      @include border();
      width: 155px;
      height: 150px;
      margin-right: 8px;
      margin-bottom: 8px;
      position: relative;

      &[add] {
        @include flex(center, column);
        @include font(15px, auto, $gray, auto);
        cursor: pointer;
        transition: .2s;
        
        &:hover {
          background-color: $whiteGray;
          color: $black;
          opacity: .8;
        }
      }
    }
  }
}
</style>
<template>
  <li wrap>
    <h3>
      <span :title="item.title" v-text="item.title" />
      <router-link
        btn
        :to="'/Newdeal/University/' + item.id + '?tab=1'"
        v-text="'상세정보'"
      />
    </h3>
    <ul info>
      <li
        v-text="
          '과정기간 : ' +
          item.startDT.split(' ')[0] +
          ' ~ ' +
          item.endDT.split(' ')[0]
        "
      />
      <li v-text="'과정매니저 : ' + item.managerName" />
      <li>과정설명</li>
      <p v-html="item.context" style="height: 60px; overflow: auto" />
    </ul>
    <div sub-info>
      <span>수강인원현황 : {{ item.nowPerson }}/{{ item.personTotal }}명</span>
      <p
        v-text="
          '모집기간 : ' +
          item.recStartDT.split(' ')[0] +
          ' ~ ' +
          item.recEndDT.split(' ')[0]
        "
      />
    </div>
  </li>
</template>

<script>
export default {
  props: {
    item: Object,
  },
};
</script>

<style lang="scss" scoped>
@import "@index.scss";

li[wrap] {
  border: 1px solid $whiteGray;
  border-top: 2px solid $activeColor;
  padding: 20px;
  margin-bottom: 10px;

  h3 {
    font-size: 16px;
    position: relative;
    height: 28px;
    margin-bottom: 6px;

    span {
      display: inline-block;
      width: calc(100% - 80px);
      @include text-overflow();
    }
    a {
      float: right;
      background-color: $activeColor;
      color: $white;
      padding: 5px 14px !important;
      z-index: 2;

      &:hover {
        background-color: $activeColor !important;
        color: $white !important;
      }
    }
  }

  ul[info] {
    font-size: 14px;
    padding: 0 3px;

    li {
      position: relative;
      padding-left: 4px;
      margin-bottom: 6px;
    }
    li::before {
      content: "";
      position: absolute;
      top: 50%;
      right: 100%;
      transform: translateY(-50%);
      width: 3px;
      height: 3px;
      border-radius: 10px;
      background-color: $gray;
    }
  }

  div[sub-info] {
    @include flex(space-between, row, wrap);
    font-size: 14px;
    border-top: 1px solid $whiteGray;
    margin-top: 16px;
    padding-top: 16px;
  }
}
</style>
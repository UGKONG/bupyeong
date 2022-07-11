<template>
  <li>
    <div>공모사업 제목 : {{ item.businessName }}</div>
    <br />
    <p>
      <span>공모시작</span>
      <span>신청중</span>
      <span>공모종료</span>
      <span>선정완료</span>
    </p>
    <progress max="100" :value="percent" />
    <div description>
      <b>상 태</b><br />
      <span v-text="item.description" />
    </div>
  </li>
</template>

<script>
export default {
  props: {
    item: Object,
    idx: Number,
  },
  computed: {
    percent() {
      if (this.item.state == 0) return 33;  // 신청완료
      if (this.item.state == 1) return 66;  // 평가중
      if (this.item.state == 2) return 100; // 선정완료 (수락)
      if (this.item.state == 3) return 100; // 선정완료 (거절)
    }
  }
}
</script>

<style lang="scss" scoped>
li {
  border: 1px solid var(--whiteGray);
  padding: 10px;
  margin-bottom: 10px;
  
  & > p {
    position: relative;
    height: 20px;

    span {
      position: absolute;
      font-size: 13px;
      color: var(--gray);
      white-space: nowrap;
      top: 0;

      &:nth-of-type(1) {
        left: 0%;
        transform: translateX(0%);
      }
      &:nth-of-type(2) {
        left: 33%;
        transform: translateX(-50%);
      }
      &:nth-of-type(3) {
        left: 66%;
        transform: translateX(-50%);
      }
      &:nth-of-type(4) {
        left: 100%;
        transform: translateX(-100%);
      }
    }
  }

  & > [description] {
    margin-top: 20px;

    span {
      color: var(--darkGray);
    }
  }

  progress {
    height: 20px;
    width: 100%;
  }
}
</style>
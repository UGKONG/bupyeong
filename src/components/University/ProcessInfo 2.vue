<template>
  <div description>
    <p v-text="'과정기간 : ' + startDT + ' ~ ' + endDT" />
    <p v-text="'모집기간 : ' + recStartDT + ' ~ ' + recEndDT" />
    <p
      v-text="
        '수강생 인원 현황 : ' + data.nowPerson + '/' + data.personTotal + '명'
      "
    />
    <p v-text="'과정 매니저 이름 : ' + data.managerName" />
    <p v-text="'작성일 : ' + writeDT" />

    <p v-text="'설명'" style="margin-top: 30px; font-weight: 500" />
    <p v-html="data.context" />
  </div>
</template>

<script>
export default {
  props: {
    data: Object,
  },

  computed: {
    startDT() {
      return this.data.startDT?.split(" ")[0];
    },
    endDT() {
      return this.data.endDT?.split(" ")[0];
    },
    recStartDT() {
      return this.data.recStartDT?.split(" ")[0];
    },
    recEndDT() {
      return this.data.recEndDT?.split(" ")[0];
    },
    writeDT() {
      return this.data.writeDT?.split(" ")[0];
    },
  },
};
</script>

<style lang="scss" scoped>
[description] {
  width: 100%;
  margin-bottom: 20px;
  border: 1px solid var(--whiteGray);
  color: var(--darkGray);
  padding: 10px;
}
</style>
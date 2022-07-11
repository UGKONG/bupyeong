<template>
  <tr @click="listClick">
    <td v-text="idx + 1" />
    <td v-text="item.title" />
    <td v-text="item.writeDT.split(' ')[0]" />
    <td v-text="item.writerName" />
  </tr>
</template>

<script>
export default {
  props: {
    item: Object,
    idx: Number,
  },
  methods: {
    listClick() {
      this.$router.push('ResidentBusiness/' + this.item.id);
    }
  },
}
</script>

<style lang="scss" scoped>
tr {
  cursor: pointer;
}

@media screen and (max-width: 900px) {
  td:nth-last-of-type(1),
  td:nth-last-of-type(2) {
    width: 0;
    padding: 0;
    border-left: none;
    border-right: none;
  }
}
</style>
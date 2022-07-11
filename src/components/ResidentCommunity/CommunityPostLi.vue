<template>
  <tr @click="viewDetail">
    <td>{{ idx + 1 }}</td>
    <td>{{ item.title }}</td>
    <td>{{ item.writerName }}</td>
    <td>{{ item.writeDT.split(" ")[0] }}</td>
    <td>
      <i v-for="(file, idx) in item.fileList" :key="idx" :class="fileIcon" />
    </td>
  </tr>
</template>

<script>
export default {
  props: {
    id: String,
    idx: Number,
    item: Object,
  },
  methods: {
    viewDetail() {
      this.$router.push(
        "/Newdeal/ResidentCommunity/" + this.id + "/" + this.item.id
      );
    },
  },
  computed: {
    fileIcon() {
      return this.$store.state.FontAwesome.fill.file;
    },
  },
};
</script>

<style lang="scss" scoped>
tr {
  cursor: pointer;

  td {
    svg {
      font-size: 16px;
      margin-right: 5px;
    }
  }
}
</style>
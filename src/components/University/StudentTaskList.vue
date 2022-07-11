<template>
  <ul>
    <StudentTaskLi
      v-for="(item, idx) in list"
      :key="idx"
      :item="item"
      :send="findTask(item.id)"
    />
  </ul>
</template>

<script>
import axios from "axios";
import StudentTaskLi from "@/components/University/StudentTaskLi";
export default {
  components: {
    StudentTaskLi,
  },
  props: {
    id: String,
    post: String,
  },
  data: () => ({
    list: [],
    sendList: [],
  }),
  created() {
    this.getList();
  },
  methods: {
    getList() {
      axios
        .get(this.$store.state.dbUrl + "/taskList?processId" + this.id)
        .then(({ data }) => {
          this.list = data;
          this.getSendList();
        });
    },
    getSendList() {
      axios
        .get(
          this.$store.state.dbUrl +
            "/sendTaskList?processId=" +
            this.id +
            "&studentId=" +
            this.post
        )
        .then(({ data }) => {
          this.sendList = data;
        });
    },
    findTask(taskId) {
      let find = this.sendList.find((x) => x.taskId == taskId);
      return find;
    },
  },
  computed: {},
};
</script>

<style lang="scss" scoped>
@import "@index.scss";
</style>
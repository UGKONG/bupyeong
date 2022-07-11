<template>
  <ul>
    <TaskTeacherLi
      v-for="(item, idx) in list"
      :key="idx"
      :item="item"
      :idx="idx"
    />
  </ul>
</template>

<script>
import TaskTeacherLi from "@/components/University/TaskTeacherLi";
import axios from "axios";
export default {
  components: {
    TaskTeacherLi,
  },
  props: {
    id: String,
    post: String,
  },
  data: () => ({
    list: [],
  }),
  created() {
    this.getList();
  },
  methods: {
    getList() {
      axios
        .get(
          this.$store.state.dbUrl +
            "/sendTaskList?processId=" +
            this.id +
            "&taskId=" +
            this.post
        )
        .then(({ data }) => {
          this.list = data;
        });
    },
  },
  computed: {},
};
</script>

<style lang="scss" scoped>
@import "@index.scss";
</style>
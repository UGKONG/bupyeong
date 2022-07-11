<template>
  <ul>
    <StudentClassLi v-for="(item, idx) in list" :key="idx" :item="item" />
  </ul>
</template>

<script>
import axios from "axios";
import StudentClassLi from "@/components/University/StudentClassLi";
export default {
  components: { StudentClassLi },
  props: {
    id: String,
    post: String,
  },
  data: () => ({ list: [] }),
  created() {
    this.getList();
  },
  methods: {
    getList() {
      axios
        .get(
          this.$store.state.dbUrl +
            "/watchClassList?processId=" +
            this.id +
            "&studentId=" +
            this.post
        )
        .then(({ data }) => {
          this.list = data;
          this.isClassComplete();
        });
    },
    isClassComplete() {
      let count = 0;
      this.list.forEach((li) => {
        let now = li.nowLength;
        let all = li.allLength;
        let calc = now == 0 && all == 0 ? 0 : (now / all) * 100;
        let result = calc >= 90 ? true : false;
        if (result) count += 1;
      });
      this.$emit("setClassCount", this.list.length, count);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@index.scss";
</style>
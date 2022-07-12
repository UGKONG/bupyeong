<template>
  <tr @click="listClick">
    <td v-text="No" />
    <td v-text="item.categoryName" />
    <td v-text="item.title" />
    <td date-time>
      <span date v-text="item.writeDT.split(' ')[0]" />
      <span time v-text="item.writeDT.split(' ')[1]" />
    </td>
    <td v-text="item.writerName" />
  </tr>
</template>

<script>
export default {
  props: {
    item: Object,
    idx: Number,
    fixedListCount: Number,
  },
  created() {
    [
      "2022년 부평구 도시재생현장지원센터 사업소개!",
      "2021년 부평구 도시재생 주민공모사업 결과공유(단체별 활동 결과)",
      "2021년 부평구 도시재생 선진지 견학 결과공유",
      "2022 새해 복 많이 받으세요~",
      "함께하는 자원순환 실천 '부평구 친환경 정책'",
      "청년인턴 BOO&BBO의 마지막 인사",
      "2021 부평구 도시재생대학 2기 수료식 및 작품 소개",
      "'인천도시재생축제' 유튜브 콘텐츠 현장 스케치",
      "2021년 부평구 도시재생 선진지 견학 '함께 걸어요, 부평'",
      "[도시재생뉴딜 청년인턴]알!쏭?달!쏭?, 부뽀에게 물어봐 -현장리포트 굴포천 복원, ...",
      "[도시재생뉴딜 청년인턴]알!쏭?달!쏭?, 부뽀에게 물어봐 -현장리포트 스마트 로봇주차...",
      "2021년 부평구 도시재생 선진지 견학 ④<공주 제민천과 중학동>",
      "2021년 부평구 도시재생 선진지 견학 ③<경의선숲길과 세모길>",
      "2021년 부평구 도시재생 선진지 견학 ②<가좌완충녹지>",
      "주민 참여, 협의, 소통을 위한 라운드테이블",
      "성공적인 도시재생을 위해 꼭 필요한 것은? 주민갈등조정!",
    ];
  },
  methods: {
    listClick() {
      this.$router.push("Notice/" + this.item.id);
    },
  },
  computed: {
    No() {
      return this.idx + this.fixedListCount + 1;
    },
  },
};
</script>

<style lang="scss" scoped>
tr {
  cursor: pointer;
}

@media screen and (max-width: 900px) {
  td:nth-last-of-type(1) {
    border-left: none;
    border-right: none;
  }
}
@media screen and (max-width: 800px) {
  td {
    span[time] {
      display: none;
    }
  }
}
@media screen and (max-width: 600px) {
  td:nth-of-type(1) {
    border-right: none;
  }
  td:nth-of-type(2) {
    border-left: none;
    border-right: none;
  }
}
@media screen and (max-width: 499px) {
  td:nth-last-of-type(2) {
    border-left: none;
    border-right: none;
  }
}
</style>
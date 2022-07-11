<template>
  <section>
    <div class="head">
      <h2 v-text="settingName" />
      <label>설정항목 : </label>
      <button 
        v-for="set in settingList" 
        v-text="set.settingName"
        :key="set.settingSeq" 
        :data-component-name="set.componentName" 
        :class="{'active' : set.componentName == settingComponentName}"
        @click="settingBtnClick"
      />
    </div>
    <component class="body" :is="settingComponentName" />
  </section>
</template>

<script>

export default {
  components: {
    bandSet: () => import('../pageSubComponents/Setting/bandSet.vue'),
    memberRight: () => import('../pageSubComponents/Setting/memberRight.vue'),
    adminRight: () => import('../pageSubComponents/Setting/adminRight.vue'),
    information: () => import('../pageSubComponents/Setting/information.vue')
  },
  data() {
    return {
      settingComponentName: '',
      settingList: [
        {settingSeq: '1', settingName: '네이버 BAND 연동', componentName: 'bandSet'},
        {settingSeq: '2', settingName: '회원 권한 설정', componentName: 'memberRight'},
        {settingSeq: '3', settingName: '관리자 권한 설정', componentName: 'adminRight'},
        {settingSeq: '4', settingName: '정보', componentName: 'information'},
      ]
    }
  },
  created() {
    this.settingComponentName = this.settingList[0].componentName;
  },
  methods: {
    settingBtnClick(e) {
      let componentName = e.target.getAttribute('data-component-name');
      this.settingComponentName = componentName;
    }
  },
  computed: {
    settingName() {
      let obj = this.settingList.find(x => x.componentName == this.settingComponentName);
      return obj.settingName;
    }
  }
}
</script>

<style lang="scss" scoped>
  .head {
    padding: 10px 10px;
    border-bottom: 1px solid #eee;
    h2 {
      font-size: 22px;
      font-weight: 500;
      height: 34px;
    }
    button {
      padding: 4px 8px;
      background-color: #fff;
      margin-left: 5px;
      font-size: 13px;
      &.active {
        border-bottom: 1px solid green;
      }
    }
  }
  .body {
    height: calc(100% - 83px);
    overflow: auto;
  }
</style>
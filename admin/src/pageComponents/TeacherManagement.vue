<template>
  <section class="main">
    <ul>
      <addTeacherList
        :listSetMode="listSetMode"
        @setListSetMode="setListSetMode"
      />
      <setTeacherList 
        v-for="(manager, idx) in processManagerList" 
        :key="idx" 
        :manager="manager"
        :listSetMode="listSetMode"
        @setListSetMode="setListSetMode"
      />
    </ul>
  </section>
</template>

<script>
import { Store } from '../store';
import { useRest } from '../hook';

export default {
  components: {
    addTeacherList: () => import('../pageSubComponents/University/addTeacherList.vue'),
    setTeacherList: () => import('../pageSubComponents/University/setTeacherList.vue'),
  },
  props: {
    sendData: Object,
    modalInDarkDivOpen: Function,
    modalInDarkDivClose: Function,
  },
  data() {
    return {
      processManagerList: [],
      editData: {
        seq: '',
        img: '',
        name: '',
        description: '',
      },
      listSetMode: false,
    }
  },
  created() {

    useRest({
      url: Store.globalURL + 'admin_processManagerList',
      success: (data) => this.processManagerList = data
    });

  },
  methods: {
    setListSetMode(bool) {
      this.listSetMode = bool;
    }
  }
}
</script>

<style lang="scss" scoped>
  .main {
    padding: 8px;
    overflow: auto;

    & > ul {
      margin-bottom: 0;
      overflow: auto;
    }
  }
</style>
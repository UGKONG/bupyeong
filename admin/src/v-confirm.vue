<template>
  <div>
    <section id="Confirm" :style="confirmStyle">
      <div class="wrap">
        <div class="icon"><i :class="returnIcon" /></div>
        <div class="text">
          <p class="title" v-text="returnInfo.title" />
          <p class="text" v-text="returnInfo.text" />
        </div>
      </div>
      <v-btn small elevation="0" @click="no">취소</v-btn>
      <v-btn small elevation="0" @click="ok">확인</v-btn>
    </section>
    <div class="bg" v-if="returnYN" />
  </div>
</template>

<script>
import { Store } from './store';
export default {
  data() {
    return {
      list: {
        info: {icon: 'fas fa-info-circle', txt: '#f8f9fb', bg: '#0c86eb', progress: 'rgb(12 117 204)'},
        warn: {icon: 'fas fa-exclamation-triangle', txt: '#353a40', bg: '#feb100', progress: 'rgb(196 140 11)'},
        success: {icon: 'fas fa-check-circle', txt: '#f8f9fb', bg: '#54ac3b', progress: 'rgb(65 158 38)'},
        error: {icon: 'fas fa-times', txt: '#f8f9fb', bg: '#ff395a', progress: 'rgb(214 41 70)'},
        other: {icon: 'fas fa-question', txt: '#f8f9fb', bg: '#464646', progress: 'rgb(61 52 52)'}
      },
      defaultColor: '#ffffff00'
    }
  },
  methods: {
    confirmClose() {
      Store.setConfirmYN(false);
    },
    ok() {
      Store.confirmInfo.ok();
      Store.setConfirmYN(false);
    },
    no() {
      Store.confirmInfo.no();
      Store.setConfirmYN(false);
    }
  },
  computed: {
    obj (){ return this.list[Store.confirmInfo.icon] },
    confirmProgressColor () { return this.obj?.progress },
    confirmStyle() { 
      return { 
        backgroundColor: this.obj?.bg, 
        color: this.obj?.txt, 
        top: (this.returnYN ?? false) ? '30px' : '-120px'
      }
    },
    returnIcon() { return this.obj?.icon },
    returnYN: () => Store.confirmYN,
    returnInfo: () => Store.confirmInfo,
  }
}
</script>

<style lang="scss" scoped>
.bg {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: #00000030;
  cursor: not-allowed;
  z-index: 9999;
}

#Confirm {
  position: fixed;
  left: 50%;
  width: 420px;
  height: 104px;
  transform: translateX(-50%);
  background-color: #fff;
  border-radius: 4px;
  box-shadow: 0px 2px 6px #00000050;
  z-index: 999999999999999999999999999;
  transition: .3s;
  
  & > .wrap {
    position: relative;
    width: 100%;
    height: 70px;
    display: flex;
    justify-content: space-between;
    padding: 10px;

    & > div {

      &.icon {
        width: 50px;
        min-width: 50px;
        font-size: 34px;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      &.text {
        padding: 0 10px;
        width: calc(100% - 50px);

        & > .title {
          font-weight: 400;
          letter-spacing: .5px;
          height: 50%;
        }
        & > .text {
          font-size: 13px;
          height: 50%;
          display: flex;
          align-items: center;
          padding-bottom: 3px;
          text-overflow: ellipsis;
          overflow: hidden;
          white-space: nowrap;
          font-weight: 300;
        }
      }

    }

  }

  button {
    float: right;
    margin-right: 6px;
    border: 1px solid #e6a42b20;
    &:first-of-type{
      background-color: rgb(12,117,204);
      color: #75bcf7;
    }
    &:last-of-type{
      background-color: #055cc8;
      color: #fff;
    }
  }
}
</style>
<template>
  <section id="Alert" :style="alertStyle">
    <div class="wrap">
      <div class="icon"><i :class="returnIcon" /></div>
      <div class="text">
        <p class="title" v-text="returnInfo.title" />
        <p class="text" v-text="returnInfo.text" />
      </div>
      <button class="xBtn" @click="alertClose"><i class="fas fa-times" /></button>
      <article class="progress"><div :style="{
        width: returnPercent,
        backgroundColor: returnYN ? alertProgressColor : defaultColor,
      }" /></article>
    </div>
  </section>
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
    alertClose() {
      Store.setAlertYN(false);
    },
  },
  computed: {
    obj (){ return this.list[Store.alertInfo.icon] },
    alertProgressColor () { return this.obj?.progress },
    alertStyle() { 
      return { 
        backgroundColor: this.obj?.bg, 
        color: this.obj?.txt, 
        top: (this.returnYN ?? false) ? '10px' : '-100px'
      }
    },
    returnIcon() { return this.obj?.icon },
    returnYN: () => Store.alertYN,
    returnInfo: () => Store.alertInfo,
    returnPercent: () => Store.alertPercent + '%',
  }
}
</script>

<style lang="scss" scoped>
#Alert {
  position: fixed;
  right: 10px;
  width: 400px;
  height: 70px;
  background-color: #fff;
  border-radius: 4px;
  box-shadow: 0px 2px 6px #00000050;
  z-index: 99999999999999999999999999;
  transition: .4s;
  
  & > .wrap {
    position: relative;
    width: 100%;
    height: 100%;
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
        width: calc(100% - 64px);

        & > .title {
          font-weight: 500;
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
        }
      }

    }

  }

  .progress {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 4px;
    margin: 0;
    background-color: #eeeeee50;

    & > div {
      height: 100%;
      transition: 2s;
    }
  }

  .xBtn {
    width: 14px;
    height: 14px;
    background: transparent;
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 16px;
    opacity: .6;
  }
  .xBtn:hover {
    box-shadow: none;
    opacity: 1;
  }
}
</style>
<template>
  <section>
    <h2>
      <span>
        <i class="fas fa-video" />
        미디어 미리보기
      </span>
      <div>
        <button class="saveBtn" @click="download">
          <i class="fas fa-download" />다운로드
        </button>
        <button @click="() => {
          $emit('setMediaPreviewYN', false, '', '');
          modalInDarkDivClose();
        }">
          <span v-for="x in 2" :key="x" />
        </button>
      </div>
    </h2>
    <article>
      <p>미디어 제목 : {{ mediaPreviewTitle }}</p>
      <video :src="mediaPreviewURL" controls />
    </article>
  </section>
</template>

<script>
export default {
  props: {
    mediaPreviewTitle: String,
    mediaPreviewURL: String,
    modalInDarkDivClose: Function,
  },
  methods: {
    download () {
      let a = document.createElement('a');
          a.href = this.mediaPreviewURL;
          a.target = 'new';
          a.download = this.mediaPreviewTitle;
          a.click();
          a.remove();
    },
  },
}
</script>

<style lang="scss" scoped>
section {
  position: fixed;
  top: 200px;
  left: 50%;
  transform: translateX(-50%);
  width: 600px;
  height: 400px;
  background-color: #fff;
  border: 1px solid #aaa;
  z-index: 1900;
  overflow: hidden;

  & > h2 {
    font-size: 16px;
    height: 50px;
    background-color: #FDF4F5;
    border-bottom: 1px solid #fcedee;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 12px;
    font-weight: 500;
    position: relative;
    & > span {
      display: flex;
      align-items: center;
    }
    i {
      color: #555;
      font-size: 18px;
      margin-right: 6px;
      transform: translateY(1px);
    }
    div {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    button {
      display: block;
      background-color: #ff6a6a;
      width: 26px;
      height: 26px;
      color: #fff;
      position: relative;
      border-radius: 200px;
      cursor: pointer;
      border: none;
      span {
        position: absolute;
        width: 50%;
        height: 2px;
        background-color: #fff;
        border-radius: 10px;
        top: 50%;
        left: 50%;
        &:first-of-type {transform: translate(-50%, -50%) rotate(45deg);}
        &:last-of-type {transform: translate(-50%, -50%) rotate(-45deg);}
      }
    }
    button.saveBtn {
      width: 90px;
      margin-right: 10px;
      background-color: #0662f9;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 400;
      font-size: 13px;
      i {
        color: #fff;
        font-size: 12px;
      }
    }
  }

  & > article {
    width: 100%;
    height: calc(100% - 50px);
    padding: 14px;

    & > p {
      height: 20px;
      margin-bottom: 10px;
    }
    video {
      width: 100%;
      height: calc(100% - 30px)
    }
  }
}
</style>
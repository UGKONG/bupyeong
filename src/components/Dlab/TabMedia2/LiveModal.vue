<template>
  <section modal>
    <div wrap>
      <h2>
        라이브 방송
        <button @click="$emit('setIsLiveModal', false)">
          <i :class="$store.state.FontAwesome.stroke.x" />
        </button>
      </h2>
      <div contents>
        <div row>
          <label>
            제목 : 
            <input type="text" ref="title" v-model="data.title" />
          </label>
        </div>
        <div row>
          <label>
            라이브 URL : 
            <input type="text" ref="liveURL" v-model="data.url" />
          </label>
        </div>
        <div row>
          <label description>
            <span>설명</span>
            <textarea ref="contents" v-model="data.contents" />
          </label>
        </div>
        <div btn>
          <button @click="save">저장</button>
        </div>
      </div>
    </div>
    <div bg />
  </section>
</template>

<script>
import { useSendValidation, useAlert } from '@hook';
export default {
  props: {
    id: String,
  },
  data: () => ({
    data: {}
  }),
  created() {
    this.init();
  },
  methods: {
    init() {
      this.data = { shopId: this.id, title: '', url: '', contents: '', type: 1 }
    },
    save() {
      let pass = useSendValidation([
        this.$refs.title,
        this.$refs.liveURL,
        this.$refs.contents
      ], () => {
        useAlert.warn('라이브 방송', '빈칸을 입력해주세요.');
      });
      if (!pass) return;

      // Success
      useAlert.success('라이브 방송', '저장되었습니다.');
      this.$emit('setIsLiveModal', false);
      console.log(this.data);
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@index.scss';
[modal] > div[wrap] {
  height: 424px;
}
[contents] {

  [row] {
    margin-bottom: 10px;

    label {
      @include flex(flex-start, row, nowrap);
      width: 100%;
      white-space: nowrap;

      &[description] {
        flex-flow: column;
        span {
          width: 100%;
          margin-bottom: 4px;
          align-items: flex-start;
        }
        textarea {
          height: 200px;
        }
      }
    }
    input[type="text"] {
      margin-left: 10px;
      width: 100%;
    }
  }

  [btn] {
    @include flex(center);
    margin: 20px 0 10px;
  }

}
</style>
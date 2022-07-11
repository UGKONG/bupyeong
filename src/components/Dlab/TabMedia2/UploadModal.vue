<template>
  <section modal>
    <div wrap>
      <h2>
        미디어 업로드
        <button @click="$emit('setIsUploadModal', false)">
          <i :class="$store.state.FontAwesome.stroke.x" />
        </button>
      </h2>
      <div contents>
        <div row>
          <label>
            제목 : <input type="text" ref="title" v-model="data.title" />
          </label>
        </div>
        <div row>
          <label description>
            <span>설명</span>
            <textarea ref="contents" v-model="data.contents" />
          </label>
        </div>
        <div row>
          파일유형 : 
          <label option>
            <input type="radio" name="media" value="2" v-model="data.type" checked>
            동영상
          </label>
          <label option>
            <input type="radio" name="media" value="3" v-model="data.type">
            이미지
          </label>
        </div>
        <div row>
          파일첨부 : 
          <input type="file" ref="file" id="file" @change="fileChange" />
          <label option file for="file">
            {{ data.type == 2 ? '동영상' : '이미지' }} 선택
          </label>
        </div>
        <div row>
          <label>
            파일정보 : 
            <span file-info>{{ fileInfo }}</span>
            <span file-none v-show="!fileInfo">파일을 선택해주세요.</span>
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
import { useSendValidation, useAlert, useFileSize } from '@hook';

export default {
  props: {
    id: String,
  },
  data: () => ({
    data: {},
    fileInfo: '',
  }),
  created() {
    this.init();
  },
  methods: {
    init() {
      this.data = { shopId: this.id, title: '', url: '', contents: '', type: "2", file: {} }
    },
    save() {
      let pass = useSendValidation([
        this.$refs.title,
        this.$refs.contents,
        this.fileInfo
      ], () => {
        useAlert.warn('미디어 업로드', '빈칸을 입력해주세요.');
      });
      if (!pass) return;

      // Success
      useAlert.success('미디어 업로드', '저장되었습니다.');
      this.$emit('setIsUploadModal', false);
      console.log(this.data);
    },
    fileChange(e) {
      let file = e.target.files[0];
      if (!file) {
        this.data.file = {};
        this.fileInfo = '';
        return;
      }
      this.data.file = file;
      this.fileInfo = `[파일명: ${file.name} / 용량: ${useFileSize(file.size)}]`;
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@index.scss';
$width: 600px;

[modal] > div[wrap] {
  width: $width;
  height: 400px;
  left: calc(50% - ($width / 2));
}
[contents] {

  input[type="file"] {display: none}

  [row] {
    margin-bottom: 10px;

    label:not([option]) {
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
          height: 100px;
        }
      }
    }
    
    span[file-info] {
      margin-left: 5px;
    }
    span[file-none] {
      color: $gray;
      margin-left: 5px;
    }
    
    input[type="text"] {
      margin-left: 10px;
      width: 100%;
    }
    input[type="radio"] {
      margin-right: 2px;
    }
    label[file] {
      border: none;
      padding: 4px 14px !important;
      background-color: #ddd;
      color: #555;
      font-size: 14px;
      cursor: pointer;
      margin-left: 5px;

      &:hover {
        background-color: #ccc;
        color: #333;
      }
    }
  }

  [btn] {
    @include flex(center);
    margin: 20px 0 10px;
  }
}
</style>
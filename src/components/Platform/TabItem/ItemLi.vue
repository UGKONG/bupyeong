<template>
  <li>
    <div img><div :style="imgStyle" /></div>
    <div info>
      <p>{{ item.name }}</p>
      <p>{{ pay }}</p>
    </div>

    <transition name="fade-transition">
      <div edit v-if="isEdit">
        <input v-if="!inputMode" type="file" :id="`file${idx}`" @change="fileChange" />
        <label v-if="!inputMode" :for="`file${idx}`">이미지 변경</label>
        <button v-if="!inputMode" @click="setInputMode(true)">정보 변경</button>
        <button v-if="!inputMode" @click="remove">삭제</button>

        <input v-if="inputMode" type="text" ref="name" v-model="data.name" />
        <input v-if="inputMode" type="number" ref="pay" v-model="data.pay" />
        <div btns v-if="inputMode">
          <button @click="save">저장</button>
          <button @click="inputCancel">취소</button>
        </div>
      </div>
    </transition>
  </li>
</template>

<script>
import axios from 'axios';
import { useNumberFormat, useAlert, useDelay, useSendValidation } from '@hook';
import tempImg from '@images/tempImg.png';

export default {
  props: {
    idx: Number,
    item: Object,
    isEdit: Boolean,
  },
  data: () => ({
    tempImg,
    changeImg: null,
    inputMode: false,
    data: {}
  }),
  created() {
    this.data = {...this.item};
    let isTrue = this.item.id;
    if (!isTrue) {
      this.inputMode = true;
      useDelay(10).then(() => this.$refs.name.focus());
    }
  },
  methods: {
    save() {
      // validation
      let pass = useSendValidation(
        [this.$refs.name, this.$refs.pay], 
        () => useAlert.warn('상품', '상품명과 금액을 입력해주세요.')
      );
      if (!pass) return;

      let isTrue = this.data.id;
      if (!isTrue) {
        let data = {
          name: this.data.name, 
          pay: Number(this.data.pay),
          shopId: this.data.shopId,
          category: this.data.category,
          imgPath: ""
        };
        axios.post(this.$store.state.dbUrl + '/shopItemList', data)
          .then(({data}) => {
            console.log(data);
            useAlert.success('상품', '저장이 완료되었습니다.');
            this.$emit('getList');
            this.inputMode = false;
            this.$emit('setAddHidden', false);
          });
        return;
      }
      
      let data = {name: this.data.name, pay: Number(this.data.pay)};
      axios.patch(this.$store.state.dbUrl + '/shopItemList/' + this.item.id, data)
        .then(({data}) => {
          useAlert.success('상품', '저장이 완료되었습니다.');
          this.$emit('getList');
          this.inputMode = false;
        });
    },
    remove() {
      axios.delete(this.$store.state.dbUrl + '/shopItemList/' + this.item.id)
        .then(({data}) => {
          useAlert.success('상품', '상품이 삭제되었습니다.');
          this.$emit('getList');
        })
    },
    inputCancel() {
      let isTrue = this.item.id;
      if (!isTrue) {
        this.$emit('popList');
        this.$emit('setAddHidden', false);
      }
      this.inputMode = false;
      this.data = {...this.item};
    },
    fileChange(e) {
      let file = e.target.files[0];
      let url = URL.createObjectURL(file);
      this.changeImg = url;
    },
    setInputMode(val) {
      this.inputMode = val;

      useDelay(10).then(() => {
        if (val) {
          let el = this.$refs.name;
          el && el.focus();
        }
      });
    },
  },
  computed: {
    imgStyle() {
      return {backgroundImage: 'url(' + (this.changeImg || this.item.imgPath || this.tempImg) + ')'}
    },
    pay() {
      return useNumberFormat(this.item.pay) + '원';
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@index.scss';
$h: 50px;

li {
  [img] {
    height: calc(100% - $h);
    overflow: hidden;
    &:hover > div {
      transform: scale(1.1);
    }
    & > div {
      transition: .3s;
      @include wrap(block);
      @include background-reset(cover);
    }
  }
  [info] {
    border-top: 1px solid $whiteGray;
    height: $h;

    p {
      @include flex(center);
      height: 50%;

      &:first-of-type {padding-top: 4px; font-size: 14px; white-space: nowrap;}
      &:last-of-type {padding-bottom: 3px; font-size: 13px; color: $gray;}
    }
  }

  [edit] {
    @include wrap(flex);
    @include flex(center, column);
    @include center();
    background-color: $editBg;

    & > input {
      &[type="text"], &[type="number"] {
        width: 80%;
        margin-bottom: 10px;
      }

    }
    & > input[type="file"] {
      display: none;
    }
    & > label {
      @include flex(center);
      width: 100px;
      margin-bottom: 10px;
      background-color: #ddd;
      border: none;
      padding: 4px 14px;
      color: #555;
      font-size: 13px;
      cursor: pointer;
    }
    & > button {
      width: 100px;
      margin-bottom: 10px;
      font-size: 13px;
      &:last-of-type {
        margin-bottom: 0;
      }
    }
  }
}
</style>
<template>
  <section modal>
    <div wrap>
      <h2>
        쿠폰 생성
        <button @click="$emit('setIsAddModal', false)">
          <i :class="$store.state.FontAwesome.stroke.x" />
        </button>
      </h2>
      <div contents>
        <div row>
          <label>
            쿠폰명 : 
            <input type="text" ref="title" v-model="data.title" />
          </label>
        </div>
        <div row>
          <label>
            할인정보 : 
            <input type="text" ref="description" v-model="data.description" />
          </label>
        </div>
        <!-- <div row>
          <label>
            발행일 : 
            <input type="date" ref="startDT" v-model="data.startDT" />
          </label>
        </div> -->
        <div row>
          <label>
            만료일 : 
            <input type="date" ref="endDT" v-model="data.endDT" />
          </label>
        </div>
        <div row>
          <label>
            발행수 : 
            <input type="number" ref="count" v-model.number="data.count" placeholder="숫자만 입력해주세요." />
          </label>
        </div>
        <div btn>
          <button v-if="selectId == 0" @click="save">저장</button>
          <button v-else @click="save">수정</button>
        </div>
      </div>
    </div>
    <div bg />
  </section>
</template>

<script>
import axios from 'axios';
import { useSendValidation, useAlert, useToday } from '@hook';

export default {
  props: {
    id: String,
    selectId: [Number, String],
  },
  data: () => ({
    data: {}
  }),
  created() {
    this.init();
  },
  methods: {
    init() {
      if (this.selectId == 0) {
        this.data = {
          id: 0,
          shopId: this.id,
          title: '',
          description: '',
          startDT: useToday(),
          endDT: '',
          count: '',
          useCount: 0,
          open: 0
        }
        return;
      }
      this.getData();
    },
    getData() {
      axios.get(
        this.$store.state.dbUrl2 + '/shopCouponList/' + this.selectId
      ).then(({data}) => {
        data.startDT = data.startDT.split(' ')[0];
        data.endDT = data.endDT.split(' ')[0];
        this.data = data;
      });
    },
    save() {
      let pass = useSendValidation([
        this.$refs.title,
        this.$refs.description,
        this.$refs.startDT,
        this.$refs.endDT,
        this.$refs.count
      ], () => {
        useAlert.warn('라이브 방송', '빈칸을 입력해주세요.');
      });
      if (!pass) return;

      const successFn = (val) => {
        useAlert.success('쿠폰 ' + val, val + '되었습니다.');
        this.$emit('getList');
        this.$emit('setIsAddModal', false);
      }

      // Success
      if (this.selectId == 0) {  // create
        axios.post(
          this.$store.state.dbUrl2 + '/shopCouponList',
          this.data
        ).then(({data}) => {
          console.log(data);
          successFn('생성');
        })
      } else {  // modify
        axios.put(
          this.$store.state.dbUrl2 + '/shopCouponList/' + this.selectId,
          this.data
        ).then(({data}) => {
          console.log(data);
          successFn('수정');
        })
      }
      
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
    input[type="text"], input[type="date"], input[type="number"] {
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
<template>
  <main>
    <p history>
      상권활성화
      <i :class="$store.state.FontAwesome.stroke.angle.right" /> 푸드플랫폼
      <i :class="$store.state.FontAwesome.stroke.angle.right" /> 상점 상세정보
      <i :class="$store.state.FontAwesome.stroke.angle.right" /> 소개문구 수정
    </p>
    <h2>
      소개 문구 수정
      <div>
        <button @click="back">뒤로가기</button>
        <button @click="save">저장</button>
      </div>
    </h2>
    <HtmlEditor
      ref="editor"
      name="상점 소개내용 수정"
      :value="data.shopDescription"
    />
  </main>
</template>

<script>
import axios from 'axios';
import HtmlEditor from '@/components/Common/HtmlEditor';
export default {
  components: {
    HtmlEditor,
  },
  props: {
    id: String,
  },
  data: () => ({
    data: {}
  }),
  created() {
    this.getData();
  },
  methods: {
    getData() {
      axios.get(this.$store.state.dbUrl + '/admin_foodShopList?shopSeq=' + this.id)
        .then(({data}) => {
          this.data = data[0];
        });
    },
    save() {
      let contents = $('[name="상점 소개내용 수정"]').summernote("code");
      console.log(contents);
    },
    back() {
      this.$router.push('/Food/Platform/' + this.id);
    }
  },
  computed: {

  }
}
</script>

<style lang="scss" scoped>
@import '@index.scss';

</style>
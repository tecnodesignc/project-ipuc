<template>
  <div id="title-tenders">
    <div class="title-block text-center text-secondary row items-center">
      <!--Image-->
      <div class="col-4 col-md-12">
        <img v-if="img" :src="img" alt="Licitaciones Activas">
      </div>
      <div class="col-8 col-md-12">
        <!--Title-->
        <h1 v-if="title" class="q-ma-none q-mt-md q-headline text-weight-bold">
          {{title}}
        </h1>
        <!--Sub title-->
        <span v-if="subTitle" class="q-ma-none q-subheading">
        {{subTitle}}
      </span>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    props: {
      img: {default: false},
      title: {default: false},
      subTitle: {default: false}
    },
    components: {},
    watch: {},
    mounted() {
      this.$nextTick(function () {
      })
    },
    data() {
      return {}
    },
    methods: {}

  }
</script>
<style lang="stylus">
  @import "~variables";

  @media only screen and (max-width:$breakpoint-md)
    #title-tenders
      .title-block
        text-align left
      img
        width 60px
        float right
        margin-right 10px
      h1
        margin 0
        font-size 18px
      span
        text-align left
        font-size 14px !important
</style>
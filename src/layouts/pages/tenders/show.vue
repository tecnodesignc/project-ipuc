<template>
  <div id="page-tenders-me" class="row">
    <div class="col-12 col-lg-8 q-pa-md">
      <showComponent :id="this.$route.params.id"/>
    </div>
  </div>
</template>

<script>
  import showComponent from 'src/components/tenders/show'
  export default {
    components:{
      showComponent
    },
  }
</script>



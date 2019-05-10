<template>
  <div id="page-tenders-me" class="row">
    <div class="col-12 col-lg-8 q-pa-md">
      <q-card class="no-shadow">
        <q-card-main>
          <titleComponent 
            img="assets/icons/products.png"
            title="Mis Productos"
            sub-title="Listado de Productos que Ofrezco"/>
          <br>
        <q-card-separator />
        <div class="row">
          <div class="col-xs-12 q-mt-md">
            <q-btn label="Añadir Producto" color="primary" icon="add" class="float-right" @click="opened = true"/>
          </div>
          <div class="col-xs-12 q-mt-md">
            <listComponent :filter="{provider:userData.id}" height="650px" single/>
          </div>
        </div>
        </q-card-main>
      </q-card>
    </div>
    <q-modal v-model="opened" :content-css="{minWidth: '80vw'}">
      <formComponent/>
    </q-modal>
  </div>
</template>

<script>
  //Components
  import listComponent from 'src/components/products/list'
  import titleComponent from 'src/components/tenders/title'
  import formComponent from 'src/components/products/addToMyProductsForm'

  export default {
    props: {},
    components: {
      listComponent,
      titleComponent,
      formComponent
    },
    watch: {},
    created(){
      this.$root.$on("productSaved", this.handleEventProductSaved);
    },
    mounted() {
      this.$nextTick(function () {
        
      })
    },
    data() {
      return {
        userData: this.$store.state.auth.userData,
        opened: false,
      }
    },
    methods: {
      //Get data from tenders
      getData() {
      
      },
      handleEventProductSaved(){
        this.opened = false
      }
    }
  }
</script>

<style lang="stylus">

</style>
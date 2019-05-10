<template>
  <div id="page-tenders-index">

    <div class="col-12 row">
      <!--== Tenders Activas ==-->
      <div class="col-12 col-md-4 block block-1 q-pa-lg">
        <!--Title-->
        <title-component img="assets/icons/fileSearch.png"
                         title="Licitaciones Activas"
                         sub-title="Todas mis licitaciones"/>
        <!--List-->
        <list-component :filter="{status:[2]}" class="q-mt-lg" height="706px" />
      </div>
      <div class="col-12 col-md-8 row">
        <!--== Tenders Aprobadas ==-->
        <div class="col-12 bloxk block-2 q-pa-lg" style="height: 465px;">
          <div class="row items-center">
            <!--Title-->
            <div class="col-12 col-md-5">
              <title-component img="assets/icons/check.png"
                               title="Licitaciones Aprobadas"
                               sub-title="Licitaciones avaladas por pajonales"/>
            </div>
            <!--List-->
            <div class="col-12 col-md-7">
              <list-component :filter="{provider:{id:userData.id,status:1}}" height="400px"></list-component>
            </div>
          </div>
        </div>
        <!--== Productos ==-->
        <div class="col-12 bloxk block-3 q-pa-lg" style="height: 465px;">
          <div class="row items-center">
            <!--Title-->
            <div class="col-12 col-md-5">
              <title-component img="assets/icons/products.png"
                               title="Mis Productos"
                               sub-title="Listado de Productos que Ofrezco"/>
            </div>
            <!--List-->
            <div class="col-12 col-md-7">
              <listProductsComponent :filter="{provider:userData.id /*,ingredient:2*/}" height="400px"/>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  //Components
  import titleComponent from 'src/components/tenders/title'
  import listComponent from 'src/components/tenders/list'
  import listProductsComponent from 'src/components/products/list'

  export default {
    props: {},
    components: {
      titleComponent, 
      listComponent,
      listProductsComponent
    },
    watch: {},
    mounted() {
      this.$nextTick(function () {
        this.getData()
      })
    },
    data() {
      return {
        userData: this.$store.state.auth.userData,
        items: {
          lActive: [],
          lApproved: [],
          products: []
        }
      }
    },
    methods: {
      //Get data from tenders
      getData() {
        //Reset Values from items
        this.items.lActive = []
        this.items.lApproved = []
        this.items.products = []

        //Get data of tenders active, approved and products
        for (var item in this.items) {
          for (var i = 0; i <= 4; i++) {
            this.items[item].push({
              title: (item == 'products') ? 'Product Name' : 'Title Tender',
              date: new Date(),
              icon: (item == 'lActive') ? 'question_answer' : ((item == 'lApproved' ? 'favorite' : 'loyalty')),
              slug: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium consequuntur dignissimos...'
            })
          }
        }
      }
    }
  }
</script>

<style lang="stylus">
  @import "~variables";

  #page-tenders-index
    .block
      overflow hidden

    .block-1
      border-right 1px solid $grey-4
      height 930px

    .block-2
      border-bottom 1px solid $grey-4

    .block-2, .block-3
      #title-tenders
        border-right 1px solid $grey-4
        height 300px
        padding 74px 0
      #list-tenders
        padding-left 45px

    //Responsive
    @media only screen and (max-width : $breakpoint-md)
      .block
        height 390px
        #list-tenders
          height 256px !important

      .block-1
        border-right 0px
        border-bottom 1px solid $grey-4

      .block-2, .block-3
        height 390px !important
        #title-tenders
          border-right 0
          height auto
          padding 0
        #list-tenders
          padding-left 0
          margin-top 24px
          height 256px !important

</style>
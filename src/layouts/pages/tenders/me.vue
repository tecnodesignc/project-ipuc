<template>
  <div id="page-tenders-me" class="row">
    <div class="col-12 col-lg-8 q-pa-md">

      <q-tabs>
        <!-- Tabs - notice slot="title" -->
        <q-tab default slot="title" name="tab-1" icon="message" />
        <q-tab slot="title" name="tab-2" icon="fingerprint" />

        <!--== Tenders Active ==-->
        <q-tab-pane name="tab-1">
          <!--Description-->
        <title-component img="assets/icons/fileSearch.png"
                         title="Licitaciones Activas"
                         sub-title="Todas mis licitaciones"/>
          <!--List-->
          <list-component single :filter="{status:[2]}" height="400px"></list-component>
        </q-tab-pane>
        <!--== Tenders Approved ==-->
        <q-tab-pane name="tab-2">
        <title-component img="assets/icons/check.png"
                title="Licitaciones Aprobadas"
                sub-title="Licitaciones avaladas por pajonales"/>
        <list-component single :filter="{provider:{id:userData.id,status:1}}" height="400px"></list-component>
        </q-tab-pane>
      </q-tabs>

    </div>
  </div>
</template>

<script>
  //Components
  import titleComponent from 'src/components/tenders/title'
  import listComponent from 'src/components/tenders/list'

  export default {
    props: {},
    components: {listComponent, titleComponent},
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
          for (var i = 0; i <= 20; i++) {
            this.items[item].push({
              title: (item == 'products') ? 'Product Name' : 'Title Tenders',
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

  @media only screen and (min-width: $breakpoint-md)
    #page-tenders-me
      background-image url('../../../assets/image/background.jpg')
      min-height 100 vh
      background-repeat no-repeat
      background-position right
</style>
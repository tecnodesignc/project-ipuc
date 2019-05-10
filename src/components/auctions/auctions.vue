<template>
  <div>
    <p v-if="new Date (auction.finished_at) <= new Date()">
      Finalizada: el ganador es: {{auction.winner_id}}
    </p>
    <q-card class="no-shadow" v-else>
      <q-card-title>
        <b>{{auction.title}}</b>
        <div slot="right" class="row items-center">
          <b>Plazo máximo de pago ofrecido: {{auction.longerterm}}</b>          
        </div>
        <q-page-sticky 
          position="top" 
          :offset="[0, 0]" 
          style="z-index:100"
          class="text-white bg-orange text-center">
            <countdownComponent :deadline="formatDate"/>
            <span>Plazo Máximo {{auction.longerterm}}</span>
        </q-page-sticky>
      </q-card-title>
      <q-card-separator/>
      <q-card-main>       
        <div class="row">
          <div class="col-xs-12 q-mt-md q-px-xl">
            
          </div>
        </div>   
        <div class="row">
          <div class="col-xs-12 q-mt-md" v-if="auction">
            <addBidComponent :auction="auction" :ingredient="auction.product.ingredient_id"/>
          </div>
        </div>
        <div class="row">
          <div class="col-xs-12 col-lg-6 q-mt-md" v-if="auction">
            <tableBidComponent :bids="auction.bids"/>
          </div>
          <div class="col-xs-12 col-md-6 q-px-md q-py-md">
            <p class="offers-sec q-card-title">
              <b>Caracteristicas de la Licitación</b>
            </p>

            <q-card inline style="width: 100%" class="no-shadow">
              <q-card-media>
                <!-- Imagen opcional-->
              </q-card-media>
              <q-card-title>
                <b class="offers-sec">{{auction.title}}</b>
                <div slot="right" class="row items-center">
                  <q-icon name="question_answer" />
                </div>
              </q-card-title>
              <q-card-main>
                <p v-html="auction.description"></p>        
                <p class="offers-sec"><b>Cantidad:</b> {{auction.quantity}}</p>
                <p class="offers-sec"><b>Área:</b> {{auction.area}}</p>
                <div class="q-pl-xl" v-if="false">
                  <b>Producto</b>
                  <p class="text-faded">{{auction.product.name ? auction.product.name : 'No disponible'}}</p>
                  <b>Concentración</b>
                  <p class="text-faded">{{auction.product.concentration ? auction.product.concentration : 'No Disponible'}}</p>
                </div>
                <span v-if="status && status[0].status != 1">{{status[0].name}}</span>
              </q-card-main>
              <q-card-separator />
              <q-card-actions>
                <q-btn flat round dense icon="event" />
                <q-btn class="offers-sec" flat :label="auction.started_at | formatDate" />
                <q-btn class="offers-sec" flat :label="auction.finished_at | formatDate" />
              </q-card-actions>
            </q-card>            
          </div>
        </div>   
      </q-card-main>
    </q-card>

    <q-inner-loading :visible="visible">
      <q-spinner size="50px" color="primary"></q-spinner>
    </q-inner-loading>
  </div>
</template>

<script>
  // Components
  import addBidComponent from 'src/components/auctions/bids/add'
  import chartBidComponent from 'src/components/auctions/bids/chart'
  import countdownComponent from 'src/components/countdown/countDown';
  import tableBidComponent from 'src/components/auctions/bids/table'

  // Services
  import auctionService from 'src/services/iauctions/service'
  
  export default {
    components:{
      addBidComponent,
      chartBidComponent,
      countdownComponent,
      tableBidComponent,
    },
    data(){
      return{
        auction:false,
        bids: [],
        loading: false,
        status: false,
        userData: this.$store.state.auth.userData,
        visible:false,
      }
    },
    filters: {
      formatDate: function (value) {
        let d = new Date(value)
        return d ? d.getDay() + '/' + d.getMonth() + '/' + d.getFullYear() : '-'
      }
    },
    created(){
      this.$root.$on("bid-added", this.handleBidAddedEvent);
    },
    mounted(){
      this.$nextTick(() => {
        this.getData()
        this.getMyStatusThisAuction()
      })
    },
    computed:{
      formatDate(){
        let date = String(this.auction.finished_at)
        return date.replace(' ', 'T')
      },
    },
    methods:{
      // Get data of auction
      getData(){
        let include = 'product,bids'
        let id = this.$route.params.id
        this.visible = true
        auctionService.show(id, include)
        .then(response=>{
          this.auction = response.data
          this.visible = false
        })
        .catch(error=>{
          console.warn(error)
          this.visible = false
        })
      },
      // get status of provider in this auction
      getMyStatusThisAuction(){
        let filter = {
          "auctions":[this.$route.params.id],
          "providers":[this.userData.id]
        }
        auctionService.providers(filter)
        .then(response=>{
           /* 
            check if you are not a participant 
            and the application is sent if it is not 
            */
          if(!response.data.length){
            this.signUpThisAuction()
          }
        })
        .catch(error=>{
          console.warn(error)
        })
      },
      /* 
      send request for supplier 
      participation in the tender
      */
      signUpThisAuction(){
        this.loading = true
        let auctionId = this.$route.params.id
        let data = {attributes: []}
        auctionService.sendJoin(auctionId, data)
        .then(response=>{
          this.loading = false
        })
        .catch(error=>{
          this.loading = false
          console.log(error)
        })
      },
      /* refresh data in event 'bid-added'*/
      handleBidAddedEvent(){
        this.getData()
      }
    }
  }
</script>
<template>
  <div>    

    

    <table class="q-table q-table-responsive q-table-horizontal-separator bordered">
      <thead style="background: #61b63b">
        <tr>
          <th class="text-left" style="color: white;" colspan="2">Còdigo del ofertante</th>
          
          <th class="text-left" style="color: white;">Total</th>
          <th class="text-left" style="color: white;">Plazo</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(bid, index) in BidsByprice" :key="index" class="">
          <td class="text-left">
            {{bid.code_user | upperCase}}             
          </td>
          <td>
            
            <div class="q-chip row no-wrap inline items-center bg-blue text-white q-mr-md" v-if="bid.provider_id == userData.id">
              <div class="q-chip-main ellipsis">
              {{bid.provider_id == userData.id ? 'Mi Oferta' : ''}}
              <q-icon name="favorite" size="15px"/>
              </div>
            </div>
            
            <div class="q-chip row no-wrap inline items-center bg-green text-white" v-if="bid.id == bestBid.id">
              <div class="q-chip-main ellipsis">
              {{bid.id == bestBid.id ? 'Mejor Oferta' : ''}}
              <q-icon name="fas fa-trophy" size="15px"/>
              </div>
            </div>
          </td>
          <td class="text-left" >${{bid.total}}</td>
          <td class="text-left">{{bid.longerterm}} Días</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
  export default {
    props:['bids'],
    data(){
      return{
        userData: this.$store.state.auth.userData,
      }
    },
    filters:{
      upperCase: function (value) {
        if (!value) return ''
        return value.toUpperCase()
      },
    },
    computed:{
    	bestBid(){
        // el total de la mejor bid con la 
        //que inicia es un valor muy grande 
        //para poder iniciarlizar el array
        let best = {
          total: 13355040000000
        }
        this.bids.forEach(bid => {
          best = bid.total < best.total ? bid : best
        });
        return best
      },
      BidsByprice(){
        return this.bids.sort(function (a, b) {
          return (parseInt(a.total) - parseInt(b.total))
        });
      }
    },
    methods:{
      
    }
  }
</script>

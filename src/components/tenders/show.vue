<template>
	<div>
    <section v-if="data">
      <q-card inline style="width: 100%" class="no-shadow">
        <q-card-media>
          <!-- Imagen opcional-->
        </q-card-media>
        <q-card-title>
          <b>{{data.title}}</b>
          <div slot="right" class="row items-center">
            <q-icon name="question_answer" />
          </div>
        </q-card-title>
        <q-card-main>
          <p v-html="data.description"></p>        
          <p><b>Cantidad:</b> {{data.quantity}}</p>
          <p><b>Área:</b> {{data.area}}</p>
          <div class="q-pl-xl">
            <b>Producto</b>
            <p class="text-faded">{{data.product.name}}</p>
            <b>Concentración</b>
            <p class="text-faded">{{data.product.concentration}}</p>
          </div>
          <span v-if="status && status[0].status != 1">{{status[0].name}}</span>
        </q-card-main>
        <q-card-separator />
        <q-card-actions>
          <q-btn flat round dense icon="event" />
          <q-btn flat :label="data.started_at | formatDate" />
          <q-btn flat :label="data.finished_at | formatDate" />
          <q-btn rounded color="primary" label="Solicitar Participación" @click="opened = true" v-if="!status"/>
          <div v-else>
            <q-btn rounded color="primary" label="Participar" :to="`/licitation/${id}/auctions`" v-if="status[0].status == 1"/>
          </div>          
          <!--<q-btn rounded color="blue-4" label="Como Participar" /> -->
        </q-card-actions>
      </q-card>
      <q-modal v-model="opened" :content-css="{minWidth: '80vw'}">
        <formComponent :ingredient="data.product.ingredient_id"/>
      </q-modal>
    </section>
    <q-inner-loading :visible="visible">
      <q-spinner size="50px" color="primary"></q-spinner>
    </q-inner-loading>
  </div>
</template>

<script>
  // Services
  import service from 'src/services/iauctions/service'

  // Components
  import formComponent from 'src/components/tenders/participationForm'

  export default {
    components:{
      formComponent
    },
    props: {
      id:String,
    },
    data(){
      return{
        userData:[],
        status:false,
        visible:false,
        data:false,
        opened: false,
      }
    },
    created(){
      this.$root.$on("sended_request_participation", this.handleRequestParticipationEvent);
    },
    mounted(){
      this.userData = this.$store.state.auth.userData
      this.getData()
      this.getMyStatusThisAuction()
    },
    filters: {
      formatDate: function (value) {
        let d = new Date(value)
        return d ? d.getDay() + '/' + d.getMonth() + '/' + d.getFullYear() : '-'
      }
    },
    methods:{
      getData(){
        let include = 'product'
        this.visible = true
        service.show(this.id, include)
        .then(response=>{
          this.data = response.data
          this.visible = false
        })
        .catch(error=>{
          console.warn(error)
          this.visible = false
        })
      },
      getMyStatusThisAuction(){
        let filter = {
          "auctions":[this.id],
          "providers":[this.userData.id]
        }
        service.providers(filter)
        .then(response=>{
          if(response.data.length){
            this.status = response.data.map(item=>{
              return {
                status: item.status,
                name: item.status_name
              }
            })
          }
        })
        .catch(error=>{
          console.warn(error)
        })
      },
      handleRequestParticipationEvent(){
        this.getMyStatusThisAuction()
        this.getData()
        this.opened = false
      }
    }
  }
</script>
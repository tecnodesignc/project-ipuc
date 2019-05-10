<template>
  <q-modal-layout>
    <q-toolbar slot="header">
      <q-btn 
        flat 
        round 
        dense 
        v-close-overlay 
        icon="close"/>
      <q-toolbar-title>
        Participar En licitación
      </q-toolbar-title>
    </q-toolbar>       
    <div class="row q-mx-md">
      <div class="col-xs-12 q-mt-lg">
        <q-select
          multiple
          chips
          filter
          v-model="form.product"
          :options="products"
          placeholder="Seleccionar Producto"
          :error="$v.form.product.$error"
        />
      </div>
      <div class="col-xs-12 q-my-md">
        <q-btn 
          label="Enviar Solicitud" 
          class="full-width" 
          color="primary" 
          @click="save" 
          :loading="loading">
          <q-spinner-facebook slot="loading" />
        </q-btn>
      </div>
    </div>
  </q-modal-layout>
</template>

<script>
  //SERVICES
  import productsService from 'src/services/products/service'
  import auctionsService from 'src/services/iauctions/service'
  
  // HELPERS
  import { alert } from '@imagina/qhelper/_plugins/alert'
  import { array } from '@imagina/qhelper/_plugins/array'
  import { required, email } from 'vuelidate/lib/validators'

  export default {
    props: {
      ingredient: {
        default:'0',
        type:String
      }
    },
    data(){
      return{
        loading:false,
        auction:[],
        userData:[],
        products:[],
        form:{
          product:[],
        },        
      }
    },
    validations: {
      form: {
        product: { required }
      }
    },
    mounted(){
      this.userData = this.$store.state.auth.userData
      this.getProducts()
    },
    methods:{
      //GET PRODUCTS
      getProducts(){
        let filter = {
          provider:this.userData.id,
          ingredient:this.ingredient
        }
        productsService.index(filter)
        .then(response=>{
          this.products = this.select(response.data)
        })
        .catch(error=>{
          console.warn(error)
        })
      },
      // Send Request participation in a auction 
      save(){
        this.loading = true
        this.$v.form.$touch()
        if (this.$v.form.$error) {
          this.$q.notify('Por favor revise los campos')
          this.loading = false
          return
        }
        let auctionId = this.$route.params.id
        let data = {attributes: this.form.product}
        auctionsService.sendJoin(auctionId, data)
        .then(response=>{
          this.loading = false
          this.form.product = []
          alert.success('Solicitud Enviada', 'bottom')
          this.$root.$emit('sended_request_participation')
        })
        .catch(error=>{
          this.loading = false
          console.log(error)
        })
      },
      // Format data of q-select for quasar
      select(dataArray) {
        return dataArray.map(item=> {
          return {
            label: item.name,
            value: item.id.toString()
          }
        })
      }
    }
  }
</script>
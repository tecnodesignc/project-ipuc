<template>
  <q-modal-layout>
    <q-toolbar slot="header">
      <q-btn flat round dense v-close-overlay icon="close"/>
      <q-toolbar-title>
        Productos
      </q-toolbar-title>
    </q-toolbar>       
    <div class="row q-mx-md">
      
      <div class="col-xs-12 q-mt-lg">
        <q-select
          multiple
          filter
          chips
          v-model="form.product"
          :options="products"
          placeholder="Seleccionar Productos"
          :error="$v.form.product.$error"
        />
      </div>
      <div class="col-xs-12 q-my-md">
        <q-btn label="Actualizar mis Productos" class="full-width" color="primary" @click="save()" :loading="loading"/>
      </div>
    </div>
  </q-modal-layout>
</template>

<script>
  // Service
  import productsService from 'src/services/products/service'

  // Helpers
	import { required, email } from 'vuelidate/lib/validators'
	
	export default {
		data(){
			return {
        loading: false,
				products: [],
				form:{
					product: []
				}
			}
		},
		validations: {
      form: {
        product: { required }
      }
    },
    created(){
      this.$root.$on("loadedMyProducts", this.handleloadedMyProductsEvent);
    },
    mounted(){
      this.$nextTick(() => {
        this.getData()
      })
    },
    methods:{
      getData(){
        productsService.index()
        .then(response=>{
          this.products = this.select(response.data)
        })
        .catch(error=>{
          console.warn(error)
        })
      },
      save(){
        this.loading = true
        let data = {attributes:{products: this.form.product}}  
        let id = this.$store.state.auth.userData.id
        productsService.addProducts(id, data)
        .then(response=>{
          this.loading = false
          this.$root.$emit('productSaved')
        })
        .catch(error=>{
          console.warn(error)
          this.loading = false
        })

      },
      handleloadedMyProductsEvent(data){
        if(!data.length){
          return
        }
        data.forEach(element => {
          this.form.product.push(element.id.toString())
        });

      },
      // Format data of q-select for quasar
      select(dataArray) {
        return dataArray.map(item=> {
          return {
            label: item.name ? item.name : 'default',
            value: item.id.toString()
          }
        })
      }
    }
	}
</script>
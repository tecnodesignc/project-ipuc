<template>
	<div>
		<q-card class="no-shadow">
	  	<q-card-title>
	  		<b>Direcciones</b>
	    	<q-btn label="Agregar Dirección" class="float-right" size="md" rounded color="primary" icon="add" @click="openmodal()"/>
	  	</q-card-title>
	  	<q-card-separator />

	  	<q-card-main>
	    	<div class="col-4 q-px-md" v-for="(item, index) in addresses" :key="index">
          <q-card class="no-shadow">
            <q-card-main>
            	<q-btn icon="delete" color="red" round size="sm" @click="removeAddres(item, index)" class="float-right q-ml-sm"/>
              <q-btn icon="edit" color="blue" round size="sm" @click="editAddres(item, index)" class="float-right"/>
              	Direccion 2 {{item.address_2}}<br>
              	Direccion 2 {{item.address_2}}<br>
              	Codigo postal {{item.zip_code}}<br>
            </q-card-main>
          </q-card>
        </div> 
	  	</q-card-main>
		</q-card>	

		<q-modal v-model="open" :content-css="{minWidth: '50vw', minHeight: '50vh'}">
		  <q-modal-layout>
		    <q-toolbar slot="header">
		      <q-btn
		        flat
		        round
		        dense
		        v-close-overlay
		        icon="close"
		        @click="open = false"
		      />
		      <q-toolbar-title v-if="formData.id">
		        Editar Dirección
		      </q-toolbar-title>
		      <q-toolbar-title v-else>
		        Nueva Dirección
		      </q-toolbar-title>
		    </q-toolbar>
		    <div class="layout-padding row">

		    	<div class="col-md-6 q-pl-md q-mb-md">
    				<q-input 
    					type="text" 
    					float-label="Dirección 1" 
    					v-model="formData.address_1" 
    					:error="$v.formData.address_1.$error"/>
  			   </div>

  			  <div class="col-md-6 q-pl-md q-mb-md">
    				<q-input 
    					type="text" 
    					float-label="Dirección 2" 
    					v-model="formData.address_2" 
    					:error="$v.formData.address_2.$error"/>
  			   </div>

  				<div class="col-md-6 q-pl-md q-mb-md">
    				<q-select 
    					v-model="formData.country_id" 
    					float-label="País" 
    					:options="countries" 
    					@input="inputChangeCountry()" 
    					filter 
    					filter-placeholder="Buscar"
    					:error="$v.formData.country_id.$error"/>
    			</div>

  			  <div class="col-md-6 q-pl-md q-mb-md">
  			  	<q-select 
  			  		v-model="formData.province_id" 
  			  		float-label="Provincia" 
  			  		:options="provinces" 
  			  		@input="inputChangeProvince()" 
  			  		filter
  			  		filter filter-placeholder="Buscar"
  			  		:error="$v.formData.province_id.$error"/>
  			   </div>

		    	<div class="col-md-6 q-pl-md q-mb-md">
    				<q-select 
    					v-model="formData.city_id" 
    					float-label="Ciudad" 
    					:options="cities" 
    					filter
    					filter filter-placeholder="Buscar"
    					:error="$v.formData.city_id.$error"/>
  			   </div>

  			  <div class="col-md-6 q-pl-md q-mb-md">
    				<q-input type="text" float-label="Codigo postal" v-model="formData.zip_code" :error="$v.formData.zip_code.$error"/>
  			  </div>

  			  <div class="col-9 col-md-12" v-if="formData.id">
    				<q-btn color="primary" label="Actualizar" icon="save" rounded @click="updateAddress(formData.id)"/>
  			  </div>

  			  <div class="col-9 col-md-12" v-else>
    				<q-btn color="primary" label="Guardar" icon="save" rounded @click="saveAddres()" />
  			  </div>

		    </div>

		    <q-inner-loading :visible="loading">
      		<q-spinner size="50px" color="primary"></q-spinner>
    		</q-inner-loading>

		  </q-modal-layout>
		</q-modal>
		<q-inner-loading :visible="loading">
      <q-spinner size="50px" color="primary"></q-spinner>
    </q-inner-loading>

	</div>
</template>

<script>
	import {required, email, sameAs, minLength} from 'vuelidate/lib/validators';

	//Helpers
  import {alert} from '@imagina/qhelper/_plugins/alert'
  import {helper} from '@imagina/qhelper/_plugins/helper'
  import {array} from "@imagina/qhelper/_plugins/array"
  
  //Services
  import service  from 'src/services/addres';
  import countriesService  from 'src/services/countries';
  import provinces  from 'src/services/provinces';
  import cities  from 'src/services/cities';

	export default {
		data(){
			return{
				formData:{
					id:'',
					user_id: '',
					address_1: '',
					address_2: '',
					city_id: '',
					zip_code: '',
					country_id: 48,
					province_id: '',
				},
				countries: [],
				provinces: [],
				cities: [],
				open: false,
				loading:  false
			}
		},
		computed: {

			 addresses: {
        get(){
          return this.$store.getters.getform.attributes.addresses
        },
        set(value){
          this.$store.dispatch('update_form_addresses', value)
        }
    	},

		},
		mounted(){
			this.$nextTick(function () {
    		this.setUserData()
				this.getCountries()
				this.getProvinces()
  		})
		},
		methods:{
			setUserData(){
        helper.storage.get.item('userData').then(response => {
          this.formData.user_id = response.id
        })
      },
      openmodal(){
      	this.open = true
      	this.resetdata()
      },
      resetdata(){
      	this.formData.id = ''
				this.formData.address_1 = ''
				this.formData.address_2 = ''
				this.formData.city_id = ''
				this.formData.zip_code = ''
				this.formData.country_id = 48
				this.formData.province_id = ''
      },
			saveAddres(){
				this.loading = true
				this.$v.formData.$touch()

				if (this.$v.formData.$error) {
					this.$q.notify('Please review fields again.')
					this.loading = false
        	return
				}

				service.create({attributes: this.formData})
				.then(response=>{
					this.open = false
					alert.success('Guardado', 'right');		
					this.addresses.push(this.formData)
					this.resetdata()
					this.loading = false
				})

			},
			updateAddress(id){
				this.loading = true
				this.$v.formData.$touch()
				if (this.$v.formData.$error) {
					this.loading = false
					this.$q.notify('Please review fields again.')
        	return
				}
				service.update({attributes: this.formData}, id)
				.then(response=>{
					alert.success('Guardado', 'right');
					this.loading = false
				})

			},
			editAddres(item, index){
				this.open = true
				this.formData.id = item.id
				this.formData.address_1 = item.address_1
				this.formData.address_2 = item.address_2
				this.formData.city_id = item.city_id
				this.formData.zip_code = item.zip_code
				this.formData.country_id = item.country_id
				this.formData.province_id = item.province_id
				this.getCities()
			},
			getCountries(){
				countriesService.index()
				.then(response=>{
					this.countries = this.select(response.data)
				})
			},
			inputChangeCountry(){
				this.getProvinces()
			},
			getProvinces(){
				let filter = {
					country_id: this.formData.country_id
				}
				provinces.index(filter)
				.then(response=>{
					this.provinces = this.select(response.data)
				})
			},
			inputChangeProvince(){
				this.getCities()
			},
			getCities(){
				let filter = {
					province_id: this.formData.province_id
				}
				cities.index(filter)	
				.then(response=>{
					this.cities = this.select(response.data)
				})	
			},
			select(dataArray) {
		    let response = []
		    Object.keys(dataArray).forEach(item => {
		      let labelTitle = dataArray[item].name ? dataArray[item].name : 'default'

		      response.push({
		        label: labelTitle,
		        value: (dataArray[item].id).toString()
		      });
		    })
		    return response
		  },
		  removeAddres(item, index){
		  	this.loading = true
		  	this.$q.dialog({
				  title: 'Confirmaciòn',
				  message: '¿ Desea Eliminar la direccion selecionada ?',
				  ok: 'Aceptar',
				  cancel: 'Cancelar'
				}).then(() => {
					service.delete(item.id)
					.then(response=>{
						this.loading = false
						this.$q.notify('Eliminado')	
						this.addresses.splice(index, 1)
					})
				}).catch(() => {
					this.loading = false
				})
		  },

		},
		validations: {
		  formData: {
				address_1: { required },
				address_2: { required },
				city_id: { required },
				zip_code: { required },
				country_id: { required },
				province_id: { required },
		  }
		},
	}
</script>
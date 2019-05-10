<template>
	<div>
		<div class="form-user-data col-12 relative-position">
       <div class="form-title q-title">
    			Documentos Anexos
  			</div>
	  		<div class="row form-container q-py-md">
	    		<div class="col-12 order-xs-last">
	      			<div class="row">

	      				<div class="item_form col-12 col-md-12 q-px-lg q-mb-md" >
	        				<div class="row">
	        					<div class="item_form col-12 col-md-12 q-px-lg q-mb-md">
	        						<p v-if="type_person"><strong>Persona Juridica</strong></p>
	        						<p v-else><strong>Persona Natural</strong></p>
	        					</div>


	        					<q-card class="item_form col-12 col-md-12 q-mb-md no-shadow">
										  <q-card-main>
			        					<div class="item_form col-12 col-md-12 q-mb-md">
			        						<strong>
			        								Imagen principal de perfil
			        							</strong>
			        						<q-uploader 
														:url="url" 
														method="POST" 
														name="file" 
														:additional-fields="[{name: 'nameFile', value: 'main_image'},{name: 'user', value: this.id}]" 
														:headers="headers" @uploaded="setPathMainImage"/>
			        					</div>
			        					<div class="item_form col-12 col-md-12 q-mb-md" v-if="camaracomercio">
													<q-list>
														<q-item>
															<q-item-side icon="insert_drive_file" />
															<q-item-main>
													    	<q-item-tile label>Fotocopia del Certificado de Camara y Comercio</q-item-tile>
													    	<q-item-tile sublabel>
													    		<a :href="camaracomercio" class="q-btn inline relative-position q-btn-item non-selectable q-btn-rectangle q-btn-flat q-focusable q-hoverable q-btn-rounded" target="_blank">Ver Archivo</a>
													    	</q-item-tile>
													  	</q-item-main>
													  	<q-item-side>
													  		<q-btn icon="cancel" round flat dense @click="mediaDelete(camaracomercio, 'camaracomercio')"/>
													  	</q-item-side>
														</q-item>
													</q-list>
			        					</div>
	        						</q-card-main>
										</q-card>


	        					<q-card class="item_form col-12 col-md-12 q-mb-md no-shadow">
										  <q-card-main>
			        					<div class="item_form col-12 col-md-12  q-mb-md">
			        						<strong>Fotocopia de la cedula de cuidadania </strong>
			        						<q-uploader :url="url" method="POST" name="file" :additional-fields="[{name: 'nameFile', value: 'cc'},{name: 'user', value: this.id}]" :headers="headers" @uploaded="setPathCC" hide-upload-progress/>
			        					</div>
			        					<div class="item_form col-12 col-md-12 q-mb-md" v-if="cc">
													<q-list>
														<q-item>
															<q-item-side icon="insert_drive_file" />
															<q-item-main>
													    	<q-item-tile label>Fotocopia de la cedula de cuidadania</q-item-tile>
													    	<q-item-tile sublabel>
													    		<a :href="cc" class="q-btn inline relative-position q-btn-item non-selectable q-btn-rectangle q-btn-flat q-focusable q-hoverable q-btn-rounded" target="_blank">Ver Archivo</a>
													    	</q-item-tile>
													  	</q-item-main>
													  	<q-item-side>
													  		<q-btn icon="cancel" round flat dense @click="mediaDelete(cc, 'cc')"/>
													  	</q-item-side>
														</q-item>
													</q-list>
			        					</div>
										  </q-card-main>
										</q-card>

	        					<q-card class="item_form col-12 col-md-12 q-mb-md no-shadow">
										  <q-card-main>
			        					<div class="item_form col-12 col-md-12 q-mb-md">
			        						<strong>Fotocopia del RUT</strong>
			        						<q-uploader :url="url" method="POST" name="file" :additional-fields="[{name: 'nameFile', value: 'rut'},{name: 'user', value: this.id}]" :headers="headers" @uploaded="setPathRut"/>
			        					</div>
			        					<div class="item_form col-12 col-md-12 q-mb-md" v-if="rut">
													<q-list>
														<q-item>
															<q-item-side icon="insert_drive_file" />
															<q-item-main>
													    	<q-item-tile label>Fotocopia del RUT</q-item-tile>
													    	<q-item-tile sublabel>
													    		<a :href="rut" class="q-btn inline relative-position q-btn-item non-selectable q-btn-rectangle q-btn-flat q-focusable q-hoverable q-btn-rounded" target="_blank">Ver Archivo</a>
													    	</q-item-tile>
													  	</q-item-main>
													  	<q-item-side>
													  		<q-btn icon="cancel" round flat dense @click="mediaDelete(rut, 'rut')"/>
													  	</q-item-side>
														</q-item>
													</q-list>
			        					</div>
	        						</q-card-main>
										</q-card>

	        					<q-card class="item_form col-12 col-md-12 q-mb-md no-shadow">
										  <q-card-main>
			        					<div class="item_form col-12 col-md-12 q-mb-md">
			        						<strong>
			        								Fotocopia del Certificado de Camara y Comercio 
			        								<span v-if="type_person">(no mayor a 30 dias)</span> 
			        								<span v-else>(Si se tiene)</span>.
			        							</strong>
			        						<q-uploader :url="url" method="POST" name="file" :additional-fields="[{name: 'nameFile', value: 'camaraComercio'},{name: 'user', value: this.id}]" :headers="headers" @uploaded="setPathcamaraComercio"/>
			        					</div>
			        					<div class="item_form col-12 col-md-12 q-mb-md" v-if="camaracomercio">
													<q-list>
														<q-item>
															<q-item-side icon="insert_drive_file" />
															<q-item-main>
													    	<q-item-tile label>Fotocopia del Certificado de Camara y Comercio</q-item-tile>
													    	<q-item-tile sublabel>
													    		<a :href="camaracomercio" class="q-btn inline relative-position q-btn-item non-selectable q-btn-rectangle q-btn-flat q-focusable q-hoverable q-btn-rounded" target="_blank">Ver Archivo</a>
													    	</q-item-tile>
													  	</q-item-main>
													  	<q-item-side>
													  		<q-btn icon="cancel" round flat dense @click="mediaDelete(camaracomercio, 'camaracomercio')"/>
													  	</q-item-side>
														</q-item>
													</q-list>
			        					</div>
	        						</q-card-main>
										</q-card>

	        				</div>
	        			</div>
	      			</div>
	        	</div>
	        </div>
	    </div>
	</div>
</template>
<script>
	import {helper} from '@imagina/qhelper/_plugins/helper';

	import mediaService from 'src/services/media'

	import config from 'src/config/index'

	export default {
		data(){
			return {
				url: config('apiRoutes.api.api_url') + '/profile/users/media/upload',
				authorization : '',
			}
		},
		computed: {
      type_person: {
        get(){
          return this.$store.getters.getform.attributes.type_person
        },
      },
      id: {
        get(){
          return this.$store.getters.getform.attributes.id
        },
      },

      main_image: {
        get(){
          return this.$store.getters.getform.attributes.main_image
        },
        set(value){
          this.$store.dispatch('update_form_main_image', value)
        }
      },


      headers(){
      	let response = {}
      	return {Authorization: this.authorization}
      },
      cc: {
        get(){
          return this.$store.getters.getform.attributes.cc
        },
        set(value){
          this.$store.dispatch('update_form_cc', value)
        }
      },
      rut: {
        get(){
          return this.$store.getters.getform.attributes.rut
        },
        set(value){
          this.$store.dispatch('update_form_rut', value)
        }
      },
      camaracomercio: {
        get(){
          return this.$store.getters.getform.attributes.camaracomercio
        },
        set(value){
          this.$store.dispatch('update_form_camaracomercio', value)
        }
      },
    },
    mounted(){
    	this.getData()
    },
    methods: {
      getData() {
        helper.storage.get.item('userToken').then(response => {
          this.authorization = response
        })
      },
      setPathCC(file, xhr){
      	console.log(JSON.parse(xhr.response).data.url)
      	this.cc = config('api.base_url') +'/'+ JSON.parse(xhr.response).data.url
      },
      setPathRut(file, xhr){
      	console.log(JSON.parse(xhr.response).data.url)
      	this.rut = config('api.base_url') +'/'+ JSON.parse(xhr.response).data.url
      },
      setPathcamaraComercio(file, xhr){
      	console.log(JSON.parse(xhr.response).data.url)
      	this.camaracomercio = config('api.base_url') +'/'+ JSON.parse(xhr.response).data.url
      },

      setPathMainImage(file, xhr){
      	console.log(JSON.parse(xhr.response).data.url)
      	this.main_image = config('api.base_url') +'/'+ JSON.parse(xhr.response).data.url
      },


      mediaDelete(media, type){
				this.$q.dialog({
				  title: 'Confirmación',
				  message: '¿ Desea eliminar este arvhivo ?',
				  ok: 'Aceptar',
				  cancel: 'Cancelar'
				}).then(() => {
				  this.Delete(media, type)
				}).catch(() => {

				})
      },
			Delete(media, type){
				mediaService.delete({file: media, user: this.id})
				.then(response=>{
					if (type == 'cc') 
						this.cc = ''
					
					if (type == 'rut') 
						this.rut = ''

					if (type == 'camaracomercio') 
						this.camaracomercio = ''
					
				})
			}

    }
	}

</script>
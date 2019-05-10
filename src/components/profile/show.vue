<template>
	<div class="row">
    <div class="col-12">
      <div class="row">

        <div class="col-md-3 q-px-sm">
          <q-card class="no-shadow">
            <q-card-main>
              <img :src="formData.attributes.main_image" width="100%" v-if="formData.attributes.main_image">
              <img src="http://s3.amazonaws.com/37assets/svn/765-default-avatar.png" width="100%" v-else>
            </q-card-main>
          </q-card>
        </div>

        <div class="col-md-9">

          <q-card class="no-shadow">
            <q-card-main>

              <div class="row">
                  <div class="col-md-3">
                      <b>Nombres:</b>
                  </div>
                  <div class="col-md-9">
                      {{formData.attributes.first_name}}
                  </div>
              </div>
              <div class="row">
                  <div class="col-md-3">
                      <b>Apellidos:</b>
                  </div>
                  <div class="col-md-9">
                      {{formData.attributes.last_name}}
                  </div>
              </div>
              <div class="row">
                  <div class="col-md-3">
                      <b>Correo Electrónico:</b>
                  </div>
                  <div class="col-md-9">
                      {{formData.attributes.email}}
                  </div>
              </div>
              <div class="row">
                  <div class="col-md-3">
                      <b>Documento:</b>
                  </div>
                  <div class="col-md-9">
                      {{formData.attributes.type_document}} No. {{formData.attributes.number_document}}
                  </div>
              </div>
              <div class="row">
                  <div class="col-md-3">
                      <b>Género</b>
                  </div>
                  <div class="col-md-9">
                      {{formData.attributes.genre}}
                  </div>
              </div>
              <br>




              <div class="row hidden">
                  <div class="col-md-3">
                      <b>Actividad principal:</b>
                  </div>
                  <div class="col-md-9">
                      <span v-if="formData.attributes.principal_occupation != 'otra'">
                        {{formData.attributes.principal_occupation}}
                      </span>
                      <span>
                        {{formData.attributes.other_principal_occupation}}
                      </span>
                  </div>
              </div>

              <div class="row hidden">
                  <div class="col-md-3">
                      <b>CIIU:</b>
                  </div>
                  <div class="col-md-9">
                    {{formData.attributes.ciiu}}
                  </div>
              </div>
              <br>

              <div class="row hidden">
                  <div class="col-md-3">
                      <b>Actividad Segundaria:</b>
                  </div>
                  <div class="col-md-9">
                    {{formData.attributes.secondary_occupation}}
                  </div>
              </div>
              <div class="row hidden">
                  <div class="col-md-3">
                      <b>CIIU:</b>
                  </div>
                  <div class="col-md-9">
                    {{formData.attributes.ciiu2}}
                  </div>
              </div>
              <br>


            </q-card-main>
          </q-card>

          </div>                 
        </div>
              
      </div>
		
	</div>
</template>

<script>
	import service  from 'src/services/pajonales';
	export default {
		data(){
			return{
				datos: '',
        image: ''
			}
		},
		computed: {
      formData: {
        get(){
          return this.$store.getters.getform
        },
      },
    },
    mounted(){
    	this.getDataProfile()
    },
    methods:{
    	getDataProfile(){
    		service.show(1)
    		.then(response=>{
    			this.datos = response
    		})
    	},

    }
	}
</script>
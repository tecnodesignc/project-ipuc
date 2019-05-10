<template>
	<div>
		<div class="form-user-data col-12 relative-position">
    	<div class="form-title q-title">
        Personal Jurídica
      </div>
    	<div class="row form-container q-py-md">
        <div class="col-12 order-xs-last">
          <div class="row">

            <div class="item_form col-12 col-md-6 q-px-lg q-mb-md">
            	<q-input type="text" float-label="Nombre o razón social" v-model="business_name"/>
            </div>

            <div class="item_form col-12 col-md-3 q-px-lg q-mb-md">
            	<q-input type="text" float-label="Nit" v-model="nit"/>
            </div>

            <div class="item_form col-12 col-md-3 q-px-lg q-mb-md">
            	<q-input type="text" float-label="DV" v-model="dv"/>
            </div>

            <div class="item_form col-12 col-md-12 q-px-lg q-mb-md">
            	<q-input type="text" float-label="Pirmer Apellidos Representante Legal" v-model="last_name"/>
            </div>

            <div class="item_form col-12 col-md-12 q-px-lg q-mb-md">
            	<q-input type="text" float-label="Nombres Representante Legal" v-model="first_name"/>
            </div>

            <div class="item_form col-12 col-md-3 q-px-lg q-mb-md">
            	<q-select v-model="type_document" float-label="Tipo de documento" :options="type_documents" />
            </div>

            <div class="item_form col-12 col-md-3 q-px-lg q-mb-md">
            	<q-input type="text" float-label="Numero de documento" v-model="number_document"/>
            </div>

            <div class="item_form col-12 col-md-6 q-px-lg q-mb-md">
              <q-input type="text" float-label="Correo Electónico Representante Legal" v-model="email"/>
            </div>

            <div class="item_form col-12 col-md-12 q-px-lg q-mb-md">
            	<nationalities-component />
            </div>


            <!--Officess-->
            <div class="item_form col-12 col-md-12 q-px-lg q-mt-md">
            	<b>Oficina Principal</b>
            </div>
            <div class="item_form col-12 col-md-4 q-px-lg q-mb-md">
              <q-input type="text" float-label="Dirección" v-model="principal_address"/>
            </div>
            <div class="item_form col-12 col-md-4 q-px-lg q-mb-md">
              <q-input type="text" float-label="Ciudad" v-model="principal_city"/>
            </div>
            <div class="item_form col-12 col-md-4 q-px-lg q-mb-md">
              <q-input type="text" float-label="Telefono" v-model="principal_phone"/>
            </div>

            <div class="item_form col-12 col-md-12 q-px-lg q-mt-md">
            	<B>Sucursal o Agencia</B>
            </div>
            <div class="item_form col-12 col-md-4 q-px-lg q-mb-md">
              <q-input type="text" float-label="Dirección" v-model="branchoffice_address"/>
            </div>
            <div class="item_form col-12 col-md-4 q-px-lg q-mb-md">
              <q-input type="text" float-label="Ciudad" v-model="branchoffice_city"/>
            </div>
            <div class="item_form col-12 col-md-4 q-px-lg q-mb-md">
              <q-input type="text" float-label="Telefono" v-model="branchoffice_phone"/>
            </div>
            <!--Officess-->


      			<div class="item_form col-12 col-md-4 q-px-lg q-mb-md">
      				<q-select v-model="type_company" float-label="Tipo de Empresa" :options="tipo_empresa" />
      			</div>	

      			<div class="item_form col-12 col-md-4 q-px-lg q-mb-md">
      				<q-select v-model="economic_activity" float-label="Actividad económica" :options="actividad_economica" />
      			</div>		

      			<q-slide-transition>
              <div class="item_form col-12 col-md-4 q-px-lg q-mb-md" v-if="economic_activity == 'otra'">
          		  <q-input type="text" float-label="Cual ?" v-model="economic_activity_other"/>
          		</div>
      			</q-slide-transition>

    				<div class="item_form col-12 col-md-12 q-px-lg q-mb-md">
              <div class="form-user-data col-12 relative-position">
                <div class="form-title ">
                    Identificación de los accionistas o asociados que tengan directa o indirectamente más del 5% del capital social, aporte o participación.
    						  <q-btn icon="add" color="primary" size="sm" @click="addShareholder" label="Agregar" class="float-right" rounded/>
                </div>
                <div class="row form-container q-py-md">

                <div class="col-4 q-px-md" v-for="(item, index) in table_shareholders" :key="index">
                    <q-card class="no-shadow">
                      <q-card-title>
                        <q-btn  icon="delete" color="red" @click="removeShareholder(item, index)" size="sm" label="Remover" class="float-right" rounded/>
                      </q-card-title>
                      <q-card-separator />
                      <q-card-main>
                        <q-input type="text" float-label="Tipo Documento" v-model="item.type_document"/>
                        <q-input type="text" float-label="Documento" v-model="item.number_document"/>
                        <q-input type="text" float-label="Nombre" v-model="item.name"/>
                        
                        <q-select 
                          v-model="item.admin_public_resource" 
                          float-label="¿Por su actividad o cargo administra recursos públicos?" 
                          :options="optionsYN"/>

                        <q-select 
                          v-model="item.recognition_public" 
                          float-label="¿Por su actividad o cargo goza de reconocimiento público?" 
                          :options="optionsYN"/>

                        <q-input 
                          type="text" 
                          float-label="¿Está obligado a declaración tributaria en otro país? (es) Indiqué cuál?(es)" 
                          v-model="item.tax_declaration_another_country"/>
                      </q-card-main>
                    </q-card>
                  </div> 
          			</div>
      				</div>
            </div>
            <div class="item_form col-12 col-md-12 q-px-lg">
    			    <financialInformationComponent :errors="errors"/>
            </div>
          </div>
        </div>
      </div>
    </div>
	</div>
</template>
<script>
  import nationalitiesComponent from 'src/components/profile/nationalitiesComponent';
  import financialInformationComponent from 'src/components/profile/financialinformation';

  export default {
    props:{
      errors: {
        type: Object,
        default: {}
      },
    },
    components: {
      nationalitiesComponent,
      financialInformationComponent
    },
    data(){
      return{
        optionsYN:
        [
          {label: 'NO', value: 'no'},
          {label: 'SI', value: 'si'},
        ],
        type_documents: 
          [
            {label: 'CC', value: '0'},
            {label: 'CE',value: '1'},
            {label: 'TI',value: '2'},
            {label: 'PS',value: '3'}
          ],
        actividad_economica: 
          [
            {label: 'Industrial', value: 'industrial'},
            {label: 'Comercial', value: 'comercial'},
            {label: 'Transporte', value: 'transporte'},
            {label: 'Construcción', value: 'contruccion'},
            {label: 'Agropecuario', value: 'agropecuario'},
            {label: 'Servicio Financiero', value: 'financiero'},
            {label: 'Civil', value: 'civil'},
            {label: 'Otra', value: 'otra'},
          ],
        tipo_empresa:  
          [
            {label: 'Pública', value: 'publica'},
            {label: 'Privada', value: 'privada'},
            {label: 'Mixta', value: 'mixta'},
            {label: 'Sector de la economía', value: 'economia'},
          ],
        }
    },
    computed: {

      business_name: {
        get(){
          return this.$store.getters.getform.attributes.business_name
        },
        set(value){
          this.$store.dispatch('update_form_business_name', value)
        }
      },

      nit: {
        get(){
          return this.$store.getters.getform.attributes.nit
        },
        set(value){
          this.$store.dispatch('update_form_nit', value)
        }
      },

      dv: {
        get(){
          return this.$store.getters.getform.attributes.dv
        },
        set(value){
          this.$store.dispatch('update_form_dv', value)
        }
      },

      last_name: {
        get(){
          return this.$store.getters.getform.attributes.last_name
        },
        set(value){
          this.$store.dispatch('update_form_last_name', value)
        }
      },

      first_name: {
        get(){
          return this.$store.getters.getform.attributes.first_name
        },
        set(value){
          this.$store.dispatch('update_form_first_name', value)
        }
      },

      email: {
        get(){
          return this.$store.getters.getform.attributes.email
        },
        set(value){
           this.$store.dispatch('update_form_email', value)
        }
      },

      type_document: {
        get(){
          return this.$store.getters.getform.attributes.type_document
        },
        set(value){
          this.$store.dispatch('update_form_type_document', value)
        }
      },

      number_document: {
        get(){
          return this.$store.getters.getform.attributes.number_document
        },
        set(value){
          this.$store.dispatch('update_form_number_document', value)
        }
      },

      representative_nationality1: {
        get(){
          return this.$store.getters.getform.attributes.representative_nationality1
        },
        set(value){
          this.$store.dispatch('update_form_representative_nationality1', value)
        }
      },

      representative_nationality2: {
        get(){
          return this.$store.getters.getform.attributes.representative_nationality2
        },
        set(value){
          this.$store.dispatch('update_form_representative_nationality2', value)
        }
      },

      office_addres: {
        get(){
          return this.$store.getters.getform.attributes.office_addres
        },
        set(value){
          this.$store.dispatch('update_form_office_addres', value)
        }
      },

      office_city: {
        get(){
          return this.$store.getters.getform.attributes.office_city
        },
        set(value){
          this.$store.dispatch('update_form_office_city', value)
        }
      },

      office_phone: {
        get(){
          return this.$store.getters.getform.attributes.office_phone
        },
        set(value){
          this.$store.dispatch('update_form_office_phone', value)
        }
      },

      branch_addres: {
        get(){
          return this.$store.getters.getform.attributes.branch_addres
        },
        set(value){
          this.$store.dispatch('update_form_branch_addres', value)
        }
      },

      branch_city: {
        get(){
          return this.$store.getters.getform.attributes.branch_city
        },
        set(value){
          this.$store.dispatch('update_form_branch_city', value)
        }
      },

      branch_phone: {
        get(){
          return this.$store.getters.getform.attributes.branch_phone
        },
        set(value){
          this.$store.dispatch('update_form_branch_phone', value)
        }
      },
      
      type_company: {
        get(){
          return this.$store.getters.getform.attributes.type_company
        },
        set(value){
          this.$store.dispatch('update_form_type_company', value)
        }
      },
      
      economic_activity: {
        get(){
          return this.$store.getters.getform.attributes.economic_activity
        },
        set(value){
          this.$store.dispatch('update_form_economic_activity', value)
        }
      },

      economic_activity_other: {
        get(){
          return this.$store.getters.getform.attributes.economic_activity_other
        },
        set(value){
          this.$store.dispatch('update_form_economic_activity_other', value)
        }
      },    

      table_shareholders: {
        get(){
          return this.$store.getters.getform.attributes.table_shareholders
        },
        set(value){
          this.$store.dispatch('update_form_table_shareholders', value)
        }
      },


      principal_address: {
        get(){
          return this.$store.getters.getform.attributes.principal_address
        },
        set(value){
          this.$store.dispatch('update_form_principal_address', value)
        }
      },
      principal_city: {
        get(){
          return this.$store.getters.getform.attributes.principal_city
        },
        set(value){
          this.$store.dispatch('update_form_principal_city', value)
        }
      },
      principal_phone: {
        get(){
          return this.$store.getters.getform.attributes.principal_phone
        },
        set(value){
          this.$store.dispatch('update_form_principal_phone', value)
        }
      },
      branchoffice_address: {
        get(){
          return this.$store.getters.getform.attributes.branchoffice_address
        },
        set(value){
          this.$store.dispatch('update_form_branchoffice_address', value)
        }
      },
      branchoffice_city: {
        get(){
          return this.$store.getters.getform.attributes.branchoffice_city
        },
        set(value){
          this.$store.dispatch('update_form_branchoffice_city', value)
        }
      },
      branchoffice_phone: {
        get(){
          return this.$store.getters.getform.attributes.branchoffice_phone
        },
        set(value){
          this.$store.dispatch('update_form_branchoffice_phone', value)
        }
      },

      
    },
    methods: {
      addShareholder(){
        this.table_shareholders
        .push({type_document: '', number_document: '', name: '', admin_public_resource: '', recognition_public: '', tax_declaration_another_country: ''})
      },
      removeShareholder(item, index){
        this.table_shareholders.splice(index, 1)
      }
    }
  }
</script>
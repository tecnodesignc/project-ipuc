<template>
	  <div>
      <div class="form-user-data col-12 relative-position">
        <div class="form-title q-title">
          <q-icon name="person" /> 
          Personal Natural 
  		  </div>
        <div class="row form-container q-py-md">
    	    <div class="col-12 order-xs-last">
      	    <div class="row">
              <div class="item_form col-12 col-md-12 q-px-lg q-mb-md">
                <q-input 
                  type="text" 
                  float-label="Nombres" 
                  v-model="first_name" 
                  :error="errors.first_name.$error"/>
              </div>
              <div class="item_form col-12 col-md-12 q-px-lg q-mb-md">
                <q-input 
                  type="text" 
                  float-label="Apellidos" 
                  v-model="last_name" 
                  :error="errors.last_name.$error"/>
              </div>
              <div class="item_form col-12 col-md-4 q-px-lg q-mb-md">
                <q-select 
                  v-model="type_document" 
                  float-label="Tipo de documento" 
                  :options="type_documents" 
                  :error="errors.type_document.$error"/>
              </div>
              <div class="item_form col-12 col-md-4 q-px-lg q-mb-md">
                <q-input 
                  type="text" 
                  float-label="Numero de documento" 
                  v-model="number_document"
                  :error="errors.number_document.$error"/>
              </div>
              <div class="item_form col-12 col-md-4 q-px-lg q-mb-md">
                <q-field icon-color="primary">
                  <q-datetime 
                    class="no-shadow" 
                    float-label="Fecha de nacimiento" 
                    format="YYYY/MM/DD" 
                    v-model="date_birth"
                    :error="errors.date_birth.$error"/>
                </q-field>
              </div>  
              <div class="item_form col-12 col-md-8 q-px-lg q-mb-md">
                <q-input 
                  type="text" 
                  float-label="Lugar de nacimiento" 
                  v-model="place_birth"
                  :error="errors.place_birth.$error"/>
              </div>
              <div class="item_form col-12 col-md-4 q-px-lg q-mb-md">
                <q-select 
                  v-model="genre" 
                  float-label="Genero" 
                  :options="genres" 
                  :error="errors.genre.$error"/>
              </div>
              <div class="item_form col-12 col-md-12 q-px-lg">
                <nationalities-component />
              </div>
              <div class="item_form col-12 col-md-12 q-px-lg q-mb-md">
                <q-input 
                  type="text" 
                  float-label="E-mail" 
                  v-model="email"
                  :error="errors.email.$error"/>
              </div>
              <div class="item_form col-12 col-md-6 q-px-lg q-mb-md">
                <q-input 
                  type="text" 
                  float-label="Teléfono" 
                  v-model="phone"
                  :error="errors.phone.$error"/>
              </div>
              <div class="item_form col-12 col-md-6 q-px-lg q-mb-md">
                <q-input 
                  type="text" 
                  float-label="Celular" 
                  v-model="mobile"
                  :error="errors.mobile.$error"/>
              </div>
              <div class="item_form col-12 col-md-6 q-px-lg q-mb-md">
                <q-select 
                  v-model="principal_occupation" 
                  float-label="Actividad Principal" 
                  :options="actividades" 
                  :error="errors.principal_occupation.$error"/>
              </div>
              <div class="item_form col-12 col-md-6 q-px-lg q-mb-md">
                <q-input 
                  type="text" 
                  float-label="CIIU" 
                  v-model="ciiu"
                  :error="errors.ciiu.$error"/>
              </div>
              <q-slide-transition appear>
                <div class="item_form col-12 col-md-12 q-px-lg q-mb-md" v-if="principal_occupation == 'otra'">
                  <q-input 
                    type="text" 
                    float-label="Cual" 
                    v-model="other_principal_occupation"
                    :error="errors.other_principal_occupation.$error"/>
                </div>
              </q-slide-transition>
              <div class="item_form col-12 col-md-6 q-px-lg q-mb-md">
                <q-input 
                  type="text" 
                  float-label="Actividad secundaria" 
                  v-model="secondary_occupation"
                  :error="errors.secondary_occupation.$error"/>
              </div>
              <div class="item_form col-12 col-md-6 q-px-lg q-mb-md">
                <q-input 
                  type="text" 
                  float-label="CIIU 2" 
                  v-model="ciiu2"/>
              </div>
              <div class="item_form col-12 col-md-12 q-px-lg q-mb-md">
                <q-input 
                  type="text" 
                  float-label="Que tipo de producto comercializa (Independiente o comerciantes)" 
                  v-model="type_products"
                  :error="errors.type_products.$error"/>
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

  import {helper} from '@imagina/qhelper/_plugins/helper'

  import {required, email, sameAs, minLength} from 'vuelidate/lib/validators';

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
        type_sol:
          [
            {label: 'Nuevo',value: 'nuevo'},
            {label: 'Renovación', value: 'renovacion'},
            {label: 'Actualización', value: 'actualizacion'}
          ],
        class_vin:
          [
            {label: 'Cliente', value: 'cliente'},
            {label: 'Proveedor', value: 'proveedor'},
            {label: 'Contratista', value: 'contratista'},
            {label: 'Otra', value: 'otra'}
          ],
        type_documents: 
          [
            {label: 'CC', value: 'cc'},
            {label: 'CE',value: 'ce'},
            {label: 'TI',value: 'ti'},
            {label: 'PS',value: 'ps'}
          ],
        genres: 
          [
            {label: 'Femenino',value: 'F'},
            {label: 'Masculino',value: 'M'}
          ],
        actividades:
          [
            {label: 'Comerciante', value: 'comerciante'},
            {label: 'Agricultor/Ganadero', value: 'agricultor'},
            {label: 'Productor Piscicola', value: 'productor'},
            {label: 'Contratista', value: 'contratista'},
            {label: 'Otra', value: 'otra'}
          ],
        count: 0,
      }
    },
    mounted(){
      this.setUserData()
    },
    methods:{
      addOcupation(){
        this.occupations.push(
          {position: '', company: '', addres: '', phone: ''}
        )
      },
      removeOcupation(item, index){
        this.occupations.splice(index, 1)
      },
      addNationality(){
        this.nationalities.push(
          {nationality: ''}
        )
      },
      removeNationality(item, index){
        this.nationalities.splice(index, 1)
      },
      setUserData(){
        helper.storage.get.item('userData').then(response => {
          this.email = response.email
          this.first_name = response.first_name
          this.last_name = response.last_name
        })
      }
    },
    computed: {

      id: {
        get(){
          return this.$store.getters.getform.attributes.id
        },
        set(value){
          this.$store.dispatch('update_form_id', value)
        }
      },

      city: {
        get(){
          return this.$store.getters.getform.attributes.city
        },
        set(value){
          this.$store.dispatch('update_form_city', value)
        }
      },

      branch_office: {
        get(){
          return this.$store.getters.getform.attributes.branch_office
        },
        set(value){
          this.$store.dispatch('update_form_branch_office', value)
        }
      },

      type_request: {
        get(){
          return this.$store.getters.getform.attributes.type_request
        },
        set(value){
          this.$store.dispatch('update_form_type_request', value)
        }
      },

      entailment: {
        get(){
          return this.$store.getters.getform.attributes.entailment
        },
        set(value){
          this.$store.dispatch('update_form_entailment', value)
        }
      },

      entailment_other: {
        get(){
          return this.$store.getters.getform.attributes.entailment_other
        },
        set(value){
          this.$store.dispatch('update_form_entailment_other', value)
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

      date_birth: {
        get(){
          return this.$store.getters.getform.attributes.date_birth
        },
        set(value){
           this.$store.dispatch('update_form_date_birth', value)
        }
      },

      place_birth: {
        get(){
          return this.$store.getters.getform.attributes.place_birth
        },
        set(value){
           this.$store.dispatch('update_form_place_birth', value)
        }
      },

      genre: {
        get(){
          return this.$store.getters.getform.attributes.genre
        },
        set(value){
           this.$store.dispatch('update_form_genre', value)
        }
      },

      nationality1: {
        get(){
          return this.$store.getters.getform.attributes.nationality1
        },
        set(value){
           this.$store.dispatch('update_form_nationality1', value)
        }
      },

      nationality2: {
        get(){
          return this.$store.getters.getform.attributes.nationality2
        },
        set(value){
           this.$store.dispatch('update_form_nationality2', value)
        }
      },

      nationalities: {
        get(){
          return this.$store.getters.getform.attributes.nationalities
        },
        set(value){
           this.$store.dispatch('update_form_nationalities', value)
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

      phone: {
        get(){
          return this.$store.getters.getform.attributes.phone
        },
        set(value){
           this.$store.dispatch('update_form_phone', value)
        }
      },

      mobile: {
        get(){
          return this.$store.getters.getform.attributes.mobile
        },
        set(value){
           this.$store.dispatch('update_form_mobile', value)
        }
      },

      principal_occupation: {
        get(){
          return this.$store.getters.getform.attributes.principal_occupation
        },
        set(value){
           this.$store.dispatch('update_form_principal_occupation', value)
        }
      },

      other_principal_occupation: {
        get(){
          return this.$store.getters.getform.attributes.other_principal_occupation
        },
        set(value){
           this.$store.dispatch('update_form_other_principal_occupation', value)
        }
      },

      occupations: {
        get(){
          return this.$store.getters.getform.attributes.occupations
        },
        set(value){
           this.$store.dispatch('update_form_occupations', value)
        }
      },

      secondary_occupation: {
        get(){
          return this.$store.getters.getform.attributes.secondary_occupation
        },
        set(value){
           this.$store.dispatch('update_form_secondary_occupation', value)
        }
      },

      ciiu: {
        get(){
          return this.$store.getters.getform.attributes.ciiu
        },
        set(value){
           this.$store.dispatch('update_form_ciiu', value)
        }
      },

      ciiu2: {
        get(){
          return this.$store.getters.getform.attributes.ciiu2
        },
        set(value){
           this.$store.dispatch('update_form_ciiu2', value)
        }
      },


      type_products: {
        get(){
          return this.$store.getters.getform.attributes.type_products
        },
        set(value){
           this.$store.dispatch('update_form_type_products', value)
        }
      },

      


    },

  }
</script>
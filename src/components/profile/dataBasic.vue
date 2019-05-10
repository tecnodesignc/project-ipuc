<template>
	<div>
    
    <div class="form-user-data col-12 relative-position">
    	<div class="form-title q-title">
      	<q-icon name="format_align_justify" /> Formulario unico de conocimiento de terceros
    	</div>
    	<div class="row form-container q-py-md">
      	<div class="col-12 order-xs-last">
        	<!--Inicio campos de fomrulario adicional -->
          <div class="row">
        		
      			<div class="item_form col-12 col-md-6 q-px-lg q-mb-md">
      				<q-field>
      					<q-input 
                  type="text" 
                  float-label="Ciudad" 
                  v-model="city"
                  :error="errors.city.$error"/>
      				</q-field>
      			</div>

      			<div class="item_form col-12 col-md-6 q-px-lg q-mb-md" >
      				<q-input 
                type="text" 
                float-label="Sucursal" 
                v-model="branch_office"
                :error="errors.branch_office.$error"/>
      			</div>

      			<div class="item_form col-12 col-md-6 q-px-lg q-mb-md">
      				<q-select 
                v-model="type_request" 
                float-label="Tipo de solicitud" 
                :options="type_sol" 
                :error="errors.type_request.$error"/>
      			</div>

      			<div class="item_form col-12 col-md-6 q-px-lg q-mb-md">
      				<q-select 
                v-model="entailment" 
                float-label="Clase de vincularion (es)" 
                :options="class_vin" 
                :error="errors.entailment.$error"/>
      			</div>

  					<q-slide-transition>
      			  <div 
                class="item_form col-12 col-md-12 q-px-lg q-mb-md" 
                v-if="entailment == 'otra'">
      				  <q-input 
                  type="text" 
                  float-label="Cual" 
                  v-model="entailment_other"/>
      			  </div>
            </q-slide-transition>
          </div>
          <!--Fin campos de fomrulario adicional -->
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-md-12 q-mb-md">
        <q-card class="no-shadow">
            <q-card-main>
              <div class="flex flex-center" style=" height: 50px">
                <q-toggle 
                  v-model="type_person" 
                  left-label label="Persona Natural" 
                  checked-icon="location_city" 
                  unchecked-icon="person"
                  :true-value="1"
                  :false-value="0"
                  /> Persona Juridica
              </div>
            </q-card-main>
        </q-card>
      </div>
    </div>

    <juridica-component v-if="type_person" :errors="errors"></juridica-component>
    <natural-component v-else :errors="errors"/>	
    
	</div>
</template>

<script>
		import juridicaComponent  from 'src/components/profile/juridicaComponent';
		import naturalComponent  from 'src/components/profile/naturalComponent';

		export default {
      props:{
        errors: {
          type: Object,
          default: {}
        },
      },
      components: {
        juridicaComponent,
        naturalComponent,
      },
      mounted(){

      },
      data(){
        return {
          edit: false,
          loading: false,
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
        }
      },
      computed: {
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

    	 type_person: {
        get(){
          return this.$store.getters.getform.attributes.type_person
        },
        set(value){
          this.$store.dispatch('update_form_type_person', value)
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
    }
  }
</script>
<template>
	<div>
    <div class="form-user-data col-12 relative-position">
  		<div class="form-title q-title">
    		COMUNICADO DE ANTI SOBORNO Y ANTI CORRUPCION, Y CONTRA EL LAVADO DE ACTIVOS Y FINANCIACION DEL TERRORISMO
  		</div>
	  	<div class="row form-container q-py-md">
				<div class="col-12 order-xs-last">
					<div class="row">
						<div class="item_form col-12 col-md-12 q-px-lg q-mb-md">
							<p class="text-justify">
								Organización Pajonales S.A.S. dentro de su política de buen gobierno, 
								buenas prácticas corporativas y sistemas de Anti Soborno y Anti 
								Corrupción, y de Gestión y Administración del Riesgo contra el Lavado 
								de Activos y Financiación del Terrorismo, cuenta con las estructuras, 
								herramientas y procedimientos que le permiten identificar las causas, 
								factores y riesgos existentes, y ha establecido los controles necesarios 
								para minimizar estos riesgos. Organización Pajonales S.A.S. espera de 
								sus asociados de negocio que cuenten con el mínimo de herramientas básicas 
								para la detección y control de los riesgos inherentes anti soborno y anti 
								corrupción,   y contra el Lavado de Activos y la Financiación del Terrorismo.
							</p>
							<div class="item_form col-12 col-md-12 q-mb-lg" v-if="type_person">
                <q-input 
									type="text" 
									v-model="business_name" 
									float-label="Razón social/Nombre persona natural"
									:error="errors.business_name.$error"/>
              </div>
							<div class="item_form col-12 col-md-12 q-mb-lg" v-else>
                <q-input 
									type="text"
									v-model="first_name" 
									float-label="Razón social/Nombre persona natural"/>
              </div>
							<p>
								Manifiesta que sus actividades de buen gobierno y control  van encaminadas a 
								asegurar que todos sus socios, administradores, clientes, proveedores, empleados, 
								y los recursos de estos, no se encuentran relacionados o provienen de actividades 
								ilícitas, particularmente de lavado de activos o financiación del terrorismo y 
								autoriza a Organización Pajonales SAS a consultar en listas nacionales e 
								internacionales cautelares. 
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	export default {
		props:{
      errors: {
        type: Object,
        default: {}
      },
    },
		computed: {

			type_person: {
        get(){
          return this.$store.getters.getform.attributes.type_person
        },
        set(value){
          this.$store.dispatch('update_form_type_person', value)
        }
			},

      business_name: {
        get(){
          return this.$store.getters.getform.attributes.business_name
        },
        set(value){
          this.$store.dispatch('update_form_business_name', value)
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

		}
	}
</script>
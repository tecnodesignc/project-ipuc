<template>
  <div>
		<div class="form-user-data col-12 relative-position">
			<div class="form-title q-title">
  			Declaración de origen de fondos
			</div>
		  <div class="row form-container q-py-md">
  		  <div class="col-12 order-xs-last">
    			<div class="row">
    				<div class="item_form col-12 col-md-12 q-px-lg q-mb-md">
      				<p>Declaro expresamente que: </p>
      				<p>1. Tanto mi actividad, profesión u oficio es lícita y la ejerzo dentro del marco legal y los recursos que poseo no provienen de actividades ilícitas contempladas en el Código penal Colombiano</p>
      				<p>2 . La información que he suministrado en la solicitud y en este documento es veraz y verificable y me comprometo a actualizarla Anualmente.</p>
      				<p>3 . Los recursos que se deriven del desarrollo de este contrato no se destinarán a financiación del terrorismo, grupos o actividades terroristas.</p>
      				<p>4 . Los recursos que poseo provienen de las siguientes fuentes (detallo ocupación, oficio, actividad o negocio):	</p>
      			</div>
    				<div class="item_form col-12 col-md-12 q-px-lg q-mb-md">
      				<q-input 
								type="text" 
								float-label="Origen" 
								v-model="origin"
								:error="errors.origin.$error"/>
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
      origin: {
        get(){
          return this.$store.getters.getform.attributes.origin
        },
        set(value){
          this.$store.dispatch('update_form_origin', value)
        }
      },  
    },
  }
</script>
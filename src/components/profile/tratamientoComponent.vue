<template>
	<div>
		<div class="form-user-data col-12 relative-position">
			<div class="form-title q-title">
  			Autorización de tratamiento de datos
			</div>
  		<div class="row form-container q-py-md">
    		<div class="col-12 order-xs-last">
      			<div class="row">
      				<div class="item_form col-12 col-md-12 q-px-lg q-mb-md">
      					<p class="text-justify">	
									En aplicación del artículo 15 de la Constitución Política de Colombia, 
									la Ley Estatutaria 1581 de 2012, el artículo 10 del Decreto 1377 de 2013 
									y demás normas que regulen lo relacionado con habeas data, autorizo de 
									manera expresa a <b>ORGANIZACIÓN PAJONALES S.A.S</b>. y/o a la persona natural o 
									jurídica a quién ésta encargue, para que recolecte, almacene, use, haga 
									circular, o suprima los datos personales que le he suministrado y/o que 
									le suministraré con el fin que sean utilizados por <b>ORGANIZACIÓN PAJONALES 
									S.A.S</b>. para: Información comercial, publicitaria o promocional sobre los 
									productos, eventos y/o promociones de tipo comercial con el fin de impulsar, 
									invitar, dirigir, ejecutar, informar y de manera general, llevar a cabo 
									campañas, promociones o concursos de carácter comercial. Evaluar la calidad 
									de nuestros productos y servicios. Solicitar o brindar información en general 
									sobre todas las actividades de <b>ORGANIZACIÓN PAJONALES S.A.S.</b>; a  través  de  
									la  presente  doy  constancia  que  <b>ORGANIZACIÓN PAJONALES S.A.S</b>., me ha 
									informado que los datos que obtendrá de mi parte, serán recogidos en una base 
									de datos con la finalidad antes descrita.
      					</p>
								<p class="text-justify">
									<b>POLÍTICAS DE TRATAMIENTO DE DATOS PERSONALES</b>: Declaro que me han informado que 
									las Políticas de Tratamiento de Datos Personales de terceros se encuentran a mi 
									disposición de forma permanente en la página web Organización Pajonales S.A.S., 
									<a href="https://www.pajonales.com/">www.pajonales.com</a>.
								</p>
								<p class="text-justify">
									<b>AUTORIZACIÓN</b>: De manera expresa, previa e informada <b>AUTORIZO</b> el tratamiento de 
									mis datos personales y/o como representante legal para las finalidades y en 
									los términos que nos fueron informados en este documento.
								</p>
								<p class="text-justify">
									<q-checkbox 
										v-model="authorize_processing_personal_data" 
										class="q-mr-md" 
										:true-value="1" 
										false-value="0"	
										:error="errors.authorize_processing_personal_data.$error"/>
									Autorizo el tratamiento de mis datos personales y/o como representante legal: 									
								</p>
								<p class="text-justify">
									<q-checkbox 
										v-model="authorize_contactme_send_information" 
										class="q-mr-md" 
										:true-value="1" 
										false-value="0"	
										:error="errors.authorize_contactme_send_information.$error"/>
									Autorizo me contacten y envíen información por SMS, correo electrónico o cualquier 
									otro medio físico o digital: 
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
			authorize_processing_personal_data:{
				get(){
          return this.$store.getters.getform.attributes.authorize_processing_personal_data
        },
        set(value){
          this.$store.dispatch('update_form_authorize_processing_personal_data', value)
        }
			},
			authorize_contactme_send_information:{
				get(){
          return this.$store.getters.getform.attributes.authorize_contactme_send_information
        },
        set(value){
          this.$store.dispatch('update_form_authorize_contactme_send_information', value)
        }
			}
    },
  }
</script>
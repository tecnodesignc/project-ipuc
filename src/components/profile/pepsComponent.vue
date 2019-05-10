<template>
	<div>
		<div class="form-user-data col-12 relative-position">
			<div class="form-title q-title">
  			Personal PEP's
			</div>
		  <div class="row form-container q-py-md">
  		  <div class="col-12 order-xs-last">
    			<div class="row">
      			<div class="item_form col-12 col-md-12 q-px-lg q-mb-md">
              <div class="row">
                <div class="col-md-6">
                  ¿Por su cargo maneja recursos públicos?
                </div>
                <div class="col-md-6">
                  <q-radio 
                    v-model="admin_public_resource" 
                    val="1" 
                    label="Si" 
                    class="q-pl-lg" 
                    :error="errors.admin_public_resource.$error"/>
                  <q-radio 
                    v-model="admin_public_resource" 
                    val="0" 
                    label="No" 
                    class="q-pl-lg" 
                    :error="errors.admin_public_resource.$error"/>
                </div>
              </div>            
      			</div>
            <div class="item_form col-12 col-md-12 q-px-lg q-mb-md">
              <div class="row">
                <div class="col-md-6">
                  ¿Por su actividad u oficio, goza usted de reconocimiento público general?
                </div>
                <div class="col-md-6">
                  <q-radio 
                    v-model="recognition_public" 
                    val="1" 
                    label="Si" 
                    class="q-pl-lg"
                    :error="errors.recognition_public.$error"/>
                  <q-radio 
                    v-model="recognition_public" 
                    val="0" 
                    label="No" 
                    class="q-pl-lg"
                    :error="errors.recognition_public.$error"/>
                </div>
              </div>            
      			</div>
            <div class="item_form col-12 col-md-12 q-px-lg q-mb-md">
              <div class="row">
                <div class="col-md-6">
                   ¿Existe algún vínculo entre usted y una persona considerada púbicamente expuesta?
                </div>
                <div class="col-md-6">
                  <q-radio 
                    v-model="link_person_publicly_exposed" 
                    val="1" 
                    label="Si" 
                    class="q-pl-lg"
                    :error="errors.link_person_publicly_exposed.$error"/>
                  <q-radio 
                    v-model="link_person_publicly_exposed" 
                    val="0" 
                    label="No" 
                    class="q-pl-lg"
                    :error="errors.link_person_publicly_exposed.$error"/>
                </div>
              </div>            
      			</div>
            <div class="item_form col-12 col-md-12 q-px-lg q-mb-md">
              <div class="row">
                <div class="col-md-6">
                  ¿Por su cargo o actividad ejerce algún grado de poder público?
                </div>
                <div class="col-md-6">
                  <q-radio 
                    v-model="degree_public_power" 
                    val="1" 
                    label="Si" 
                    class="q-pl-lg"
                    :error="errors.degree_public_power.$error"/>
                  <q-radio 
                    v-model="degree_public_power" 
                    val="0" 
                    label="No" 
                    class="q-pl-lg"
                    :error="errors.degree_public_power.$error"/>
                </div>
              </div>            
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
      admin_public_resource: {
        get(){
          return this.$store.getters.getform.attributes.admin_public_resource
        },
        set(value){
          this.$store.dispatch('update_form_admin_public_resource', value)
        }
      },
      recognition_public: {
        get(){
          return this.$store.getters.getform.attributes.recognition_public
        },
        set(value){
          this.$store.dispatch('update_form_recognition_public', value)
        }
      },
      link_person_publicly_exposed: {
        get(){
          return this.$store.getters.getform.attributes.link_person_publicly_exposed
        },
        set(value){
          this.$store.dispatch('update_form_link_person_publicly_exposed', value)
        }
      },
      degree_public_power: {
        get(){
          return this.$store.getters.getform.attributes.degree_public_power
        },
        set(value){
          this.$store.dispatch('update_form_degree_public_power', value)
        }
      },
    },
  }
</script>
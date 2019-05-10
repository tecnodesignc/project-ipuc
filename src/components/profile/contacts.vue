<template>
	<div>
    <div class="form-user-data col-12 relative-position">
  		<div class="form-title q-title">
    		<span>
          DATOS DE CONTACTO
        </span>
  		</div>
	  	<div class="row form-container q-py-md">
				<div class="col-12 order-xs-last">
					<div class="row">
						<div class="item_form col-12 col-md-12 q-px-lg q-mb-md">
              <div class="item_form col-12 col-md-12">
                <div class="form-user-data col-12 relative-position">
                  <div class="form-title">
                    <span>
                      CONTACTOS
                    </span>
                    <q-btn  
                      icon="add" 
                      color="primary" 
                      size="sm" 
                      @click="addContacts" 
                      label="Agregar Contacto" 
                      class="float-right" 
                      rounded/>
                  </div>
                  <div class="row form-container q-py-md">
                    <div 
                      class="col-12 q-px-md" 
                      v-for="(item, index) in contacts" 
                      :key="index">
                      <q-card class="no-shadow">                        
                        <q-btn 
                          icon="delete" 
                          color="red" 
                          size="sm" 
                          @click="removeContacts(item, index)" 
                          class="float-right q-mt-sm q-mr-sm" 
                          round/>
                        <q-card-main class="row">
                          <div class="col-md-2 q-pl-md">
                            <q-select
                              v-model="item.type"
                              float-label="Tipo de Contacto"
                              chips
                              :options="types"/>
                          </div>
                          <div class="col-md-4 q-pl-xs">
                            <q-field
                              icon="person">
                              <q-input 
                                type="text" 
                                float-label="Nombres y Apellidos" 
                                v-model="item.name"/>
                            </q-field>
                          </div>
                          <div class="col-md-3 q-pl-xs">
                            <q-field
                              icon="email">
                              <q-input 
                                type="text" 
                                float-label="E-Mail" 
                                v-model="item.email"/>
                            </q-field>
                          </div>
                          <div class="col-md-3 q-pl-xs">
                            <q-field
                              icon="phone">
                              <q-input 
                                type="text" 
                                float-label="Teléfono" 
                                v-model="item.phone"/>
                            </q-field>
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
			</div>
		</div>
	</div>
</template>

<script>
  export default {
    data(){
      return{
        types: [
          {
            label: 'Comercial',
            value: 'comercial'
          },
          {
            label: 'Tesorería',
            value: 'tesoreria'
          },
          {
            label: 'Compras',
            value: 'compras'
          }          
        ],
      }
    },
    computed: {
      contacts:{
        get(){
          return this.$store.getters.getform.attributes.contacts
        },
        set(value){
          this.$store.dispatch('contacts', value)
        }
      }
    },
    methods:{
      addContacts(){
        this.contacts.push({
          type: null,
          name: null,
          email: null,
          phone: null,
        })
      },
      removeContacts(item, index){
        this.contacts.splice(index, 1)
      },
    }
  }
</script>
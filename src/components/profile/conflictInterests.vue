<template>
	<div>
    <div class="form-user-data col-12 relative-position">
  		<div class="form-title q-title">
    		DECLARACIÓN DE CONFLICTO DE INTERESES
  		</div>
	  	<div class="row form-container q-py-md">
				<div class="col-12 order-xs-last">
					<div class="row">
						<div class="item_form col-12 col-md-12 q-px-lg q-mb-md">
							<p class="text-justify">
                1. Declaro que me abstendré de aceptar u ofrecer beneficios, regalos, tratos preferenciales, 
                invitaciones y otro parecido que pudiera comprometer la imparcialidad en la toma de decisiones 
                y consecución de resultados.
              </p>
              <p class="text-justify">
                2. Entiendo que ante la presencia o posible existencia de un Conflicto de Interés, notificaré 
                inmediatamente el caso a Pajonales S.A.S, quien  validará la posible existencia de dicho conflicto.
              </p>
              <p class="text-justify">
                3, Entiendo que si incurro en prácticas que constituyan conflicto de interés, dará por resultado  
                sanciones civiles, penales y/o laborales que la ley colombiana contempla.
              </p>
              <p class="text-justify">
                3, ¿Conoce de algún parentesco entre los colaboradores de Pajonales S.A.S y sus colaboradores y/o usted ?
              </p>

              <div class="item_form col-12 col-md-12">
                <div class="form-user-data col-12 relative-position">
                  <div class="form-title">
                    Parentesco
                    <q-btn  icon="add" color="primary" size="sm" @click="addParents" label="Agregar" class="float-right" rounded/>
                  </div>
                  <div class="row form-container q-py-md">
                    <div class="col-12 q-px-md" v-for="(item, index) in parents" :key="index">
                      <q-card class="no-shadow">
                        <q-btn icon="delete" color="red" size="sm" @click="removeParents(item, index)" class="float-right q-mt-sm q-mr-sm" round/>
                        <q-card-main class="row">
                          <div class="col-md-4 q-pl-md">
                            <q-input type="text" float-label="Nombre" v-model="item.name"/>
                          </div>
                          <div class="col-md-4 q-pl-md">
                            <q-input type="text" float-label="Parentesco" v-model="item.relationship"/>
                          </div>
                          <div class="col-md-4 q-pl-md">
                            <q-input type="text" float-label="Cargo" v-model="item.position"/>
                          </div>
                        </q-card-main>
                      </q-card>
                    </div>
                  </div>
                </div>
              </div>

              <p class="text-justify"> 																								
                4.¿Conoce de algún colaborador de Pajonales S.A.S que hubiese tenido vinculo labor con usted y/o la organización que representa?
              </p>

             <div class="item_form col-12 col-md-12">
                <div class="form-user-data col-12 relative-position">
                  <div class="form-title">
                    Vinculos con Pajonales
                    <q-btn  icon="add" color="primary" size="sm" @click="addLinkToPajonales" label="Agregar" class="float-right" rounded/>
                  </div>
                  <div class="row form-container q-py-md">
                    <div class="col-12 q-px-md" v-for="(item, index) in linkToPajonales" :key="index">
                      <q-card class="no-shadow">
                        <q-btn icon="delete" color="red" size="sm" @click="removeLinkToPajonales(item, index)" class="float-right q-mt-sm q-mr-sm" round/>
                        <q-card-main class="row">
                          <div class="col-md-6 q-pl-md">
                            <q-input type="text" float-label="Nombre" v-model="item.name"/>
                          </div>
                          <div class="col-md-6 q-pl-md">
                            <q-input type="text" float-label="Cargo" v-model="item.position"/>
                          </div>
                        </q-card-main>
                      </q-card>
                    </div>
                  </div>
                </div>
              </div>
              
              <div class="item_form col-12 col-md-12">
                <q-select 
                  v-model="conflict_interest" 
                  float-label="5. ¿Considera se presente alguna situación que pueda generar conflicto de interés ?" 
                  :options="selectboolean"/>
              </div>

              <div class="item_form col-12 col-md-12" v-if="conflict_interest == 'si'">
                <q-input type="text" v-model="conflict_interest_other" float-label="Indiquelo"/>
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
        selectboolean: [
          {label: 'Si', value: 'si'},
          {label: 'No', value: 'no'},
        ],
      }
    },
    computed: {
      parents: {
        get(){
          return this.$store.getters.getform.attributes.parents
        },
        set(value){
          this.$store.dispatch('update_form_parents', value)
        }
      },
      linkToPajonales: {
        get(){
          return this.$store.getters.getform.attributes.linkToPajonales
        },
        set(value){
          this.$store.dispatch('update_form_linkToPajonales', value)
        }
      },
      conflict_interest: {
        get(){
          return this.$store.getters.getform.attributes.conflict_interest
        },
        set(value){
          this.$store.dispatch('update_form_conflict_interest', value)
        }
      },
      conflict_interest_other: {
        get(){
          return this.$store.getters.getform.attributes.conflict_interest_other
        },
        set(value){
          this.$store.dispatch('update_form_conflict_interest_other', value)
        }
      },
    },
    methods:{
      addParents(){
        this.parents.push({
          name: '', 
          relationship: '', 
          position: ''
        })
      },
      removeParents(item, index){
        this.parents.splice(index, 1)
      },
      addLinkToPajonales(){
        this.linkToPajonales.push({
          name: '',  
          position: ''
        })
      },
      removeLinkToPajonales(item, index){
        this.linkToPajonales.splice(index, 1)
      },
    }
  }
</script>


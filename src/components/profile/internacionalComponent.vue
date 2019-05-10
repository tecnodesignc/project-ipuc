<template>
	<div>
		<div class="form-user-data col-12 relative-position">
      <div class="form-title q-title">
      	Actividad en operaciones internacionales
      </div>
      <div class="row form-container q-py-md">
  		  <div class="col-12 order-xs-last">
    			<div class="row">

				   <div class="item_form col-12 col-md-12 q-px-lg q-mb-md">
      				<q-select 
                v-model="foreign_currency_transactions" 
                float-label="¿Realiza transacciones en moneda extranjera?" 
                :options="selectboolean" 
                :error="errors.foreign_currency_transactions.$error"/>
      			</div>

      			<div class="item_form col-12 col-md-4 q-px-lg q-mb-md" v-if="foreign_currency_transactions == 'si'">
      				<q-select 
                v-model="imports" 
                float-label="Importaciones" 
                :options="selectboolean" 
                :error="errors.imports.$error"/>
      			</div>

      			<div class="item_form col-12 col-md-4 q-px-lg q-mb-md" v-if="foreign_currency_transactions == 'si'">
      				<q-select 
                v-model="exports" 
                float-label="Exportaciones" 
                :options="selectboolean" 
                :error="errors.exports.$error"/>
      			</div>

      			<div class="item_form col-12 col-md-4 q-px-lg q-mb-md" v-if="foreign_currency_transactions == 'si'">
      				<q-select 
                v-model="investments" 
                float-label=" Inversiones" 
                :options="selectboolean" 
                :error="errors.investments.$error"/>
      			</div>

      			<div class="item_form col-12 col-md-4 q-px-lg q-mb-md" v-if="foreign_currency_transactions == 'si'">
      				<q-select 
                v-model="transfers" 
                float-label="Transferencias" 
                :options="selectboolean" 
                :error="errors.transfers.$error"/>
      			</div>

      			<div class="item_form col-12 col-md-4 q-px-lg q-mb-md" v-if="foreign_currency_transactions == 'si'">
      				<q-select 
                v-model="other"
                float-label="Otra" 
                :options="selectboolean" 
                :error="errors.other.$error"/>
      			</div>

      			<div class="item_form col-12 col-md-4 q-px-lg q-mb-md" v-if="foreign_currency_transactions == 'si'">
      				<q-input 
                type="text" 
                float-label="Indique otras operaciones" 
                v-model="other_details"
                :error="errors.other_details.$error"/>
      			</div>

      			<div class="item_form col-12 col-md-6 q-px-lg q-mb-md">
      				<q-select 
                v-model="financial_products_abroad" 
                float-label="¿Posee productos financieros en el exterior?" 
                :options="selectboolean" 
                :error="errors.financial_products_abroad.$error"/>
      			</div>

      			<div class="item_form col-12 col-md-6 q-px-lg q-mb-md">
      				<q-select 
                v-model="accounts_foreign_currency" 
                float-label="¿Posee cuentas en moneda extranjera?" 
                :options="selectboolean" 
                :error="errors.accounts_foreign_currency.$error"/>
      			</div>

            <div class="item_form col-12 col-md-12 q-px-lg q-mt-md" v-if="accounts_foreign_currency == 'si'">
              <div class="form-user-data col-12 relative-position">
                <div class="form-title">
                  Operaciones Internacionales
		              <q-btn  icon="add" color="primary" size="sm" @click="addProducts" label="Agregar" class="float-right" rounded/>
		            </div>
          		  <div class="row form-container q-py-md">

                  <div class="col-4 q-px-md" v-for="(item, index) in financial_products" :key="index">
                    <q-card class="no-shadow">
                      <q-card-title>
                        <q-btn icon="delete" color="red" size="sm" @click="removeProducts(item, index)" label="Remover" class="float-right" rounded/>
                      </q-card-title>
                      <q-card-separator />
                      <q-card-main>
                        <q-input type="text" float-label="Tipo de producto" v-model="item.type_product"/>
                        <q-input type="text" float-label="Identificación" v-model="item.id_product"/>
                        <q-input type="text" float-label="Entidad" v-model="item.entity"/>
                        <q-input type="text" float-label="Monto" v-model="item.amount"/>
                        <q-input type="text" float-label="Ciudad" v-model="item.city"/>
                        <q-input type="text" float-label="País" v-model="item.country"/>
                        <q-input type="text" float-label="Moneda" v-model="item.currency"/>
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
</template>
<script>
  export default {
    props:{
      errors: {
        type: Object,
        default: {}
      },
    },
    data(){
      return{
        selectboolean: [
          {label: 'Si', value: 'si'},
          {label: 'No', value: 'no'},
        ],
      }
    },
    computed: {

      foreign_currency_transactions: {
        get(){
          return this.$store.getters.getform.attributes.foreign_currency_transactions
        },
        set(value){
          this.$store.dispatch('update_form_foreign_currency_transactions', value)
        }
      },

      imports: {
        get(){
          return this.$store.getters.getform.attributes.imports
        },
        set(value){
          this.$store.dispatch('update_form_imports', value)
        }
      },

      exports: {
        get(){
          return this.$store.getters.getform.attributes.exports
        },
        set(value){
          this.$store.dispatch('update_form_exports', value)
        }
      },

      investments: {
        get(){
          return this.$store.getters.getform.attributes.investments
        },
        set(value){
          this.$store.dispatch('update_form_investments', value)
        }
      },

      transfers: {
        get(){
          return this.$store.getters.getform.attributes.transfers
        },
        set(value){
          this.$store.dispatch('update_form_transfers', value)
        }
      },

      other: {
        get(){
          return this.$store.getters.getform.attributes.other
        },
        set(value){
          this.$store.dispatch('update_form_other', value)
        }
      },

      other_details: {
        get(){
          return this.$store.getters.getform.attributes.other_details
        },
        set(value){
          this.$store.dispatch('update_form_other_details', value)
        }
      },

      financial_products_abroad: {
        get(){
          return this.$store.getters.getform.attributes.financial_products_abroad
        },
        set(value){
          this.$store.dispatch('update_form_financial_products_abroad', value)
        }
      },
 
      accounts_foreign_currency: {
        get(){
          return this.$store.getters.getform.attributes.accounts_foreign_currency
        },
        set(value){
          this.$store.dispatch('update_form_accounts_foreign_currency', value)
        }
      },
 
      financial_products: {
        get(){
          return this.$store.getters.getform.attributes.financial_products
        },
        set(value){
          this.$store.dispatch('update_form_financial_products_abroad', value)
        }
      },
    },
    methods:{
      addProducts(){
        this.financial_products.push({type_product: '', id_product: '', entity: '', amount: '', city: '', country: '', currency: ''})
      },
      removeProducts(item, index){
        this.financial_products.splice(index, 1)
      }
    }
  }
</script>
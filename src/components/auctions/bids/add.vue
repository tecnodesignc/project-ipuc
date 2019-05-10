<template>
	<q-card class="no-shadow">
		<q-card-title style="background: #61b63b; color: white">
			Características del Producto
		</q-card-title>
		<q-card-main>
			<div>
				<div class="row q-px-md q-mt-lg">
					<div class="col-xs-12">
						<b>PRODUCTO</b>
					</div>
					<div class="col-sm-6 col-xs-12 q-px-md">
						<q-select 
							v-model="form.product_id" 
							:options="products" 
							float-label="Seleccione el producto"/>
					</div>
					<div class="col-sm-6 col-xs-12 q-px-md">
						<q-input 
							v-model="form.price" 
							type="number" 
							float-label="Precio por unidad"/>
					</div>
					<div class="col-sm-6 col-xs-12 q-px-md">
						<q-input 
							v-model="form.longer_term" 
							type="number" 
							float-label="Plazo"/>
					</div>
					<div class="col-sm-6 col-xs-12 q-px-md">
						<q-input 
							v-model="form.tax" 
							type="number" 
							float-label="IVA"/>
					</div>
				</div>
				<div class="row q-px-md q-mt-lg">
					<div class="col-xs-12">
						<b>ENVÍO</b>
					</div>
					<div class="col-sm-6 col-xs-12 q-px-md">
						<q-input 
							v-model="form.freight_term" 
							type="number" 
							float-label="Plazo Flete"/> 		
					</div>
					<div class="col-sm-6 col-xs-12 q-px-md">
						<q-input 
							v-model="form.freight_price" 
							type="number" 
							float-label="Precio Flete x Litro" />
					</div>
					
					<div class="col-12">
						<h5 class="text-center">PRECIO TOTAL : <b>{{total}}</b> COP</h5>
					</div>
				</div>

				<div class="row">
					<div class="col-12">
						<p class="text-center">
							<strong>
								<span>
									Al momento de digitar y enviar la cifra o monto deseado usted se compromete a 
									cumplir con dicho monto al momento de haber sido seleccionado como ganador.
									</span>
							</strong>
						</p> 
					</div>
					<div class="col-md-12 col-xs-12" align="center" >
						<q-btn 
							color="orange" 
							icon="send" 
							label="Enviar Oferta" 
							no-caps
							class=""
							@click="saveBid()"/>
					</div>
				</div>
			</div>

		</q-card-main>
	</q-card>
</template>

<script>
	//PLUGUINS
	import {alert} from '@imagina/qhelper/_plugins/alert'
	import {required, email, sameAs, minLength} from 'vuelidate/lib/validators';

	// SERVICES
	import serviceProducts from 'src/services/products/service'
	import serviceBids from 'src/services/bids/service'

	export default {
		props:{
			auction:{
				default:[],
			},
			ingredient: {
        default:'0',
        type:String
			}
		},	
		data(){
			return {
				products: [],
				form:{
					auction_id: this.auction.id,
					provider_id: this.$store.state.auth.userData.id,
					product_id: '',
					price: 0,
					longer_term: 0, 
					tax: 0, 
					freight_term: 0, 
					freight_price: 0,
					totalPrice: 0,
				}
			}
    },
    validations:{
      form:{
        product_id: {required},
        price: {required},
        longer_term: {required},
        tax: {required},
        freight_term: {required},
				freight_price: {required},
      }
    },
    computed: {
			financialCost(){
				let cost_financial_longer = 0;
				let cost_financial_freight = 0;
				let financial_cost_daily = (parseInt(this.auction.financial_cost_monthly) / 30) / 100;
				if (this.form.longer_term <= parseInt(this.auction.longerterm)) {
					let day_longer = parseInt(this.auction.longerterm) - parseInt(this.form.longer_term);//50
					cost_financial_longer = (day_longer * financial_cost_daily) * parseInt(this.form.price);
				}
				if (this.form.freight_term >= parseInt(this.auction.longer_term_freight)) {
					let day_freight = this.form.freight_term - parseInt(this.auction.longer_term_freight);
					cost_financial_freight = (day_freight * financial_cost_daily) * parseInt(this.form.freight_price);
				}
				let total_financia_cost = cost_financial_longer + cost_financial_freight;
				return total_financia_cost;
			},
			total(){
				let TotlaValue = parseInt(this.form.price) + this.financialCost;
				let iva = parseInt(this.form.tax) / 100;
				let ivaValue = parseInt(this.form.price) * iva;
				let total = (TotlaValue + ivaValue) * this.auction.quantity;
				this.form.totalPrice  = total 
				return Math.round(total);
			}
		},
		mounted(){
			this.getProducts()
		},
		methods:{
			getProducts(){
				
        let filter = {
          provider:this.$store.state.auth.userData.id,
          ingredient:this.ingredient
				}

				serviceProducts.index(filter)
				.then(respose=>{
          this.products = this.select(respose.data)
        })
				.catch(error=>{
          console.warn(error)
        })
			},
			saveBid(){
        this.$v.$touch()
        if (this.$v.$error) {
          this.$q.notify('Por favor revise los campos de nuevo.')
          return
        }
				serviceBids.create(this.auction.id, {attributes: this.form})
				.then(respose=>{
					this.resetForm()
					this.$root.$emit('bid-added')
					alert.success('La puja ha sido añadida exitosamente', 'bottom')
				})
				.catch(error=>{
					console.warn(error)
					this.$q.notify(`Error ${error}`)
				})
			},
			resetForm(){
					this.form.product_id = 0
					this.form.price = 0
					this.form.longer_term =0
					this.form.tax = 0
					this.form.freight_term = 0
					this.form.freight_price  =0
			},			
      // Format data of q-select for quasar
      select(dataArray) {
        return dataArray.map(item=> {
          return {
            label: item.name ? item.name : 'default',
            value: item.id.toString()
          }
        })
      }
		}
	}
</script>


<template>
	<div>
		<q-card class="no-shadow">
			<q-card-main>
        <form id="formAddBid">
        	<div class="row">
        		<div class="col-12">
		      		<h4>Producto</h4>
				</div>
        		<div class="col-sm-3 col-xs-12 separate-1">
		      		<!-- <q-select v-model="product_id" :options="myProducts" float-label="Nombre del producto"/> -->
		      		<q-select v-model="product_id" :options="optionsMyProducts" float-label="Seleccione el producto" :error="this.$v.product_id.$error"/>
        		</div>
        		<div class="col-sm-3 col-xs-12 separate-1">
		      		<q-input v-model="price" type="number" stack-label="Precio por unidad" placeholder="E.j. $ 500.000 COP" :error="this.$v.price.$error"/>
        		</div>
        		<div class="col-sm-3 col-xs-12 separate-1">
        			<q-input v-model="plazo_producto" type="number" stack-label="Plazo" placeholder="E.j. 20 Días" :error="this.$v.plazo_producto.$error"/>
        		</div>
        		<div class="col-sm-3 col-xs-12 separate-1">
        			<q-input v-model="iva" type="number" stack-label="IVA" placeholder="IVA" :error="this.$v.iva.$error"/>
        		</div>
        	</div>
        	<div class="row">
				<hr>
				<div class="col-12">
		      		<h4>Envìo</h4>
				</div>
				<div class="col-sm-3 col-xs-12 separate-1">
					<q-input v-model="plazo_flete" type="number" stack-label="Plazo Flete" placeholder="Plazo Flete" :error="this.$v.plazo_flete.$error"/> 		
				</div>
				<div class="col-sm-3 col-xs-12  separate-1">
		      		<q-input v-model="precio_flete" type="number" stack-label="Precio Flete x Litro" placeholder="Precio Flete X Litro" :error="this.$v.precio_flete.$error"/>
				</div>
				<div class="col-12">
		      		<h5>Precio Total : {{totalPrice}} COP</h5>
				</div>
        	</div>

        	 <q-card-separator />

        	<div class="row aution-description">

              <div class="col-12">
                <p class="description-details" style="margin: 10px 0; font-size: 24px;">
                  <strong class="offers-sec">
                  <span>Al momento de digitar y enviar la cifra o monto deseado usted se compromete a cumplir con dicho monto al momento de haber sido seleccionado como ganador.</span></strong>
                </p> 
              </div>
              <div class="col-md-12 col-xs-12" align="center">
                <q-btn color="green-6" class="full-width" @click="saveBid" icon="send" label="Enviar Oferta" no-caps></q-btn>
              </div>
            </div>
            <br>
        </form> 
        </q-card-main>
        </q-card>
	</div>
	
</template>

<script>
	import {required, email, sameAs, minLength} from 'vuelidate/lib/validators';
	import {alert} from '@imagina/qhelper/_plugins/alert'
	import config from 'src/config/index'
	import axios from 'axios';
	
	export default {
		name: 'addComponent',
		mounted: function () {
			this.getMyProductsWithParticipation()
			this.getauction()
		},
		data () {
			return {
				auction: {
					id: 0,
					title: '',
					description: '',
					  base_price: '',
					  started_at: '',
					  finished_at: '',
					  quantity: '',
					  area: '',
					  longerterm: '',
					  financialcost_daily: '',
					  financialcost_monthly: '',
					  longerterm_freight: '',
					  status: '',
					  statusName: '',
					  user_id: '',
					  winner_id: null,
					  options: null,
					  product: {
						  id: 1,
						  name: '',
						  slug: '',
						  unity: '',
						  unityName: '',
						  concentration: '',
						  dosis_ha: '',
						  status: '',
						  statusName: '',
						  options: null
					  }
					},
				myProducts: [
					{
				    	product: {}
				  	}
				],
				product_id: '',
				price: '',
				plazo_producto: '',
				iva: '',
				plazo_flete: '',
				precio_flete: '',
				code_provider: '',
			}
		},
		computed: {
			totalPrice: function () {
				let financiero = (this.plazo_producto >= this.auction.longerterm ? 0 : (( this.auction.longerterm - this.plazo_producto )*this.auction.financialcost_daily)*this.price+((this.auction.longerterm_freight-this.plazo_flete)*this.auction.financialcost_daily)*this.precio_flete)

				//Formula ((PLAZOMAYOR-PLAZOINGRESADO)*$COSTOFINANDIARIO)*PRECIOUNIDADINGRESADO+((PLAZOMAYORFLETE-PLAZOFLETEINGRESADO)*$COSTOFINANDIARIO)*PRECIOFLETEINGRESADO

				let valor_total = this.price + this.precio_flete + financiero
				let gr_lt =  this.product_id.concentration 
				let vr_gr_ia = valor_total/gr_lt 
				let dosis_ha = this.auction.product.dosis_ha
				let costo_ha = valor_total * dosis_ha
				let has = this.auction.area
				let kilogramos_comprar = this.auction.area * this.auction.product.dosis_ha //
				let concentration = gr_lt * dosis_ha
				let costo = valor_total * kilogramos_comprar
				let iva = this.iva
				let valor_iva = this.price * iva * kilogramos_comprar
				let costo_total = costo + valor_iva
				return costo_total
			},
			optionsMyProducts: function () {
				let res = []
				this.myProducts.forEach((item)=>{
					res.push({label: item.product.name, value: item.product})
				})
				return res
			},
		},
		methods: {
	      getauction: function () {
	        axios.get(config('apiRoutes.api.api_url') + '/iauctions/auctions/'+this.$route.params.id+'?include=product')
	        	.then(response => {
	          		this.auction = response.data.data
	          		this.loading = false
	        })
	      },
	      getMyProductsWithParticipation: function () {
	      	axios.get(config('apiRoutes.api.api_url') + '/iauctions/auctionproviders/auction/'+this.$route.params.id+'?include=products')
	      		.then(response=>{
	      			this.myProducts = response.data.data.product
	      			this.code_provider =  response.data.data.code_use
	      		})
	      },
	      saveBid: function (){
      	    
      	    this.$v.$touch()
            if (this.$v.$error) {
                this.$q.notify('Por favor revise los campos de nuevo.')
                return
            }
            
	      	let data = {
	      		product_id: this.product_id.id,
	      		price: this.price,
	      		longerterm: this.plazo_producto, 
	      		tax: this.iva, 
	      		freight_term: this.plazo_flete, 
	      		freight_price: this.precio_flete, 
	      		total_price: this.totalPrice, 
	      		code_user: this.code_provider,
	      		concentration: this.product_id.concentration 
	      	}

	      	axios.post(config('apiRoutes.api.api_url') +'/iauctions/bids/auction/'+this.$route.params.id, data)
	      	.then(response => {
	      		document.querySelector('#formAddBid').reset();
	      		this.$emit('updatebids', response)
	      		alert.success('La puja ha sido añadida exitosamente', 'bottom')
	      		this.product_id = ''

	      	})
	      }
		},
		validations: {
			product_id: {required},
			price: {required},
			plazo_producto: {required},
			iva: {required},
			plazo_flete: {required},
			precio_flete: {required},
		},
	}
</script>

<style>
	.separate-1{
		padding: 0 10px;
	}
</style>
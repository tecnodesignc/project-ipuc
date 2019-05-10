<template>
	<div>
		<table class="q-table q-table-responsive q-table-horizontal-separator bordered">
		  <thead style="background: #61b63b">
		    <tr>
		      <th class="text-left" style="color: white;">Còdigo del ofertante</th>
		      <th class="text-left" style="color: white;">Precio</th>
		      <th class="text-left" style="color: white;">Plazo</th>
		    </tr>
		  </thead>
		  <tbody>
		    <tr v-for="data in bids" :class="setClass(data)">
		      <td class="text-left">LIC{{data.code_user}} {{data.user_id == userData.id ? '- Mi Oferta' : ''}}{{data.id == bestBid.id ? ', Mejor Oferta' : ''}} </td>
		      <td class="text-left" > $ {{totalPrice(data)}} COP</td>
		      <td class="text-left"><pre>{{setTime(data.created_at)}}</pre></td>
		    </tr>
		  </tbody>
		</table>
	</div>
</template>

<script>
	import {helper} from '@imagina/qhelper/_plugins/helper'
	import moment from 'moment'
	import tz from 'moment-timezone'

	export default {
		props: ['bids'],
		name: 'chartComponent',
		data() {
			return {
				userData : false
			}
		},
		mounted() {
      		this.$nextTick(function () {
        		this.setData()
      		})
    	},
    	computed:{
    		bestBid: function (){
    			let best = 0
    			for (var i = 0; i < this.bids.length; i++) {
    				best = this.bids[i].longerterm > best ? this.bids[i] : best
    			}
    			return best
    		},

    	},
		methods: {
	      	setData(){
	        	helper.storage.get.item('userData').then(response => {
	          		this.userData = response
	        	})
	      	},
	      	setTime(time){
	      		// Pendiente mostrar fechas legibles p.e hace 1 hora, posible hacer con un diff
	      		let hour = moment(time).locale('es').format()
	      		return time
	      	},
	      	totalPrice(data) {
				let financiero = (parseInt(data.longerterm) >= parseInt(data.auction.longerterm) ? 0 : (( parseInt(data.auction.longerterm) - parseInt(data.longerterm) ) * parseInt(data.auction.financialcost_daily)) * parseInt(data.price) + ((parseInt(data.auction.longerterm_freight) - parseInt(data.freight_term)) *parseInt(data.auction. financialcost_daily)) * parseInt(data.freight_price))

				let valor_total = parseInt(data.price) + parseInt(data.freight_price) + financiero
				let gr_lt =  parseInt(data.concentration)
				let vr_gr_ia = parseInt(valor_total) / parseInt(gr_lt) 
				let dosis_ha = parseInt(data.auction.product.dosis_ha)
				let costo_ha = parseInt(valor_total) * parseInt(dosis_ha)
				let has = parseInt(data.auction.area)
				let kilogramos_comprar = parseInt(has) * parseInt(dosis_ha) //
				let concentration = parseInt(gr_lt) * parseInt(dosis_ha)
				let costo = parseInt(valor_total) * parseInt(kilogramos_comprar)
				let iva = parseInt(data.tax)
				let valor_iva = parseInt(data.price) * parseInt(iva) * parseInt(kilogramos_comprar)
				let costo_total = parseInt(costo) + parseInt(valor_iva)
				return costo_total
			},
			setClass: function (data) {
    			let classCss
    			if (data.id == this.bestBid.id) {
    				classCss = 'bg-blue-4 text-white'
    			} else if (data.user_id == this.userData.id){
    				classCss = 'bg-red-4 text-white'
    			} else {
    				classCss = ''
    			}
    			return classCss 
    		}
	    }
	}
</script>

<style>
	.bg-blue, .bg-red{
		color: white;
	}
</style>
<template>
	<div>
    	<highcharts :options="chartOptions"></highcharts>
      <q-inner-loading :visible="loading">
        <q-spinner-gears size="50px" color="primary"></q-spinner-gears>
      </q-inner-loading> 
  </div>
</template>

<script>
  import {helper} from '@imagina/qhelper/_plugins/helper'
export default {
  name: 'chartComponent',
  props: ['bids'],
  data() {
    return {
      loading : true,
      userData : [],
      chartOptions: {

        chart: {
          type: 'column'
        },
        title: {
          text: ''
        },
        subtitle: {
        /*  text: 'Click the columns to view versions. Source: <a href="http://statcounter.com" target="_blank">statcounter.com</a>'*/
        },
        xAxis: {
          type: 'category'
        },
        yAxis: {
        title: {
            text: ''
          }
        },
        legend: {
          enabled: false
        },
        plotOptions: {
          series: {
            borderWidth: 0,
            dataLabels: {
              enabled: true,
              format: '$ {point.y}'
            }
          }
        },
        tooltip: {
          headerFormat: '<span style="font-size:11px"></span><br>',
          pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>${point.y}</b><br/>'
        },
        series: 
          [
            {
              data: 
              [
                //{name : 'Mi Oferta', y: 100000, color: '#2c7bc4'},
              ],
            },
          ]
        }
      }
      
  },
  computed: {
    bestBid: function (){
      let best = 0
      for (var i = 0; i < this.bids.length; i++) {
        best = this.bids[i].longerterm > best ? this.bids[i] : best
      }
      return best
    },
  },
  mounted(){
    this.$nextTick(function () {
      
      setTimeout(()=>{
        this.formatBids()
        this.loading = false
      }, 1000);
      console.log(this.bids)
      this.setData()
    })
  },
  methods:{
    setData(){
      helper.storage.get.item('userData').then(response => {
          this.userData = response
      })
    },
    formatBids: function () {
      this.bids.forEach(item => {
        this.chartOptions.series[0].data.push({name: this.name(item) , y: this.totalPrice(item), color: this.columcolor(item)})
      })
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
      name(item){
        let msj = ''
        if (this.bestBid.id == item.id && this.userData.id == item.user_id) {
          msj = `Mi Oferta,<br> Mejor Oferta`
        } else if(this.bestBid.id == item.id){
          msj = `Mejor Oferta`
        } else if(this.userData.id == item.user_id){
          msj = `Mi Oferta`+' ('+item.id+') '
        }else {
          msj = 'Cod: LIC'+item.code_user+' ('+item.id+') '
        }
        return msj
      },
      columcolor(item){
        let color = ''
        if (this.bestBid.id == item.id && this.userData.id == item.user_id) {
          color = '#64b5f6'
        } else if(this.bestBid.id == item.id){
          color = '#64b5f6'
        } else if(this.userData.id == item.user_id){
          color = '#e57373'
        }else {
          color = ''
        }
        return color
      }
  }
}
</script>

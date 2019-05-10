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
		props:['bids'],
    data() {
      return {
        loading : true,
        userData: this.$store.state.auth.userData,
        chartOptions: {
          chart: {
            type: 'column'
          },
          title: {
            text: ''
          },
          subtitle: {},
          xAxis: {
            title: {
              text: 'Ofertas'
            },
            type: 'category'
          },
          yAxis: {
            title: {
              text: 'Precio'
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
            headerFormat: '<span style="f ont-size:11px"></span><br>',
            pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>${point.y}</b><br/>'
          },
          turboThreshold:10000000,
          series: 
            [
              {
                data: []
              },
            ]
          }
        }
    },
    computed: {
      
    },
    mounted(){
      setInterval(()=>{ 
        this.formatBids()
      }, 1500);
    },
    methods:{
      formatBids(){
       this.bids.forEach(element => {
         this.chartOptions.series[0].data.push({name : element.id, y: element.total, color: '#2c7bc4'},)
       });
       this.loading = false
      }
    }
  }
</script>

<template>
  <q-scroll-area id="list-tenders" :style="'width: '+width+'; height: '+height+';'">
    <q-list 
      v-if="products.length"
      separator link no-border class="q-pa-none">
      <!--single-->
      <div v-for="(item, index) in products" :key="index">
        <q-item 
          icon="fa fa-flask" :label="item.name"
          v-if="single !== false"
          :sublabel="(item.concentration)">
          <q-item-side icon="fa fa-flask" color="primary"/>
          <q-item-main :label="item.name" :sublabel="'Concentración ' + item.concentration"/>
          <q-item-side right v-if="false">
            <q-btn icon="launch" flat round color="info"></q-btn>
            <q-btn icon="delete" flat round color="negative" @click="destroy(item.id)"></q-btn>
          </q-item-side>
        </q-item>
        <!-- Dropdwon Item -->
        <q-collapsible 
          v-else :key="index"
          icon="fa fa-flask" :label="item.name"
          :sublabel="'Concentración ' + item.concentration">
          <p v-if="item.slug" class="q-ma-none q-my-xs">{{item.slug}}</p>
          <q-btn label="Ver" icon="launch" flat color="primary" rounded no-caps v-if="false"></q-btn>
        </q-collapsible>
      </div>
    </q-list>
  </q-scroll-area>
</template>

<script>
  import service from 'src/services/products/service'
  import { Dialog } from 'quasar'
    
  export default {
    components: {},
    props: {
      height: {default: '100%'},
      width: {default: '100%'},
      single : {default : false},
      filter: {
        default: () => {
          return []
        }, type: Object
      },
    },
    filters: {
      formatDate: function (value) {
        let d = new Date(value)
        return d ? d.getDay() + '/' + d.getMonth() + '/' + d.getFullYear() : '-'
      }
    },
    created(){
      this.$root.$on("productSaved", this.getData);
    },
    mounted() {
      this.$nextTick(() => {
        this.getData()
      })
    },
    data(){
      return{
        products: {}
      }
    },
    methods: {
      formatDate(date) {
        let d = new Date(date)
        return d ? d.getDay() + '/' + d.getMonth() + '/' + d.getFullYear() : '-'
      },
      getData(){
        this.products = {}
        service.index(this.filter)
        .then(response=>{
          this.products = response.data
          // 10 - 04 - 2019
          this.$root.$emit('loadedMyProducts', response.data)
        })
        .catch(error=>{
          console.warn(error)
        })
      },
      destroy(id){



      },
      handleEventProductSaved(){
        this.getData()
      }
    }
  }
</script>
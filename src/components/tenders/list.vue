<template>
  <div>
    <q-scroll-area id="list-tenders" :style="'width: '+width+'; height: '+height+';'">    
      <q-list 
        v-if="auctions.length"
        separator link no-border class="q-pa-none">
        <!--single-->
        <div v-for="(item, index) in auctions" :key="index">
          <q-item 
            icon="question_answer" :label="item.title"
            v-if="single !== false"
            :sublabel="formatDate(item.date)">
            <q-item-side icon="question_answer" color="primary"/>
            <q-item-main :label="item.title" :sublabel="formatDate(item.started_at)"/>
            <q-item-side right>
              <q-btn icon="launch" flat  color="info" :to="`/licitation/${item.id}/auctions`"></q-btn>
            </q-item-side>
          </q-item>
          <!-- Dropdwon Item -->
          <q-collapsible 
            v-else :key="index"
            icon="question_answer" :label="item.title"
            :sublabel="formatDate(item.started_at)">
            <p v-html="item.description" class="q-mt-lg" align="justify"></p> 
            <q-btn 
              label="Ver mas" 
              icon="launch" 
              flat color="primary" 
              rounded 
              no-caps 
              :to="`/licitation/${item.id}`">
            </q-btn>
          </q-collapsible>
        </div>
      </q-list>
    </q-scroll-area>
    <q-inner-loading :visible="visible">
      <q-spinner size="50px" color="primary"></q-spinner>
    </q-inner-loading>
  </div>
</template>

<script>
  import auctionsService from 'src/services/iauctions/service'

  export default {
    components: {},
    props: {
      items: {
        default: () => {
          return []
        }, type: Array
      },
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
    mounted() {
      this.$nextTick(() => {
        this.getData()
      })
    },
    data(){
      return{
        visible: false,
        auctions: {}
      }
    },
    methods: {
      formatDate(date) {
        let d = new Date(date)
        return d ? d.getDay() + '/' + d.getMonth() + '/' + d.getFullYear() : '-'
      },
      getData(){
        this.visible = true
        auctionsService.index(this.filter)
        .then(response=>{
          this.auctions = response.data
          this.visible = false
        })
        .catch(error=>{
          console.warn(error)
          this.visible = false
        })
      },

    }
  }
</script>

<style lang="stylus">
  @import "~variables";
  #list-tenders
    .q-item-side
      .q-btn
        width max-content
        padding 0 4px
        .q-icon
          font-size 20px

    .q-collapsible
      .q-collapsible-inner
        min-height 80px !important
        padding 20px 6px
        @media only screen and (max-width: $breakpoint-md)
          min-height 60px !important
          padding 10px 5px

        .q-item
          max-height 40px
          padding 0

        .q-icon
          color $primary
          font-size 38px

        .q-item-label, .q-item-sublabel, p
          color $secondary

        .q-collapsible-sub-item
          padding 0px 16px 0px 48px
          font-size 15px

          .q-btn
            padding 0
            font-weight normal

            .q-icon
              font-size 18px !important
              background-color $primary
              border-radius 50%
              color white
              padding 4px
              margin-right 5px
    .q-collapsible, .q-item
      &:hover
        .q-item-label
          color $primary

      &.q-collapsible-opened
        cursor pointer

        .q-item-label
          color $primary
          font-weight bold
</style>



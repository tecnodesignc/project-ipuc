<template>
  <div class="form-user-data col-12 relative-position">
    <div class="form-title">
      <q-icon name="timeline" /> 
      Información Financiera  
    </div>
    <div class="row form-container q-py-md">
      <div class="col-sm-12 q-px-md" >
        <div class="row">

          <div class="item_form col-12 col-md-6 q-px-lg q-mb-md">
            <q-input 
              type="text" 
              float-label="Activos" 
              v-model="revenue"
              :error="errors.revenue.$error"/>
          </div>

          <div class="item_form col-12 col-md-6 q-px-lg q-mb-md">
            <q-input 
              type="text" 
              float-label="Pasivos" 
              v-model="expenses"
              :error="errors.expenses.$error"/>
          </div>

          <div class="item_form col-12 col-md-6 q-px-lg q-mb-md">
            <q-input 
              type="text" 
              float-label="Patrimonio ($)" 
              v-model="patrimony"
              :error="errors.patrimony.$error"/>
          </div>

          <div class="item_form col-12 col-md-6 q-px-lg q-mb-md">
            <q-input 
              type="text" 
              float-label="Otros ingresos ($)" 
              v-model="other_revenue"
              :error="errors.other_revenue.$error"/>
          </div>

          <div class="item_form col-12 col-md-6 q-px-lg q-mb-md">
            <q-input 
              type="text" 
              float-label="Ingresos ($) Mensuales" 
              v-model="monthly_income"
              :error="errors.monthly_income.$error"/>
          </div>

          <div class="item_form col-12 col-md-6 q-px-lg q-mb-md">
            <q-input 
              type="text" 
              float-label="Egresos ($) Mensuales" 
              v-model="monthly_expenses"
              :error="errors.monthly_expenses.$error"/>
          </div>

          <div class="item_form col-12 col-md-12 q-px-lg q-mb-md">
            <q-input 
              type="text" 
              float-label="Concepto otros ingresos" 
              v-model="concept_other_revenue"
              :error="errors.concept_other_revenue.$error"/>
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
    computed:{
      revenue: {
        get(){
          return this.$store.getters.getform.attributes.revenue
        },
        set(value){
           this.$store.dispatch('update_form_revenue', value)
        }
      },
      patrimony: {
        get(){
          return this.$store.getters.getform.attributes.patrimony
        },
        set(value){
           this.$store.dispatch('update_form_patrimony', value)
        }
      },
      expenses: {
        get(){
          return this.$store.getters.getform.attributes.expenses
        },
        set(value){
           this.$store.dispatch('update_form_expenses', value)
        }
      },
      other_revenue: {
        get(){
          return this.$store.getters.getform.attributes.other_revenue
        },
        set(value){
           this.$store.dispatch('update_form_other_revenue', value)
        }
      },
      concept_other_revenue: {
        get(){
          return this.$store.getters.getform.attributes.concept_other_revenue
        },
        set(value){
           this.$store.dispatch('update_form_concept_other_revenue', value)
        }
      },
      monthly_income: {
        get(){
          return this.$store.getters.getform.attributes.monthly_income
        },
        set(value){
           this.$store.dispatch('update_form_monthly_income', value)
        }
      },
      monthly_expenses: {
        get(){
          return this.$store.getters.getform.attributes.monthly_expenses
        },
        set(value){
           this.$store.dispatch('update_form_monthly_expenses', value)
        }
      },
    }
  }
</script>

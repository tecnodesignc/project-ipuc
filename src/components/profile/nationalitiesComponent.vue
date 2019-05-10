<template>
	<div class="form-user-data col-12 relative-position">
		<div class="form-title">
		  <q-icon name="account_balance" /> Nacionalidades 
		  <q-btn icon="add" color="primary" @click="addNationality" size="sm" label="Agregar" class="float-right" rounded/>
		</div>
		<div class="row form-container q-py-md">
		  <div class="col-12 q-px-md">
		    <table class="q-table">
		      <tbody>
		        <tr v-for="(item, index) in nationalities" :key="index">
		          <td width="1">
		            <q-btn icon="delete" color="red" size="sm" @click="removeNationality(item, index)" round/>
		          </td>
		          <td>
		            <q-input type="text" float-label="Nacionalidad" v-model="item.nationality"/>
		          </td>
		        </tr>
		      </tbody>
		    </table>
		  </div> 
		</div>
	</div>
</template>

<script>
	export default {
		methods:{
      addNationality(){
        this.nationalities.push(
          {nationality: ''}
        )
      },
      removeNationality(item, index){
        this.nationalities.splice(index, 1)
      },
		},
		computed:{
			 nationalities: {
        get(){
          return this.$store.getters.getform.attributes.nationalities
        },
        set(value){
           this.$store.dispatch('update_form_nationalities', value)
        }
      },
		}
	}
</script>
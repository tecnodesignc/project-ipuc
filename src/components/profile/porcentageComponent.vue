<template>
	<q-progress :percentage="porcentage" color="red" animate stripe height="20px" stripe style="margin-bottom: 10px; border-radius: 5px"/>
</template>

<script>
	export default{
		props:['data'],
		computed: {
			porcentage(){
        let obj = this.data
        let calculable = 0
        let total = 0
        for (const prop in obj) {
          if ( prop != 'id' &&  
            prop != 'type_person' &&  
            prop != 'percentage' &&
            prop != 'nationalities' &&  
            prop != 'occupations' &&  
            prop != 'table_shareholders'  &&  
            prop != 'financial_products'  && 
            prop != 'admin_public_resource'  && 
            prop != 'recognition_public'  && 
            prop != 'link_person_publicly_exposed'  && 
            prop != 'degree_public_power' && 
            prop != 'authorize_processing_personal_data' && 
            prop != 'authorize_contactme_send_information' &&
            prop != 'entailment' &&
            prop != 'entailment_other' &&
            prop != 'principal_occupation' &&
            prop != 'other_principal_occupation' &&

            prop != ( obj['type_person'] == 0 ? 'business_name' : '')&&
            prop != ( obj['type_person'] == 0 ? 'nit' : '')&&
            prop != ( obj['type_person'] == 0 ? 'dv' : '')&&
            prop != ( obj['type_person'] == 0 ? 'type_company' : '')&&
            prop != ( obj['type_person'] == 0 ? 'economic_activity' : '')&&
            prop != ( obj['type_person'] == 0 ? 'economic_activity_other' : '')&&
            prop != ( obj['type_person'] == 0 ? 'table_shareholders' : '')&&            
            prop != ( obj['type_person'] == 0 ? 'authorize_contactmoffice_phoneebranch_addres_send_information' : '')&&
            prop != ( obj['type_person'] == 0 ? 'authorize_contactme_send_information' : '')&&

            prop != ( obj['type_person'] == 1 ? 'date_birth' : '')&&
            prop != ( obj['type_person'] == 1 ? 'place_birth' : '')&&
            prop != ( obj['type_person'] == 1 ? 'genre' : '')&&
            prop != ( obj['type_person'] == 1 ? 'home_addres' : '')&&
            prop != ( obj['type_person'] == 1 ? 'home_city' : '')&&
            prop != ( obj['type_person'] == 1 ? 'home_department' : '')&&
            prop != ( obj['type_person'] == 1 ? 'phone' : '')&&
            prop != ( obj['type_person'] == 1 ? 'mobile' : '')&&
            prop != ( obj['type_person'] == 1 ? 'ciiu' : '')&&
            //prop != ( obj['type_person'] == 1 ? 'secondary_occupation' : '')&&
            prop != ( obj['type_person'] == 1 ? 'ciiu2' : '')&&
            prop != ( obj['type_person'] == 1 ? 'addres' : '')&&
            prop != ( obj['type_person'] == 1 ? 'phone2' : '')&&
            prop != ( obj['type_person'] == 1 ? 'type_products' : '')
            ) {
            total ++ 
            obj[prop] ? calculable ++ : ''
          }
        }
        return calculable / total * 100
      }
		}
	}
</script>
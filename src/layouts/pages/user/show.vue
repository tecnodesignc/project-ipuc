<template>
	<div>
		<pre>{{datos.attributes}}</pre>
	</div>
</template>

<script>
	import service  from 'src/services/pajonales';
	export default {
		data(){
			return{
				datos: ''
			}
		},
		computed: {
      formData: {
        get(){
          return this.$store.getters.getform
        },
      },
    },
    mounted(){
    	this.getDataProfile()
    },
    methods:{
    	getDataProfile(){
    		service.show(1)
    		.then(response=>{
    			this.datos = response
    		})
    	}
    }
	}
</script>
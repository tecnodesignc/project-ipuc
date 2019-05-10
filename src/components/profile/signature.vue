<template>
  <div>
    <div class="form-user-data col-12 relative-position">
  		<div class="form-title q-title">
    		FIRMA
  		</div>
	  	<div class="row form-container q-py-md">
				<div class="col-12 order-xs-last">
					<div class="row">
            <div class="item_form col-12 col-md-12 q-px-lg q-mb-md">
              <p>Como constancia de haber leído, entendido y aceptado lo anterior, 
                declaro que la información que he suministrado es exacta en todas 
                sus partes y firmo el presente documento.																									
              </p>
              <VueSignaturePad
                width="100%"
                height="500px"
                ref="signaturePad"
                style="border: 1px solid #c4c4c4"/>
              <q-btn-group rounded class="q-mt-lg">
                <q-btn rounded label="Guardar" @click="save" color="primary"/>
                <q-btn rounded label="Deshacer" @click="undo" color="orange"/>
              </q-btn-group>
            </div>
          </div>
				</div>
			</div>
		</div>
  </div>
</template>

<script>
  import VueSignaturePad from 'vue-signature-pad';
  export default {
    components:{
      VueSignaturePad
    },
    methods: {
      undo() {
        this.$refs.signaturePad.undoSignature();
      },
      save() {
        const { isEmpty, data } = this.$refs.signaturePad.saveSignature();
        console.log(isEmpty);
        console.log(data);
      }
    }

  }
</script>


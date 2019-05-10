<template>
  <div id="infoUser" class="row">
    <!--info-->
    <div class="text-right inline-block q-mr-md">
      <br>
      <div class="q-title q-mb-xs">{{userData.fullName}}</div>
      <div class="q-subheading q-mb-xs hidden" v-if="$q.platform.is.desktop">[ 1115555444 ]</div>
      <div class="q-subheading q-mb-xs" v-if="$q.platform.is.desktop">{{userData.email}}</div>
      <div class="text-white text-secondary q-py-xs q-px-md float-right q-caption"
           style="width: max-content" v-if="$q.platform.is.desktop">
        {{userData.roles[0].name}}
      </div>
    </div>
    <!---Profile picture-->
    <div class="inline-block">
      <q-icon name="fas fa-user-circle" :size="$q.platform.is.desktop ? '100px' : '22px'"></q-icon>
    </div>
  </div>
</template>
<script>
  export default {
    props: {},
    components: {},
    watch: {},
    mounted() {
      this.$nextTick( () => {
        
      })
    },
    data() {
      return {
        userData: this.$store.state.auth.userData
      }
    },
    methods: {}
  }
</script>
<style lang="stylus">
  @import "~variables";
</style>
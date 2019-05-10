<template>
  <q-layout view="lHh LpR lFr" id="pageMaster">

    <!-- === HEADER === -->
    <q-layout-header class="no-shadow">
      <q-toolbar color="primary" :style="$q.platform.is.desktop ? 'min-height: 150px !important' : ''">
        <!--= BUTTON MENU =-->
        <q-btn flat dense round aria-label="Menu"
               :class="$q.platform.is.desktop ? 'q-ml-lg' : ''"
               @click="leftDrawerOpen = !leftDrawerOpen">
          <q-icon name="menu" :size="$q.platform.is.desktop ? '36px' : ''"/>
        </q-btn>
        <!--Title-->
        <q-toolbar-title></q-toolbar-title>
        <!--Info user-->
        <info-user></info-user>
      </q-toolbar>
    </q-layout-header>

    <!-- === MENU === -->
    <q-layout-drawer id="menu_master"
                     v-model="leftDrawerOpen"
                     :content-class="'bg-grey-2'"
    >
      <q-list no-border link inset-delimiter class="q-pa-none">
        <!-- === LOGO === -->
        <q-list-header class="text-center flex flex-center" style="min-height: 150px">
          <router-link :to="{ name: 'app.home'}">
            <a>
              <img src="assets/image/logo-inline.png">
            </a>
          </router-link>
        </q-list-header>

        <!--= items Menu =-->
        <menu-list :menu="menu"></menu-list>
      </q-list>
    </q-layout-drawer>

    <!-- === ROUTER VIEW === -->
    <q-page-container>
      <router-view v-if="loadedApp" />
    </q-page-container>

    <!-- === BACK TO TOP === -->
    <q-page-sticky position="bottom-right" :offset="[18, 18]">
      <q-btn
        v-back-to-top.animate="{offset: 500, duration: 200}"
        round
        color="primary"
        icon="keyboard_arrow_up"
      />
    </q-page-sticky>

  </q-layout>
</template>

<script>
  import menuList from 'src/components/master/recursiveItem'
  import infoUser from 'src/components/quser/infoUser'

  //Services
  import appServices from 'src/services/application/index'

  export default {
    meta() {
      return {title: env('PROJECT_NAME')}
    },
    components: {
      menuList,
      infoUser
    },
    mounted() {
      this.$nextTick(async function () {
        //Call to config when is mounted
        let params = this.$route.params
        if (!this.$route.params.fromConfig)
          this.$router.push({name: 'app.config', params: {refresh: 1}})
        this.loadedApp = true//Load route view
      })
    },
    watch: {
      $route(to, from) {
        this.checkVersionApp(to)
      }
    },
    data() {
      return {
        leftDrawerOpen: true,
        drawerState: true,
        menu: config('sidebar'),
        loadedApp : false
      }
    },
    methods: {
      toggleFullscreen() {
        this.$q.fullscreen.toggle()
      },
      //Check if app is update
      checkVersionApp(toRoute) {
        if (toRoute.name != 'config') {
          let currentVersion = parseInt(config('app.version').split('.').join(''))
          appServices.crud.index('apiRoutes.profile.appVersion', {remember: false}).then(response => {
            let version = parseInt(response.data.split('.').join(''))
            if (currentVersion < version) {
              this.$router.push({name: 'app.config'})
            }
          })
        }
      }
    }
  }
</script>

<style lang="stylus">
  @import "~variables";
  #pageMaster
    .q-toolbar
      background linear-gradient(to right, rgba(0, 159, 218, 1) 0%, rgba(0, 41, 151, 1) 50%, rgba(0, 159, 218, 1) 100%) !important

  .container
    color #777777

  .offers
    color #ff8000

  .offers-sec
    color $primary

    span
      color #777777
      font-size 13px

  .round-orange
    background-color $tertiary
    color white
    border-radius 50%

  .round-green
    background-color $secondary
    color $neutral
    border-radius 50%

  .round
    height 55px
    width 55px
    line-height 65px
    border-radius 100%
    color $neutral
    text-align center
    margin 0 auto

  .auction-details
    .col-1
      border-right 1px solid $secondary

  .days
    padding 10px 20px
    border 1px solid $primary
    border-radius 6px
    background-color #E1EAE7

</style>

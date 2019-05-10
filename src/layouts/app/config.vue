<template>
  <q-page class="flex flex-center">
    <!--=== Loading ===-->
    <div class="text-center full-height q-pa-lg">
      <q-spinner-gears color="teal-4" size="80px"/>
      <h6 class="q-ma-none q-mt-md text-secondary">
        Loading ({{progressPercentage}}%)
      </h6>
      <!--Bar Loading-->
      <q-progress :percentage="progressPercentage" class="q-mt-sm"/>
    </div>

    <!--=== Dialog to select department and/or role ===-->
    <q-dialog
      v-model="dialog.roleAndDepartment.show"
      stack-buttons prevent-close
      ok="save" @ok="setRoleAndDepartment(true)"
    >
      <!-- This or use "title" prop on <q-dialog> -->
      <div slot="title" class="q-title text-primary">
        Login as
        <q-icon name="fas fa-user-check"></q-icon>
      </div>

      <!-- This or use "message" prop on <q-dialog> -->
      <div slot="body" style="overflow: hidden">
        <q-icon name="fas fa-user-circle" class="q-mr-sm"></q-icon>
        Role
        <q-select :options="$store.getters['auth/userRolesSelect']" filter
                  v-model="dialog.roleAndDepartment.roleId" class="full-width">
        </q-select>
        <br>
        <q-icon name="fas fa-globe" class="q-mr-sm"></q-icon>
        Department
        <treeselect
          :clearable="false"
          :append-to-body="true"
          :options="$store.getters['auth/userDepartmentsSelect']"
          value-consists-of="BRANCH_PRIORITY"
          v-model="dialog.roleAndDepartment.departmentId"
          placeholder=""
          style="max-width: 232px"
        />
      </div>
    </q-dialog>

    <!--=== Dialog to Update APP ===-->
    <q-dialog
      v-model="dialog.updateApp"
      stack-buttons
      prevent-close
      ok="update"
      @ok="refreshSite()"
    >
      <!-- This or use "title" prop on <q-dialog> -->
      <span slot="title" class="text-primary">
				<q-icon name="fas fa-gift" class="q-mr-md"></q-icon>
				Update available!
				<q-icon name="fas fa-gift" class="q-ml-md"></q-icon>
			</span>

      <!-- This or use "message" prop on <q-dialog> -->
      <span slot="message">
				Your browser will be refreshed
			</span>
    </q-dialog>

    <!--=== Dialog to logout user without role or department ===-->
    <q-dialog
      v-model="dialog.withOutRoleOrDepartment"
      stack-buttons
      prevent-close
      ok="Close"
      @ok="$router.push({name:'auth.logout'})"
    >
      <!-- This or use "title" prop on <q-dialog> -->
      <span slot="title" class="q-title text-negative">
				<q-icon name="fas fa-times"></q-icon>
				Role or Department not assigned...
			</span>

      <!-- This or use "message" prop on <q-dialog> -->
      <span slot="message">
				You do not have permission to enter the app
				<br>close in : {{dialog.logout.countDown}} seconds
			</span>
    </q-dialog>

    <!--=== Dialog to logout user ===-->
    <q-dialog
      v-model="dialog.logout.show"
      stack-buttons
      prevent-close
      ok="Close"
      @ok="$router.push({name:'auth.logout'})"
    >
      <!-- This or use "title" prop on <q-dialog> -->
      <span slot="title" class="text-negative">
				<q-icon name="fas fa-times"></q-icon>
				Access denied
			</span>

      <!-- This or use "message" prop on <q-dialog> -->
      <span slot="message">
				You do not have permission to enter the app
				<br>close in : {{dialog.logout.countDown}} seconds
			</span>
    </q-dialog>
  </q-page>
</template>
<script>
  //Plugins
  import axios from 'axios'
  import {notification} from 'src/plugins/notification'

  //Services
  import auth from '@imagina/quser/_plugins/auth' //Middleware auth
  import profileServices from '@imagina/quser/_services/profile'
  import appServices from 'src/services/application/index'

  /*Components*/
  import Treeselect from '@riophae/vue-treeselect'
  import '@riophae/vue-treeselect/dist/vue-treeselect.css'

  export default {
    props: {},
    components: {Treeselect},
    beforeRouteEnter(to, from, next) {
      next(vm => {
        vm.fromRoute = from
      })
    },
    watch: {
      dialog: {
        handler: function (value, oldVal) {
          if (value.logout.countDown <= 0)
            this.$router.push({name: 'auth.logout'})
        },
        deep: true
      },
    },
    mounted() {
      this.$nextTick(function () {
        this.setRoleAndDepartment()
      })
    },
    data() {
      return {
        //Percentage of config
        progressPercentage: 1,
        percentageChangeNumber: 5,
        currentRangePercentage: 1,
        //Dialogs
        dialogUpdateApp: false,
        dialog: {
          updateApp: false,
          roleAndDepartment: {
            show: false,
            roleId: false,
            departmentId: false
          },
          logout: {show: false, countDown: 5},
          withOutRoleOrDepartment : false
        },
        requestStatus: {
          departments: false,
          branchOffices: false,
          sources: false,
          sourceCategories: false,
          icommerceCategories: false
        }
      }
    },
    methods: {
      //Set departments and roles to options
      async setRoleAndDepartment(fromUser = false) {
        const userData = await this.$helper.storage.get.item('userData')//Get user data from store

        const roles = userData.roles//Get roles from user
        const departments = userData.departments//Get departments from user
        let roleUser = await this.$helper.storage.get.item('auth.role.id')//Get role form storage
        let departmentUser = await this.$helper.storage.get.item('auth.department.id')//Get department form storage

        //Check if user has a Role and a Department assigned
        if(!roles.length || !departments.length){
          this.dialog.withOutRoleOrDepartment = true
          setInterval(() => {
            this.dialog.logout.countDown -= 1
          }, 1000)
          return false
        }

        //Rol selected
        roleUser = fromUser ? this.dialog.roleAndDepartment.roleId :
          (roleUser ? roleUser : roles[0].id)
        //Department selected
        departmentUser = fromUser ? this.dialog.roleAndDepartment.departmentId :
          (departmentUser ? departmentUser : departments[0].id)

        if (roleUser && departmentUser) {//Config rol and department
          //Save in storage
          await this.$helper.storage.set('auth.role.id', roleUser)
          await this.$helper.storage.set('auth.department.id', departmentUser)
          //Set in axios how default params
          axios.defaults.params = {
            setting: {departmentId: departmentUser, roleId: roleUser}
          }
          this.checkVersionApp()//check verison of app
        }
      },

      //Check if app is updated
      async checkVersionApp() {
        //Get versión of app
        let verisonApp = parseInt(config('app.version').split('.').join(''))
        //Get version from backend
        let currentVersion = await appServices.crud.index('apiRoutes.profile.appVersion', {remember: false})
        currentVersion = parseInt(currentVersion.data.split('.').join(''))
        //update progress percentage
        this.setRandompercentage()
        //Check version
        if (verisonApp >= currentVersion) {
          this.configAppData()
        } else {
          this.dialog.updateApp = true
        }
      },

      //Config data from APP
      async configAppData() {
        const route = this.$router//get route
        const queryFromRoute = this.$route.query
        this.setRandompercentage() //update progress percentage

        //Reset storage of APP
        if (!this.$route.params.refresh) {
          await this.$store.dispatch('app/RESET_STORE')//Reset Store
          await this.$store.dispatch('auth/AUTH_UPDATE')//Reset cache
          if (navigator && navigator.serviceWorker) {//Reset Service Worker
            //navigator.serviceWorker.controller.postMessage({
            //  msg: "clearCache"
            //});
          }
        }

        //Set settings and permissions of user
        await this.$store.dispatch('auth/SET_PERMISSIONS');
        this.setRandompercentage() //update progress percentage
        await this.$store.dispatch('auth/SET_SETTINGS');
        this.setRandompercentage() //update progress percentage

        //Check if user has permission of login
        if (!auth.hasAccess('profile.api.login')) {
          this.dialog.logout.show = true
          setInterval(() => {
            this.dialog.logout.countDown -= 1
          }, 1000)
          return false
        }

        //Get Departments
        if (auth.hasAccess('profile.departments.index'))
          await this.$store.dispatch('auth/GET_DEPARTMENTS')

        if (env('PUSHER_ACTIVE') == 'true') notification.global()//Init Global Broadcast Channel

        this.redirectToroute()
      },

      //Redirect after config data from page
      redirectToroute() {
        this.setRandompercentage() //update progress percentage

        //Redirect route
        this.removeQueries()//Remove queries form URL

        //Check if request permission to go to route
        let permissionRoute = (this.fromRoute && this.fromRoute.meta) ?
          this.fromRoute.meta.permission : null

        //Default route to redirect
        let route = {
          params: Object.assign({fromConfig: 1}, (this.fromRoute ? this.fromRoute.params : {})),
          query: Object.assign({}, (this.fromRoute ? this.fromRoute.query : {}))
        }

        //If has permission to route, return to last page
        if(!this.fromRoute.name) route.name = 'app.home'
        else if(!permissionRoute) route.name = this.fromRoute.name
        else if(auth.hasAccess(permissionRoute)) route.name = this.fromRoute.name
        //Redirect
        this.$router.push(route)
      },

      //remove querys from route
      removeQueries() {
        let query = Object.assign({}, this.$route.query);
        delete query.refresh;
        delete query.getData;
        this.$router.replace({query});
      },

      //Set random percentage of load
      setRandompercentage() {
        let range = Math.round(100 / this.percentageChangeNumber)//Get range bettewn change of porcentage
        let fromNumber = this.currentRangePercentage//Get from number for this change percentage
        let untilNumber = (fromNumber + range)//Get until number for this change percentage
        untilNumber >= 100 ? untilNumber = 99 : false//check that until number isn't higher that 100
        let randomPercentage = Math.floor(Math.random() * (untilNumber - fromNumber + 1) + fromNumber)//Get random percentange

        this.progressPercentage = randomPercentage
        this.currentRangePercentage = untilNumber
      },

      //Refresh site
      refreshSite() {
        window.location.reload(false)
        this.redirectToroute()
      },
    }
  }
</script>
<style lang="stylus">
  @import "~variables";

</style>
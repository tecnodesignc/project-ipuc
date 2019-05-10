<template>
  <q-page id="pageLogin" class="flex flex-center">

    <div class="row shadow-2 q-mx-md" style="width: 350px">
      <div id="form-login-right"
           class="col-12"
           style="padding: 30px 25px">
        <h4 class="text-primary text-center q-mt-none q-mb-md q-pb-sm"
            style="border-bottom: 2px solid #f1f1f1; font-size: 34px">
          <img src="/statics/logo-inline.png" alt="">
        </h4>
              <!-- USER -->
              <q-field
                :error="$v.form.first_name.$error"
                error-label="This field is required"
                class="q-mb-md">
                <q-input name="first_name"
                  autofocus
                  autocomplete="off"
                  v-model="form.first_name"
                  type="text"
                  :before="[{icon: 'person'}]"
                  float-label="First Name"
                />
              </q-field>
              <q-field
                :error="$v.form.last_name.$error"
                error-label="This field is required"
                class="q-mb-md">
                <q-input name="last_name"
                  autofocus
                  autocomplete="off"
                  v-model="form.last_name"
                  type="text"
                  :before="[{icon: 'person'}]"
                  float-label="Last Name"
                />
              </q-field>

              <q-field
                :error="$v.form.email.$error"
                error-label="This field is required"
                class="q-mb-md">
                <q-input name="email"
                  autofocus
                  autocomplete="off"
                  v-model="form.email"
                  type="text"
                  :before="[{icon: 'email'}]"
                  float-label="Email"
                />
              </q-field>

              <q-field
                :error="$v.form.password.$error"
                error-label="This field is required"
                class="q-mb-md">
                <q-input name="password"
                  autofocus
                  autocomplete="off"
                  v-model="form.password"
                  type="password"
                  :before="[{icon: 'lock'}]"
                  float-label="Password"
                />
              </q-field>

              <q-field
                :error="$v.form.password_confirmation.$error"
                error-label="This field is required"
                class="q-mb-md">
                <q-input name="email"
                  autofocus
                  autocomplete="off"
                  v-model="form.password_confirmation"
                  type="password"
                  :before="[{icon: 'lock'}]"
                  float-label="Password Confirmation"/>
              </q-field>      

              <div class="text-center q-pt-lg">
                <q-btn :loading="loading_login"
                       color="amber-9" name="submit"
                       class="full-width"
                  @click="registerUser()">
                  Registar
                  <span slot="loading">
                      <q-spinner-hourglass class="on-left"/>
                      VALIDATING...
                    </span>
                </q-btn>
              </div>
          <div class="text-center q-mt-lg">
              <q-btn class="full-width"
                     @click="login()"
                     color="green-4">
                  Iniciar Sesión
              </q-btn>
          </div>
            </div>
          </div>
        </q-page>
</template>

<script>
  import userService from 'src/services/users/service'
  import {required, email, numeric, minLength} from 'vuelidate/lib/validators';
  import {alert} from '@imagina/qhelper/_plugins/alert'

  export default {
    data() {
      return {
        loading_login: false,
        form: {
          last_name: '',
          first_name: '',
          email: '',
          password: '',
          password_confirmation: '',
        }
      }
    }, 
    validations: {
      form: {
        last_name: {required},
        first_name: {required},
        email: {required, email},
        password: {required},
        password_confirmation: {required},
      }
    },
    methods:{
      registerUser(){
        this.$v.$touch();
        if (this.$v.$error) {
          alert.error('Please review fields again.', 'bottom');
          return
        }
        let data = {attributes:this.form}
        userService.register(data)
        .then(response=>{
            alert.success('Usuario creado favor verifica correo electronico para activar', 'bottom');
          this.$router.push({name:"auth.login"})
        })
        .catch(error=>{
            alert.error('Please review fields again.', 'bottom');
        })
      },
      login(){
          this.$router.push({name:"auth.login"})
      }
    }
  }
</script>
<style lang="stylus">
  @import "~variables";
  #pageLogin
    .q-btn
      min-width 140px !important
      #form-login-right
          min-height 150px
          .bg-color
              background-color $primary
              height 100%
              width 100%
          img
              max-width 200px
</style>

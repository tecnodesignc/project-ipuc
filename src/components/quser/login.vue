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
                        :error="$v.form.username.$error"
                        error-label="Este Campo es requerido"
                >
                    <q-input name="username"
                             autofocus
                             autocomplete="off"
                             v-model="form.username"
                             type="text"
                             :before="[{icon: 'person'}]"
                             @keyup.enter="authenticate()"
                             float-label="Correo electrónico"
                    />
                </q-field>
                <!-- PASS -->
                <q-field
                        :error="$v.form.password.$error"
                        error-label="Este Campo es requerido"
                >
                    <q-input v-model="form.password"
                             type="password"
                             name="password"
                             :before="[{icon: 'lock'}]"
                             @keyup.enter="authenticate()"
                             float-label="Contraseña"
                    />
                </q-field>

                <!--=== LOGIN ===-->
                <div class="text-center">
                    <q-btn :loading="loading_login"
                           color="amber-9" name="submit"
                           class="full-width"
                           @click="authenticate()">
                        Iniciar Sesión
                        <span slot="loading">
                <q-spinner-hourglass class="on-left"/>
                Validando...
              </span>
                    </q-btn>
                </div>

                <div class="text-center q-mt-lg">
                    <q-btn :loading="loading_login"
                           class="full-width"
                           @click="register()"
                           color="green-4">
                        Registro
                    </q-btn>
                </div>

            </div>
        </div>
    </q-page>
</template>

<script>
    //Plugins
    import {required, email, numeric, minLength} from 'vuelidate/lib/validators';
    //Services
    import authService from '@imagina/quser/_services/profile/index';
    export default {
        data() {
            return {
                form: {
                    username: '',
                    password: ''
                },
                rememberData: true,
                loading_login: false,
                inRequest : false
            }
        },
        validations: {
            form: {
                username: {required},
                password: {required}
            }
        },
        methods: {
            async authenticate() {
                if(!this.inRequest){
                    this.$v.$touch();
                    if (!this.$v.$error) {
                        this.inRequest = true
                        this.loading_login = true;
                        const {username, password} = this.form;
                        this.$store.dispatch("auth/AUTH_REQUEST", {username, password}).then((response) => {
                            this.loading_login = false;
                            this.inRequest = false
                            this.$router.push({name:'app.config'})
                        }).catch(error => {
                            this.loading_login = false;
                            this.inRequest = false
                        });
                    }
                }
            },
            register(){
                this.$router.push({name:"auth.register"})
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
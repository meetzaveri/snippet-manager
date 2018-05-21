<template>
  <div>
      <div class="app flex-row align-items-center" style="margin-top:-55px;">
        <div class="container">
          <b-row class="justify-content-center">
            <b-col md="8">
              <b-card-group>
                <b-card no-body class="p-4">
                  <b-card-body>
                    <h1>Login</h1>
                    <p class="text-muted">Sign In to your account</p>
                    <form @submit.prevent="validateBeforeSubmit">
                      
                      <b-input-group class="mb-4">
                        <div class="input-group-prepend"><span class="input-group-text"><i class="icon-user"></i></span></div>
                        <input type="text" name="email" v-validate= "'required|email'" v-model="email" class="form-control" placeholder="email">
                      </b-input-group>
                      <b-btn v-b-tooltip.hovershow variant="danger" v-show="errors.has('email')">{{ errors.first('email') }}</b-btn>
                      
                      <b-input-group class="mb-4">
                        <div class="input-group-prepend"><span class="input-group-text"><i class="icon-lock"></i></span></div>
                        <input type="password" name="password" v-validate= "'required'" v-model="password" class="form-control" placeholder="Password" >
                      </b-input-group>
                      <b-btn v-b-tooltip.hovershow variant="danger" v-show="errors.has('password')">{{ errors.first('password') }}</b-btn>
                      
                      <b-row>
                        <b-col class="mb-4" cols="3"><b-button variant="primary" class="px-4" type="submit">Login</b-button></b-col>
                        <b-col class="mb-4" cols="2"></b-col>
                        <!-- <b-col  cols="7" class="text-right mb-4">
                          <b-button variant="link" class="px-0" ><router-link to="/forgotpassword">Forgot password? </router-link></b-button>
                        </b-col> -->

                        <b-row>
                          <b-col  cols="4" class=" mb-4">
                            <b-button variant="link" class="mb-3" ><router-link to="/register">Sign Up Here</router-link></b-button>
                          </b-col>
                        </b-row>
                      </b-row>
                    </form>
                  </b-card-body>
                </b-card>
              </b-card-group>
            </b-col>
          </b-row>
        </div>
      </div>
  </div>
</template>


<script>
import API,{ ApiCall } from '../api/api.js';

export default {
  name: 'Login',
  beforeCreate (){
    localStorage.removeItem('token');
  },
  data () {
    return {
      email: '',
      password: '',
      userLoggedIn: this.$store.state.userLoggedIn,
      newPassword : null
    }
  },
  methods: {
    validateBeforeSubmit () {
      var email = this.email
      var password = this.password
      // Login API to verify user's email and password and perform actual login action
      this.$validator.validateAll().then((result) => {
        if (result) {
            // Login API to verify user's email and password and perform actual login action
          ApiCall(API.login,'POST',{email,password}).then((data) =>{
            console.log('Data',data);
            localStorage.setItem('token',data.token);
            this.$store.commit('setUser', { isLoggedIn: true,email:email});
            setTimeout(()=>{this.$router.push('/');}
            ,0); 
            this.$router.push('/');
          })
          .catch((err) =>{
            console.log('Err:',err);
            this.$toasted.show('Err:' + err)
          })
        } else {
          this.$toasted.show('Enter all fields correctly')
        }
      })
    },
  }
}
</script>

<style scoped>
    .mb-4{
        margin-top: 1.5rem !important;
        margin-bottom: 0 !important;
    }
</style>

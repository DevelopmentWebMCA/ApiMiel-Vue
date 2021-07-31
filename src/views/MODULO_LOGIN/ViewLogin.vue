<template>
  <div >

    <!-- Page content -->
    <b-container class="contenedor">
      <b-row class="justify-content-center" >

        <div class="login">
        <b-row>
          <b-col style="background-color:#FFF6D4;" ><br><br><br>
            <img src="img/brand/green2.png"  class="img">
          </b-col>
          <b-col style="background-color:#EB904D;"><br><br><br>
          <div class="justify text-center">
          <h1 style="color:white;">¡Bienvenido!</h1>
                      <img src="img/brand/user.png" width="80px" height="80px">
          </div><br>
                          <validation-observer v-slot="{handleSubmit}" ref="formValidator">
                <b-form role="form" @submit.prevent="handleSubmit(onSubmit)">
                  <base-input alternative
                              class="mb-3"
                              name="usuario"
                              :rules="{required: true, email: false}"
                              prepend-icon="fas fa-user"
                              placeholder="Usuario"
                              v-model="nombreUsuario">
                  </base-input>
<!-- En :rules min:6 se puede definir la cantidad de caracteres minima para ingresar -->
                  <base-input alternative
                              class="mb-3"
                              name="contrasena"
                              :rules="{required: true, min: 6}"
                              prepend-icon="ni ni-lock-circle-open"
                              type="password"
                              placeholder="Contraseña"
                              v-model="contrasenia">
                  </base-input>

                  <div class="text-center">
                    <b-button  pill  native-type="submit" v-on:click="login()" class="my-4" style="background-color:#FFD875; color:white;">Acceder</b-button>
                  </div>
                </b-form>
              </validation-observer><br>
          </b-col>
        </b-row>
        </div>
      </b-row>
    </b-container>
  </div>
</template>
<script>

import axios from 'axios'
  export default {
    data() {
      return {

        auth: {
          nombreUsuario: '',
          contrasenia: '',
        }



      };
    },
    methods: {


      login(){
        var session_url = 'http://localhost:9090/';

        axios.post(session_url, {

          headers : {
            "Accept": "application/json",
            "Content-Type": "application/json"
          }
        }, {
          auth: {
            username: this.nombreUsuario,
            password: this.contrasenia
          }
        }).then(function(response) {
        }).catch(function(error) {
          if(error.message === "Request failed with status code 401"){
            alert("Datos incorrectos");
          }else{
            //this.$router.push("/asociaciones");

            window.location = '/#/asociaciones'

          }

        });
              },

    }
          };
</script>
<style scoped>

.img {

  width:650px;
  height:320px;
}
@media (max-width: 768px) {
    .img {
          width:300px;
          height:200px;
    }

    .login

    {
      width: 300px;
    }

    .contenedor{

      margin-top: 0px;
    }
}
</style>

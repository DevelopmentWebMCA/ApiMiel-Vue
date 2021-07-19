<template>
  <div>

    <!-- Page content -->
    <b-container>
      <b-row class="justify-content-center" >

        <div>
        <b-row>
          <b-col style="background-color:#FFF6D4;" ><br><br><br>
            <img src="img/brand/green.png" width="650px" height="320px">
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
                              :rules="{required: true, email: true}"
                              prepend-icon="fas fa-user"
                              placeholder="Usuario"
                              v-model="model.email">
                  </base-input>

                  <base-input alternative
                              class="mb-3"
                              name="contrasena"
                              :rules="{required: true, min: 6}"
                              prepend-icon="ni ni-lock-circle-open"
                              type="password"
                              placeholder="Contraseña"
                              v-model="model.password">
                  </base-input>

                  <div class="text-center">
                    <b-button  pill  native-type="submit" class="my-4" style="background-color:#FFD875; color:white;">Acceder</b-button>
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
  export default {
    data() {
      return {
        model: {
          email: '',
          password: '',
        }
      };
    },
    methods: {
      onSubmit() {
        // this will be called only after form is valid. You can do api call here to login
      }
    }
  };
</script>

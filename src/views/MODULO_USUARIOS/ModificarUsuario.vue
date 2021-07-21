<template>
  <div>
    <div
      class="header pb-8 pt-5 pt-lg-8 d-flex align-items-center profile-header"
      style="
        min-height: 600px;
        background-size: cover;
        background-position: center top;
      "
    >
      <b-container fluid>
        <b-alert
        :show="dismissCountDown"
        dismissible
        fade
        variant="success"
        class="position-fixed fixed-top m-0 rounded-0"
        @dismiss-count-down="countDownChanged">
        Usuario guardado correctamente
      </b-alert>
        <b-row>
          <b-col>
            <h1>Usuarios</h1>
          </b-col>
        </b-row>

        <b-jumbotron
          fluid
          bg-variant="white"
          class="shadow-lg p-5 mb-5 bg-white rounded"
        >
          <h2 class="text-center fontLabel">Modificar Usuario</h2>
          <hr class="mt-2 separador">
          <b-form v-if="show">
            <b-container>
              <b-row>
                <b-col cols= "12" lg="6" xl="6">
                  <b-form-group
                    id="input-group-name"
                    label="Nombre Completo:"
                    label-for="input-name"
                    class="fontLabel"
                  >
                    <b-form-input
                      id="input-name"
                      v-model="users.nombreUsuario"
                      class="fontInput"
                    ></b-form-input>
                  </b-form-group>
                </b-col>
                <b-col>
                  <b-form-group
                    id="input-group-correo"
                    label="Correo electrónico:"
                    label-for="input-correo"
                    class="fontLabel"
                  >
                    <b-form-input
                      id="input-correo"
                      class="fontInput"
                      v-model="users.correoElectronico"
                      type="email"
                      required
                    ></b-form-input>
                  </b-form-group>
                </b-col>
              </b-row>

              <b-row>
                <b-col cols= "12" lg="6" xl="6">
                  <b-form-group
                    @submit.stop.prevent
                    id="input-group-contrasiena"
                    label="Contraseña:"
                    label-for="text-password"
                    class="fontLabel"
                  >
                    <b-form-input
                      v-model="users.contrasenia"
                      type="password"
                      id="text-password"
                      aria-describedby="password-help-block"
                      disabled
                    ></b-form-input>
                    <b-form-text id="password-help-block">
                      Su contraseña debe tener entre 8 y 20.
                    </b-form-text>
                  </b-form-group>
                </b-col>
                <b-col>
                  <b-form-group
                    id="input-group-rol"
                    label="Rol:"
                    label-for="input-rol"
                    class="fontLabel">
                    <b-form-select
                      id="input-rol"
                      class="fontInput"
                      v-model="selected"
                      :options="roles"
                      value-field="idRol"
                      text-field="nombreRol"
                      required>
                    </b-form-select>
                  </b-form-group>
                </b-col>
              </b-row>
              <b-row align="right" >
                <b-col align="right" >
                  <b-button @click="guardarFormulario(users.idUsuario)" type="submit" variant="guardar" class="text-white m-2"
                    >Guardar</b-button>
                  <b-button class="mr-2" href="#/usuarios" variant="eliminar">Cancelar</b-button>
                </b-col>
              </b-row>
            </b-container>
          </b-form>
        </b-jumbotron>
      </b-container>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "ModificarUsuario",
  data() {
    return {
      dismissSecs: 5,
      dismissCountDown: 0,
      users: [],
      selected: null,
      roles: [],
      id: this.$route.params.id,
      show: true,
    };
  },
  methods: {
    ObtenerUsuario(id) {
      const path = `http://localhost:9090/apimiel/web/usuarios/${id}`;
      axios
        .get(path)
        .then((response) => {
          this.users = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    obtenerRol(id){
      const path = `http://localhost:9090/apimiel/web/usuarios/${id}`;
      axios
        .get(path)
        .then((response) => {
          this.selected = response.data.rolUsuario.idRol;
          console.log(this.selected);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    catalogoRoles() {
      const path = "http://localhost:9090/apimiel/web/roles";
      axios
        .get(path)
        .then((response) => {
          this.roles = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    guardarFormulario(id){
      const path = `http://localhost:9090/apimiel/web/usuarios/modificar/${id}`;
      axios
        .put(path, {
          nombreUsuario: this.users.nombreUsuario,
          correoElectronico: this.users.correoElectronico,
          contrasenia: this.users.contrasenia,
          rolUsuario: {
            idRol: this.selected
          }
        })
        .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
     // alert(JSON.stringify(this.users));
     this.dismissCountDown = this.dismissSecs;
     setTimeout( () => this.$router.push({ path: '/usuarios'}), 2000);
    },
    countDownChanged(dismissCountDown) {
      this.dismissCountDown = dismissCountDown;
    },
  },
  created() {
    this.ObtenerUsuario(this.id);
    this.catalogoRoles();
    this.obtenerRol(this.id);
  },
};
</script>

<style scoped>

.fontInput{
  background-color: #F5F7FF;
  color: #4283EB;
}

.fontLabel{
  color: #767676;
  font-weight: bold;
}

.separador{
  border: 1px solid #767676;
  border-radius: 50px;
  background-color: gray;
}
</style>

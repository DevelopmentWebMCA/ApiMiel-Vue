<template>
  <div>
    <div
      class="header pb-8 pt-5 d-flex align-items-center profile-header"
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
          :variant="colorVariante"
          class="position-fixed fixed-top m-0 rounded-0"
          @dismissed="dismissCountDown = 0"
          @dismiss-count-down="countDownChanged"
        >
           {{ alerTexto }}
        </b-alert>
        <b-row>
          <b-col>
            <h1 class="mb-4">Usuarios</h1>
          </b-col>
        </b-row>

        <b-jumbotron
          bg-variant="white"
          class="shadow-lg p-5 mb-5 bg-white rounded"
        >
          <h2 class="text-center fontLabel">Agregar Usuario</h2>
          <hr class="separador mt-2" />
          <b-form>
            <b-container>
              <b-row>
                <b-col cols="12" lg="6" xl="6">
                  <b-form-group
                    id="input-group-name"
                    label="Nombre Completo:"
                    label-for="input-name"
                    class="fontLabel"
                  >
                    <b-form-input
                      id="input-name"
                      v-model="users.nombreUsuario"
                      placeholder="Escribir nombre completo"
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
                      placeholder="Escribir correo electrónico"
                    ></b-form-input>
                  </b-form-group>
                </b-col>
              </b-row>

              <b-row>
                <b-col cols="12" lg="6" xl="6">

                  <b-form-group
                    id="input-group-contrasiena"
                    label="Contraseña:"
                    label-for="text-password"
                    class="fontLabel"
                  > 
                    <b-input-group-append>
                      <b-form-input
                        :type="type"
                        id="text-password"
                        v-model="users.contrasenia"
                        aria-describedby="password-help-block"
                        class="fontInput"
                        minlength = 8
                        maxlength = 20
                      ></b-form-input>
                      <b-button class="fontInput" type="password" @click="showPassword">
                        <b-icon :icon="icon"></b-icon>
                      </b-button>
                    </b-input-group-append>
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
                    class="fontLabel"
                  >
                    <b-form-select
                      id="input-rol"
                      :options="roles"
                      v-model="users.rolUsuario.idRol"
                      value-field="idRol"
                      text-field="nombreRol"
                      class="fontInput"
                    ></b-form-select>
                  </b-form-group>
                </b-col>
              </b-row>
              <b-row>
                <b-col align="right">
                  <b-button
                    @click="onSubmit()"
                    type="submit"
                    variant="modificar"
                    class="m-2"
                    >Guardar</b-button
                  >
                  <b-button
                    class="mr-2"
                    href="#/usuarios"
                    type="reset"
                    variant="eliminar"
                    >Cancelar</b-button
                  >
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
  name: "AgregarUsuario",
  data() {
    return {
      dismissSecs: 5,
      alertMsj: false,
      dismissCountDown: 0,
      type: "password",
      alerTexto: "",
      colorVariante: "warning",
      icon: "eye",
      users: {
        nombreUsuario: "",
        correoElectronico: "",
        contrasenia: "",
        rolUsuario: {
          idRol: null,
        },
      },
      selected: null,
      roles: [],
      show: true,
    };
  },
  props: {},
  methods: {
    onSubmit() {
      const path = "http://localhost:9090/apimiel/web/usuarios/agregar";

      if (
        this.users.nombreUsuario &&
        this.users.correoElectronico &&
        this.users.contrasenia &&
        this.users.rolUsuario.idRol &&
        this.users.contrasenia.length >= 8 &&
        this.users.contrasenia.length <= 20
      ){
        setTimeout(() => this.$router.push({ path: "/usuarios" }), 2000);
        axios
          .post(path, {
            nombreUsuario: this.users.nombreUsuario,
            correoElectronico: this.users.correoElectronico,
            contrasenia: this.users.contrasenia,
            rolUsuario: {
              idRol: this.users.rolUsuario.idRol,
            },
          })
          .then((response) => {
            this.alerTexto = "Usuario agregado correctamente";
            this.colorVariante = "success";
            this.alertMsj = true;
            console.log(this.alerTexto);
            console.log(response);
          })
          .catch((error) => {
            alert("Algo salio mal (" + error + ")");
            console.log(this.alerTexto);
            console.log(error);
          });
      } else {
          this.alerTexto = "Campos vacios, favor de llenar el formulario";
          this.colorVariante = "warning ";
          this.alertMsj = true; 
      }
      this.dismissCountDown = this.dismissSecs;

      // alert(JSON.stringify(this.users));
    },
    showPassword() {
     this.type = this.type === "password" ? "text" : "password";
     this.icon = this.icon === "eye" ? "eye-slash" : "eye";
    },
    catalogoRoles() {
      const path = "http://localhost:9090/apimiel/web/roles";
      axios
        .get(path)
        .then((response) => {
          this.roles = response.data;
          console.log(this.roles);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    countDownChanged(dismissCountDown) {
      this.dismissCountDown = dismissCountDown;
    },
  },
  created() {
    this.catalogoRoles();
  },
};
</script>

<style scoped>
.fontInput {
  background-color: #f5f7ff;
  color: #4283eb;
}

.fontLabel {
  color: #767676;
  font-weight: bold;
}

.separador {
  border: 1px solid #767676;
  border-radius: 50px;
  background-color: gray;
}
</style>

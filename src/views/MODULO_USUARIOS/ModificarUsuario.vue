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
          <h2 class="text-center fontLabel">Modificar usuario</h2>
          <hr class="mt-2 separador">
          <b-form @submit="onSubmit" v-if="show">
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
                      class="fontInput"
                      id="text-password"
                      aria-describedby="password-help-block"
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
              <b-row>
                <b-col align="right">
                  <b-button type="submit" variant="guardar" class="text-white"
                    >Guardar</b-button>
                  <b-button href="#/usuarios" variant="eliminar">Cancelar</b-button>
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
      users: [],
      selected: null,
      roles: [],
      id: this.$route.params.id,
      show: true,
    };
  },
  methods: {
    onSubmit(event) {
      event.preventDefault();
      alert(JSON.stringify(this.users));
    },
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

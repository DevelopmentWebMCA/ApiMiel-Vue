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
          bg-variant="white"
          class="shadow-lg p-5 mb-5 bg-white rounded"
        >
          <h2 class="text-center fontLabel">Agregar usuario</h2>
          <hr class="separador mt-2"/>
          <b-form @submit="onSubmit" @reset="onReset" v-if="show">
            <b-container>
              <b-row>
                <b-col>
                  <b-form-group
                    id="input-group-name"
                    label="Nombre Completo:"
                    label-for="input-name"
                    class="fontLabel"
                  >
                    <b-form-input
                      id="input-name"
                      v-model="form.name"
                      placeholder="Escribir nombre completo"
                      required
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
                      v-model="form.email"
                      type="email"
                      placeholder="Escribir correo electrónico"
                      required
                      class="fontInput"
                    ></b-form-input>
                  </b-form-group>
                </b-col>
              </b-row>

              <b-row>
                <b-col>
                  <b-form-group
                    @submit.stop.prevent
                    id="input-group-contrasiena"
                    label="Contraseña:"
                    label-for="text-password"
                    class="fontLabel"
                  >
                    <b-form-input
                      type="password"
                      id="text-password"
                      aria-describedby="password-help-block"
                      class="fontInput"
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
                    class="fontLabel"
                  >
                    <b-form-select
                      id="input-rol"
                      v-model="form.rol"
                      :options="rol"
                      required
                      class="fontInput"
                    ></b-form-select>
                  </b-form-group>
                </b-col>
              </b-row>
              <b-row>
                <b-col align="right">
                  <b-button type="submit" variant="guardar" class="text-white">Guardar</b-button>
                  <b-button href="#/usuarios" type="reset" variant="eliminar">Cancelar</b-button>
                </b-col>
              </b-row>
            </b-container>
          </b-form>
          <b-card class="mt-3" header="Form Data Result">
            <pre class="m-0">{{ form }}</pre>
          </b-card>
        </b-jumbotron>
      </b-container>
    </div>
  </div>
</template>

<script>
export default {
  name: "AgregarUsuario",
  data() {
    return {
      users:[],
      form: {
        name: "",
        email: "",
        rol: null,
      },
      rol: [
        { text: "Elige un rol", value: null },
        "Investigador",
        "Administrador",
      ],
      show: true,
    };
  },
  methods: {
    onSubmit(event) {
      event.preventDefault();
      alert(JSON.stringify(this.form));
    },
    onReset(event) {
      event.preventDefault();
      // Reset our form values
      this.form.name = "";
      this.form.email = "";
      this.form.rol = null;
      // Trick to reset/clear native browser form validation state
      this.show = false;
      this.$nextTick(() => {
        this.show = false;
      });
    },
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

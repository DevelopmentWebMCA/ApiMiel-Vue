<template>
  <div>
    <br />
    <br />
    <b-container fluid class="mt--12">
      <!-- CONTENEDOR PRINCIPAL -->
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
      <!-- ALERTA QUE SE MOSTRARA AL INTENTAR AGREGAR UN NUEVO REGISTRO  -->

      <b-row>
        <b-col>
          <h1>Publicaciones</h1>
        </b-col>
      </b-row>
      <!-- SECCION PARA EL TITULO -->

      <b-jumbotron
        bg-variant="white"
        class="shadow-lg p-5 mb-5 bg-white rounded"
      >
        <!-- SECCION PARA EL CUERPO DEL FORMULARIO -->
        <h2 class="fuente_texto text-center">Actualizar publicaciones</h2>
        <hr class="separador mt-2" />

        <b-row align-v="start">
          <!-- SECCION PARA ID Y NOMBRE ASOCIACION -->

          <b-col cols="12" lg="6" xl="6">
            <b-form>
              <b-form-group
                id="input-group-rol"
                label="Categoria:"
                label-for="input-rol"
                class="text-start fuente_texto"
              >
                <b-form-select
                  :options="listaCategoria"
                  v-model="seleccionCategoria"
                  id="input-rol"
                  value-field="idCategoria"
                  text-field="nombreCategoria"
                  class="caja_texto"
                ></b-form-select>
              </b-form-group>
            </b-form>
          </b-col>
          <!-- COLUMNA PARA CIUDAD DE LA ASOCIACION -->
          <b-col cols="12" lg="6" xl="6">
            <b-form>
              <b-form-group
                id="input-group-rol"
                label="Usuario:"
                label-for="input-rol"
                class="text-start fuente_texto"
              >
                <b-form-select
                  :options="usuarios"
                  v-model="seleccionUsuario"
                  id="input-rol"
                  value-field="idUsuario"
                  text-field="nombreUsuario"
                  class="caja_texto"
                ></b-form-select>
              </b-form-group>
            </b-form>
          </b-col>
        </b-row>

        <b-row class="" align-h="around">
          <b-col
            cols="12"
            md="12"
            lg="3"
            xl="9"
            align-self="end"
            class="mt-lg-0 mt-4"
          >
            <b-form>
              <b-form-group
                class="text-start fuente_texto"
                label="Contenido:"
                label-for="input-1"
              >
                <b-form-textarea
                  id="input-1"
                  v-model="publicacion.contenido"
                  class="caja_texto"
                  placeholder="Ingrese una descripcion de la asociación"
                ></b-form-textarea>
              </b-form-group>
            </b-form>
          </b-col>
        </b-row>

        <br />

        <b-row>
          <!-- SECCION PARA LOS BOTONES DE GUARDAR Y CANCELAR -->
          <b-col align="right">
            <b-button
              class="m-1"
              @click="guardarFormulario(publicacion.idPost)"
              type="submit"
              variant="modificar"
              >Guardar</b-button
            >

            <b-button class="m-1" href="#/posts" variant="eliminar"
              >Cancelar</b-button
            >
          </b-col>
        </b-row>
      </b-jumbotron>
    </b-container>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "AgregarPost",
  data() {
    return {
      dismissSecs: 5,
      alertMsj: false,
      alerTexto: "",
      colorVariante: "",
      dismissCountDown: 0,
      id: this.$route.params.id,
      seleccionUsuario: null,
      seleccionCategoria: null,
      usuarios: [],
      publicacion: [],
      listaCategoria: [
        {
          idCategoria: 1,
          nombreCategoria: "Noticia",
        },
        {
          idCategoria: 2,
          nombreCategoria: "Informativo",
        },
        {
          idCategoria: 3,
          nombreCategoria: "Evento",
        },
        {
          idCategoria: 4,
          nombreCategoria: "Anuncio",
        },
      ],
      show: true,
    };
  },
  methods: {
    ObtenerPublicacion(id) {
      //METODO PARA OBTENER LA ASOCIACION INDICADA
      const path = `http://localhost:9090/apimiel/web/notas/${id}`;
      axios
        .get(path)
        .then((response) => {
          this.publicacion = response.data;
          this.seleccionUsuario = response.data.usuario.idUsuario;
          this.seleccionCategoria = response.data.categoriaPost.idCategoria;
          console.log(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    guardarFormulario(id) {
      //METODO PARA GUARDAR LOS DATOS DEL FORMULARIO MODIFICADO
      const path = `http://localhost:9090/apimiel/web/notas/modificar/${id}`;
      axios
        .put(path, {
          categoriaPost: this.seleccionCategoria,
          usuario: this.seleccionUsuario,
          contenido: this.publicacion.contenido,
        })
        .then((response) => {
          //EN CASO DE QUE FUNCIONE TODO BIEN, SE MOSTRARA UNA ALERTA DE CONFIRMACION
          console.log(response);
          this.alerTexto = "Publicacion modificada correctamente";
          this.colorVariante = "success";
          this.alertMsj = true;
          console.log(this.alerTexto);
        })
        .catch((error) => {
          // EN CASO DE ERROR SE MOSTRARA UNA ALERTA DE ERROR
          alert("Algo salio mal (" + error + ")");
          console.log(this.alerTexto);
          console.log(error);
        });
      this.dismissCountDown = this.dismissSecs;
      setTimeout(() => this.$router.push({ path: "/posts" }), 2000);
    },
    listaUsuarios() {
      const path = "http://localhost:9090/apimiel/web/usuarios";
      axios
        .get(path)
        .then((response) => {
          this.usuarios = response.data;
          console.log(this.usuarios);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    countDownChanged(dismissCountDown) {
      //METODO CONTADOR PARA OCULTAR LAS ALERTAS
      this.dismissCountDown = dismissCountDown;
    },
  },
  created() {
    this.ObtenerPublicacion(this.id);
    this.listaUsuarios();
  },
};
</script>

<style scoped>
.caja_texto {
  color: rgb(0, 110, 255);
  background-color: #f5f7ff;
}
#input-1{
    height: 200px;
}
.separador {
  border: 1px solid #767676;
  border-radius: 50px;
  background-color: gray;
}
.fuente_texto {
  color: #767676;
  font-weight: bold;
}
</style>
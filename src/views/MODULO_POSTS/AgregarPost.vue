<template>
  <div
      class="header pb-8 pt-5 pt-lg-8 d-flex align-items-center profile-header"
      style="
        min-height: 600px;
        background-size: cover;
        background-position: center top;">

      <b-container fluid>
        <b-row>
          <b-col>
            <h1>Productos</h1>
          </b-col>
        </b-row>

        <b-jumbotron 
          bg-variant="white"
          class="shadow-lg p-5 mb-5 bg-white rounded">
          <h2 class="text-center fontLabel">Agregar Producto</h2>
         <hr class="separador mt-2"/>

 <!-- FORMULARIO  -->
        <form >
            <b-container>
               <!-- NOMBRE PRODUCTO -->
              <b-row>
                <b-col cols= "12" lg="6" xl="6">
            <b-form>
              <b-form-group
                class="fontLabel"
                label="Nombre del producto :"
                label-for="input-medida">
                <b-form-input
                  id="input-1"
                  v-model="info.nombreProducto"
                  class="fontInput"
                  placeholder="Ingresa el nombre del producto"
                ></b-form-input>
              </b-form-group>
            </b-form>
                </b-col>
                 <!-- UNIDAD MEDIDA -->
                <b-col>
                  <b-form>
               <b-form-group
                    id="input-group-medida"
                    label="Unidad de medida:"
                    label-for="input-medida"
                    class="fontLabel">
                    <b-form-input
                      id="input-medida"
                      placeholder="Escribir la unidad de medida"
                      class="fontInput"
                      v-model="info.unidadMedida"
                    ></b-form-input>
                  </b-form-group>
            </b-form>
                </b-col>
              </b-row>
              <br />

               <br />
                <!-- botones -->
              <b-row aling="rigth">
              <b-col></b-col>
                <b-button class="m-1" @click="onSubmit()" type="submit" variant="modificar"  
                href="#/productos"> Guardar</b-button>
                <b-button class="m-1" href="#/productos" variant="eliminar"> Cancelar</b-button>
              </b-row>
            </b-container>
         </form>
        </b-jumbotron>
      </b-container>
    </div>
</template>

<script>
    

</script>

<style>

</style>
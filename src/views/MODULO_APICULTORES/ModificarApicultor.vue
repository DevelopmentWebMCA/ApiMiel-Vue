<template>


<div>
<b-container fluid>
  <b-card bg-variant="white" text-variant="white">
    <div>
      <h1 class="title-form">{{Mensaje}}</h1>
    </div>
    <b-form @submit="Submit" >
        <b-alert
          :show="dismissCountDown"
          dismissible
          fade
          variant="success"
          class="position-fixed fixed-top m-0 rounded-0"
          @dismiss-count-down="countDownChanged">
          Asociacion modificada correctamente
        </b-alert> 

    <b-container>
  <b-row>


    
  <b-col cols="12" lg="6" xl="6"  >
    <h3> ID apicultor</h3>
    <input 
      class="form-control my-2"
        placeholder="Ingrese ID"
        v-model="form.idApicultor"
        required
      >
  </b-col>  

  <b-col cols="12" lg="6" xl="6">
    <h3> Nombre Completo</h3>
    <input 
        class="form-control my-2"
        placeholder="Ingrese nombre Completo"   
        v-model.trim="form.nombreApicultor" 
        required 
      >
  </b-col>

  <b-col cols="12" lg="6" xl="6">
  <h3> Numero de Apiarios</h3>
      <input 
      type=""
      class="form-control my-2"
        placeholder="Numero "
    v-model="form.numeroApiarios"
        required
      >
  </b-col>

  <b-col cols="12" lg="6" xl="6">
    <h3> Correo Electronico</h3>
      <input 
        
        class="form-control my-2"
        placeholder="ingrese correo"
    v-model="form.correoElectronico"
        required
      >

  </b-col>

  <b-col cols="12" lg="6" xl="6">
  <h3> Numero de Empleados</h3>
      <input 
    
        class="form-control my-2"
        placeholder="numero "
      v-model="form.numeroEmpleados"
        required
      >

  </b-col>

  <b-col cols="12" lg="6" xl="6">
    <h3> Nombre asociacion</h3>
  
    <b-form-select v-model="form.asociacion.idAsociacion" class="mb-3" required>
        <b-form-select-option :value="null">Seleccione una asociacion</b-form-select-option>
        <b-form-select-option v-for="form in listaAsociaciones" :key="form.idAsociacion" :value="form.idAsociacion">{{form.nombreAsociacion}}</b-form-select-option>
      </b-form-select>
  </b-col>

  <b-col cols="12" lg="6" xl="6">
    <h3> ID Usuario</h3>
    <b-form-select v-model="form.usuario.idUsuario" class="mb-3" required>
        <b-form-select-option :value="null">Seleccione el usuario</b-form-select-option>
        <b-form-select-option v-for="form in listaUsuarios" :key="form.idUsuario" :value="form.idUsuario">{{form.idUsuario}}</b-form-select-option>
      </b-form-select>
  </b-col> 

  </b-row>
    
      <b-row>
                  <b-col align="right">
                    <b-button type="submit" variant="modificar" class="text-white">Guardar</b-button>
                    <b-button type="reset" variant="eliminar" @click="GoBack">Cancelar</b-button>
                  </b-col>
      </b-row>
    </b-container>             
    </b-form>
  </b-card>
  
  </b-container>
</div>
</template>
<script>
import { format } from 'd3';
import axios from 'axios';
export default {
    name:"ModificarApicultor",
    data(){
      return{
        form:{
          "idApicultor": null,
          "nombreApicultor": null,
          "numeroApiarios": null,
          "numeroEmpleados": null,
          "correoElectronico": null,
          "actualizacion": new Date().toISOString(),
          "asociacion": {"idAsociacion": null},
          "usuario":
            {
                "idUsuario": null
            }
        },
        Mensaje:"Editar",
        ApiRest:"http://localhost:9090/apimiel/web/",
        listaUsuarios:null,
        listaAsociaciones: null
    
      }
       
      
    },
    mounted(){
      this.getAsociasiones();
      this.getUsuarios();
      if(this.$route.params.Item){
        this.ModoEditar(this.$route.params.Item);
        this.Mensaje="Editar Apicultor";
      }else{
        this.Mensaje="Agregar Apicultor";
      }
    },
    methods:{
      ocultarForm(){
        this.$emit("cancelar",true);},
      //Trae la lista de las Asosiaciones
      getAsociasiones(){
        axios.get(this.ApiRest+"asociaciones")
        .then(res=>{
          this.listaAsociaciones=res.data;
        })
        .catch(err=>console.log(err))
      },
      //Trae la lista de los Usuarios
      getUsuarios(){

        axios.get(this.ApiRest+"usuarios")
        .then(res=>{
          this.listaUsuarios=res.data;
        })
        .catch(err=>console.log(err))
      },
      ModoEditar(ItemApi){
        this.form.idApicultor=ItemApi.idApicultor;
        this.form.nombreApicultor=ItemApi.nombreApicultor;
        this.form.numeroApiarios=ItemApi.numeroApiarios
        this.form.correoElectronico=ItemApi.correoElectronico;
        this.form.numeroEmpleados=ItemApi.numeroEmpleados;
        this.form.asociacion.idAsociacion=ItemApi.asociacion.idAsociacion;
        this.form.usuario.idUsuario=ItemApi.usuario.idUsuario;
        this.Mensaje="Actualizar Apicultor";
      },
      GoBack(){
        this.$route.params.save=false;
        this.$router.push({ name: 'apicultores'});
      },
      ItemApi(){
        return this.$route.params.Item
      },
      Guardar(data){
        axios.post(this.ApiRest+"apicultores/agregar",data)
          .then(res=>{
            if(res.status===201){
              this.$emit("guardar");
            }
          })
        .catch(err=>console.log(err));
      },
      Actualizar(data){  
        axios.put(this.ApiRest+"apicultores/modificar/"+data.idApicultor,data)
        .then(res=>{
          if(res.status===200){
            this.$emit("guardar");
          }
        })
        .catch(err=>console.log(err));
      },
      Submit(event){
        event.preventDefault();
        let data= this.form;        
        data.numeroApiarios=parseInt(this.form.numeroApiarios);
        data.numeroEmpleados=parseInt(this.form.numeroEmpleados);
        data.asociacion.idAsociacion=parseInt(this.form.asociacion.idAsociacion);
        if(this.$route.params.Item){
          this.Actualizar(data);
        }else{
          this.Guardar(data);
        }
        this.$router.push({ name: 'apicultores' , params:{ save: true}});
      }
    }
}
</script>
<style scoped>
.title-form{
  text-align: center;
  border-bottom: 2px solid black;
  margin-bottom: 3rem;
  padding: 1rem;
}
.form-control {
  color: rgb(0, 110, 255);
  background-color: #f5f7ff;
}
.mb-3{
  color: rgb(0, 110, 255);
  background-color: #f5f7ff;
}
</style>
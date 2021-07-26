<template>
  <div>
  <b-container fluid>
      <b-alert
        :show="dismissCountDown"
        dismissible
        fade
        :variant="alertVariant"
        class="position-fixed fixed-top m-0 rounded-0"
        @dismiss-count-down="countDownChanged"
      >
        {{Mensaje}}
      </b-alert>
    <b-row>
        <b-col>
          <h1>Apicultor</h1>
        </b-col>

        <b-col align="center" class="mt-lg-0 mt-sm-3">
          <b-form
            class="navbar-search form-inline mr-sm-5"
            :class="{
              'navbar-search-dark': type === 'default',
              'navbar-search-light': type === 'light',
            }"
            id="navbar-search-main"
          >
            <b-form-group class="mb-0 pb-4">
              <b-input-group class="input-group-alternative input-group-merge">
                <b-input-group-prepend>
                  <div class="input-group-append">
                  <span class="input-group-text"
                    ><i class="fas fa-search"></i
                  ></span>
                </div>
                </b-input-group-prepend>
                
                <b-input-group-append>
              <b-form-input
                  v-model="buscar"
                  placeholder="Buscar"
                  type="text"
                  v-on:keyup.enter="buscarNombre()"
                >
                </b-form-input>
                <b-button 
                class="input-group-append" 
                pill 
                variant="outline-secondary"
                @click="buscarNombre()">Buscar</b-button>
                </b-input-group-append>
                
              </b-input-group>
            </b-form-group>
          </b-form>
        </b-col>

        
        <b-col align="right" col-12>
          <b-button  variant="primario" to="/apicultores/form/guardar">
            Agregar Apicultor
          </b-button>
        </b-col>
      </b-row>
        <b-card fluid class="p-1 mb-4 bg-white rounded cardText" >
          <div v-if="lista">
              <b-row> 
                <b-col>
                  <b-pagination
                    v-model="currentPage"
                    :total-rows="rows"
                    :per-page="perPage"         
                    aria-controls="card-api"
                    align="center"
                  >            
                  </b-pagination>
                  <div>
                    <Card v-for="item in paginador(lista)" 
                    :key="item.idApicultor" 
                    :ItemApi="item"
                    @update="EnviarForm"
                    @delete="eliminar"/>    
                  </div>
                </b-col>
              </b-row>
          </div>
          <b-pagination
                    v-model="currentPage"
                    :total-rows="rows"
                    :per-page="perPage"         
                    aria-controls="card-api"
                    align="center"
                  >            
                  </b-pagination>
        </b-card>
   
  </b-container>
  </div>
  
</template>
<script>
import Card from'./AgregarApicultor'
import axios from 'axios'


export default {
  name:"ViewApicultores",
  components:{Card},
  data(){
    return {
      perPage:10,
      currentPage: 1,
      lista:[Array,Object],
      dismissCountDown: 0,
      Mensaje:"",
      alertVariant: "",
      ApiRest:"http://localhost:9090/apimiel/web/",
      buscar: null
    }
  },
  created(){
    this.GetApicultor();
  },
  mounted(){
    if(this.$route.params.save===true){
      this.MensajeGuardar();
    }
  },
  methods:{
    countDownChanged(dismissCountDown) {
      this.dismissCountDown = dismissCountDown;
    },
    paginador(lista) {
      const indiceInicio = (this.currentPage - 1) * this.perPage;
      const indiceFinal =
        indiceInicio + this.iporPagina > lista.length
          ? lista.length
          : indiceInicio + this.perPage;
      return lista.slice(indiceInicio, indiceFinal);
    },
    eliminar(event){
      axios.delete(this.ApiRest+"apicultores/eliminar/"+event.idApicultor)
      .then(res=>{
        if(res.status){
          var index=this.lista.indexOf(event);
          this.lista.splice(index,1);
          this.dismissCountDown=1;
          this.Mensaje="Datos eliminadas correctamente";
          this.alertVariant="eliminar";
        }
      })
      .catch(err=>console.log(err));
    },
    //Traer datos del api del servicio apicultor
    GetApicultor(){      
      axios.get(this.ApiRest+"apicultores")
      .then((res)=>{       
        if(res){
          this.lista=res.data;
        }
      })
      .catch((err)=>console.log(""+err));
    },
    EnviarForm(event){
      this.$router.push({ name: 'EditarApicultor' , params:{ Item: event}});
    },
    MensajeGuardar(){
      console.log("guardar");
      this.dismissCountDown=1;
      this.Mensaje="Datos guardados correctamente";
      this.alertVariant="success";
    },
    buscarNombre(){
       axios.get(this.ApiRest+"apicultores/"+this.buscar)
      .then(res=>{
        console.log(res);
      })
       .catch(err=>console.log(err))
    }
  },
  computed:{
    rows() {      
      return this.lista.length;
    }
  }
}
</script>
<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>


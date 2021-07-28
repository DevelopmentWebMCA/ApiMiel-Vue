
<template>
  <div>

    <br> <br>
     <!-- Modificar a partir de aqui  -->
    <b-container fluid class="mt--12">
      <b-row> 
        <b-col>
          <h1> Módulo de Publicaciones </h1>
        </b-col>
        <b-col cols="12" md="12" lg="3" xl="3" align-self="end" class="mt-lg-0 mt-4">
          <b-button variant="primario" href="#/agregarPost" block> 
          Agregar 
          </b-button>
        </b-col>
      </b-row>

<br />
<div>
    <b-card-group  deck>
    <b-card class="p-2 mb-5 bg-white rounded cardText"
      id="tarjet"
      header-tag="header"
      footer-tag="footer">
       <container>
      <b-card-title>PUBLICACION</b-card-title>
     <b-row>
       
                <div class="col-4">  
                  <span class="rounded-circle">
                  <b-img id="icono" src="https://image.flaticon.com/icons/png/512/1999/1999310.png"></b-img>
                  </span>
                   </div>
                   <div class="col-4">
                  <b-icon id="iconos" icon="calendar2-day"
                  ></b-icon> Fecha de publicacion
                </div>
                <div class="col-4">
                  <b-icon id="iconos" icon="calendar2-day">
                  </b-icon>Categoria de noticia
                </div>
                <br /> <br />
                </b-row>
                <b-row>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae officia corrupti amet veritatis labore, excepturi nostrum natus iusto perferendis placeat, dolorem adipisci, expedita inventore maxime aperiam quod vero. Ad, quae!
                </b-row>
                </container>
    </b-card>
    <b-card class="p-2 mb-5 bg-white rounded cardText"
    id="tarjet"
      header-tag="header"
      footer-tag="footer">
 
      <b-card-title>PUBLICACION</b-card-title>
     <b-row>
                <div class="col-4">  
                  <span class="rounded-circle">
                  <b-img id="icono" src="https://image.flaticon.com/icons/png/512/1999/1999310.png"></b-img>
                  </span>
                   </div>
                   <div class="col-4">
                  <b-icon id="iconos" icon="calendar2-day"
                  ></b-icon> Fecha de publicacion
                </div>
                <div class="col-4">
                  <b-icon id="iconos" icon="calendar2-day">
                  </b-icon>Categoria de noticia
                </div>
                <br /> <br />
                </b-row>
                <b-row>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae officia corrupti amet veritatis labore, excepturi nostrum natus iusto perferendis placeat, dolorem adipisci, expedita inventore maxime aperiam quod vero. Ad, quae!
                </b-row>
    </b-card>
  </b-card-group></div>
    </b-container>
  </div>
</template>

<script>
    

</script>

<style>
#tarjet{
  box-shadow: 3px 5px 12px 3px gray;
  border-radius: 10px, 10px, 10px, 10px;
}
#icono{
  width: 3cm ;
  height: 3cm;
}
</style>
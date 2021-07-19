<template>
  <div>
    <!-- Header -->
    <div class="header py-7 py-lg-8 pt-lg-9">
      <b-container>
        <div class="header-body text-center mb-7">
          <b-row class="justify-content-center">
            <b-col xl="5" lg="6" md="6" class="px-5">
              <img src="img/brand/404.png" width="120px" height="100px"><br>
              <h1>Ooops!</h1>
              <p>Página no encontrada :(</p>

              <router-link to="/dashboard" class="font-weight-bold mt-5">Volver al menú</router-link>
            </b-col>
          </b-row>
        </div>
      </b-container>
    </div>
  </div>
</template>

<script>

export default {
  name: 'not-found'
};
</script>

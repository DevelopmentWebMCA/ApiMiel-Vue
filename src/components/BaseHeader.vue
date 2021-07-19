<template>
  <div class="header" :class="{[`bg-${type}`]: type}">
     <b-container fluid>
      <div class="header-body">
              <b-form class="navbar-search form-inline mr-sm-3"
            :class="{'navbar-search-dark': type === 'default', 'navbar-search-light': type === 'light'}"
            id="navbar-search-main">
        <b-form-group class="mb-0">
          <b-input-group class="input-group-alternative input-group-merge">
            <b-form-input placeholder="Buscar" type="text" style="width:400px"> </b-form-input>
            <div class="input-group-append">
              <span class="input-group-text"><i class="fas fa-search"></i></span>
            </div>
          </b-input-group>
        </b-form-group>
      </b-form>
      </div>
     </b-container>
  </div>
</template>
<script>
  export default {
    name: 'base-header',
    props: {
      type: {
        type: String,
        default: 'muted',
        description: 'Header background type'
      }
    }
  }
</script>
<style>

</style>

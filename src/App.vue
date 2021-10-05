<template>
  <div id="nav"
       class="mb-4 bg-dark text-left px-3">
    <router-link to="/" class="align-items-center">
      <i class="mdi mdi-home mdi-48px text-white" />
      <span class="text-white title--solucx--test mb-2">
        Início
      </span>
    </router-link>
  </div>
  <router-view />
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  box-shadow: 0px 1px 15px 1px rgba(0, 0, 0, 0.1);
}

.title--solucx--test {
  text-decoration: none;
  font-size: 24px;
  text-align: left !important;
}
</style>

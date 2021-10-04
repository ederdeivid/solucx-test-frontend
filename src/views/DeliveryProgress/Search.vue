<template>
  <div class="d-flex flex-column flex-md-row col-12 row m-0 p-0">
    <div class="text-left col-12 col-md-6 col-lg-2">
      <label class="m-0 font-weight-bold" for="delivery__progress__droneId">Drone ID: </label>
      <input type="text"
             id="delivery__progress__droneId"
             class="form-control mb-3 mb-lg-0">
    </div>

    <div class="text-left col-12 col-md-6 col-lg-4">
      <label class="m-0 font-weight-bold" for="delivery__progress__name">Nome: </label>
      <input type="text" id="delivery__progress__name"
             class="form-control mb-3 mb-lg-0">

    </div>

    <div class="text-left col-12 col-md-6 col-lg-2">
      <label class="m-0 font-weight-bold" for="delivery__progress__fly">Progresso: </label>
      <input type="text" id="delivery__progress__fly"
             class="form-control mb-3 mb-lg-0">

    </div>

    <div class="text-left col-12 col-md-6 col-lg-3">
      <label class="m-0 font-weight-bold" for="delivery__progress__status">Status: </label>
      <input type="text" id="delivery__progress__status"
             class="form-control mb-2 mb-lg-0">

    </div>

    <div class="actions col-12 col-lg-1 mt-lg-4">
      <button class="btn btn-block btn-info">
        <span class="d-none d-lg-block">icon</span>
        <span class="d-lg-none">Pesquisar</span>
      </button>
    </div>
  </div>
</template>

<style scoped>
</style>

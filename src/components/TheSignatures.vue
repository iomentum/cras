<script setup lang="ts">

</script>

<template>
  <div class="signatures">
    <div>Date et signature de l'intervenant</div>
    <div>Date et signature du responsable client</div>
    <div>Date et signature du responsble IOMentum</div>
  </div>
</template>

<style lang="scss">
.signatures {
  display: flex;
  flex-direction: row;
  margin: auto;
  height: 120px;
  width: 50%;

  & div {
    border: 1px solid $main-color;
    width: 300px;
    margin-top: 20px;
    padding: 8px;
    text-align: center;
    font-size: 10px;
    font-family: "Bau-Bold", Arial, Helvetica, sans-serif;
    color: #790053;

    &:nth-of-type(1) {
      margin-right: 5px;
    }

    &:nth-of-type(3) {
      margin-left: 5px;
    }
  }
}
</style>
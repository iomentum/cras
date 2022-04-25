<template>
  <div class="header">
    <p>COMPTE RENDU D'ACTIVITÉ</p>
    <img src="src\assets\IOmentum_Logo_White.png">
  </div>
</template>

<style scoped lang="scss">
div .header{
  display: flex;
  height: 160px;
  background-color: $main-color;
  margin-bottom: 25px;
  & p {
    font-family: 'Bau-Bold';
    margin: 0px;
    padding:55px 0 0 50px;
    font-size: 35px;
    color: white;
    min-width: 580px;
  }
  & img {
    max-height: 80%;
    margin-top: 20px;
    margin-right: 50px;
    margin-left: auto;
  }
}
</style>
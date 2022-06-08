<script setup lang="ts">

const props = defineProps<{ month: string }>();

</script>

<template>
<div class="cras-button-container">
  <p :id="month"> {{ month }} </p>
</div>
</template>

<style scoped lang="scss">
.cras-button-container {
  width: 100%;
  align-items: center;
  p {
    margin: 0 auto;
    border: 1px solid black;
    border-radius: 10px;
    width: 50%;
    height: 40px;
    margin-bottom: 5px;
    cursor: pointer;
  }
}
</style>

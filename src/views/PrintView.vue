<script setup lang="ts">
import TableDays from '@/components/Cra/TableDays.vue';
import UserInputs from '@/components/User/UserInputs.vue';
import TheSignatures from '@/components/User/TheSignatures.vue';
import TheFooter from '@/components/HeaderFooter/TheFooter.vue';
import CostsAndComments from '@/components/CostsComments/CostsAndComments.vue';
</script>

<template>
  <UserInputs />
  <TableDays />
  <CostsAndComments />
  <TheSignatures />
  <TheFooter />
</template>

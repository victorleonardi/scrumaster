<template>
  <NFlex align="center" justify="center" size="small" :vertical="true">
    <NFloatButton @click="setCardValue(value)" shape="square" height="60" width="60" position="relative"
      v-for="value in values" :key="value">
      {{ value }}
    </NFloatButton>
  </NFlex>
</template>

<script setup lang="ts">
import { NFloatButton, NIcon, NFlex } from 'naive-ui';
import { Balloon } from '@vicons/ionicons5';
import { defineEmits } from "vue";

const emit = defineEmits(['cardValue'])

// Make values reactive due to users choice of values (fibonnaci, custom and others)
// We can store them in a store like pinia
const values = [1, 2, 3, 5, 8, 13, 21]

function setCardValue(value: number) {
  console.log(value)

  emit("cardValue", value)
}



</script>

<style>
.n-float-button {
  font-size: 16px;
}
</style>
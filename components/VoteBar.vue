<template>
  <NFlex align="center" justify="center" size="small" :vertical="true">
    <NButton @click="setCardValue(value)" shape="square" height="60" width="60" position="relative"
      v-for="value in values" :key="value" :disabled="disable">
      {{ value }}
    </NButton>
  </NFlex>
</template>

<script setup lang="ts">
import { NFloatButton, NIcon, NFlex, NButton } from 'naive-ui';
import { defineEmits } from "vue";

const props = withDefaults(defineProps<{
  disable?: boolean
}>(), {
  disable: false
})

const emit = defineEmits(['cardValue'])

// Make values reactive due to users choice of values (fibonnaci, custom and others)
// We can store them in a store like pinia
const values = [1, 2, 3, 5, 8, 13, 21]

function setCardValue(value: number) {
  emit("cardValue", value)
}



</script>

<style>
/* Move to Tailwind */
.n-float-button {
  font-size: 16px;
}
</style>
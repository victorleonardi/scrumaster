<template>
  <div class="card" :class="{ 'has_value': hasValue }">
    <p>
      {{ value }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { defineProps, computed, } from 'vue';

const props = defineProps<{
  value?: number
}>()
const hasValue = computed(() => props?.value !== undefined)
</script>

<style>
/* Move to Tailwind */
.card {
  padding: 1rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  background: blue;
  width: 40%;
}

.has_value {
  background: red;
}
</style>
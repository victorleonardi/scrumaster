<template>
  <div class="card" :class="{ 'has_value': isReady }">
    <p>
      {{ value }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { defineProps, computed, } from 'vue';

const props = defineProps<{
  isReady: boolean,
  value?: number
}>()
const isReady = computed(() => props.isReady)
const value = computed(() => props.value)
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
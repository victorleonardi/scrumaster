<template>
  <div class="header">
    <img class="logo" src="../assets/tempLogo.png" alt="logo">
    <div class="central-menu">
      <h2>
        Menu central em construção
      </h2>
    </div>
    <div class="login-container">
      <NButton quaternary type="primary" color="#EA193D">Login</NButton>
      <button>Sign in</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { NButton } from 'naive-ui'
</script>

<style>
/* Move to Tailwind */
.header {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.5rem 1rem 3rem;
}

.logo {
  width: 50px;
  height: 50px;
}

.central-menu {
  flex-grow: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}

.login-container {
  display: flex;
  gap: 1rem;
}
</style>
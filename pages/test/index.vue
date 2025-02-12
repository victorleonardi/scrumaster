<template>
  <PageHeader />
  <div class="container">
    <div class="vote-section-container">
      <h1>
        Está é uma página de testes apenas
      </h1>
      <div class="center-cards-display">
        <div class="vote-card-grid">
          <VoteCard :shouldShow="true" value="10" />
          <VoteCard :shouldShow="true" value="9" />
          <VoteCard :shouldShow="true" value="2" />
          <VoteCard :shouldShow="true" value="11" />
          <VoteCard :shouldShow="true" value="21" />
        </div>
      </div>
      <NButton type="primary" color="#000000" text-color="#FFFFFF">Ready</NButton>
    </div>
    <!-- Jogar o VoteBar para direita independente do espaço. Pensar em como fazer -->
    <VoteBar class="vote-bar" />
  </div>


</template>


<script setup lang="ts">
import { NButton } from 'naive-ui'
</script>

<style>
.container {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 1rem;
}

.vote-section-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
}

.center-cards-display {
  display: flex;
  justify-content: center;
  align-items: center;
}

.vote-card-grid {
  display: grid;
  grid-template-rows: repeat(2, auto);
  grid-auto-flow: column;
  gap: 10px;
}

.ready-button {
  margin-top: 1rem;
}

.vote-bar {
  display: flex;
  justify-content: end;
}
</style>
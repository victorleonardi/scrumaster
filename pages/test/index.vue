<template>
  <PageHeader />
  <div class="container">
    <div class="vote-section-container">
      <h1 class="title">
        Aqui virá o nome do Projeto/Card
      </h1>
      <div class="center-cards-display">
        <div class="vote-card-grid">
          <VoteCard :shouldShow="true" :value="cardValue" />
        </div>
      </div>
      <NButton type="primary" color="#000000" text-color="#FFFFFF">Ready</NButton>
    </div>
    <VoteBar class="vote-bar" @cardValue="setCardValue" />
  </div>


</template>

<script setup lang="ts">
import { NButton } from 'naive-ui'
import { onMounted, ref } from 'vue'

onMounted(() => {
  console.log('Mounted')
  const userToken = localStorage.getItem('userToken')
  console.log(userToken)
})

const cardValue = ref('')

function setCardValue(value: string) {
  cardValue.value = value
}

</script>

<style>
.container {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: start;
}

.vote-section-container {
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
}

.title {
  font-size: 2rem;
  margin: 0 0 1rem 0;
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

/* Estilo para a primeira linha */
/* .vote-card-grid>*:nth-child(odd) {
  background-color: lightblue;
} */

/* Estilo para a segunda linha */
/* .vote-card-grid>*:nth-child(even) {
  background-color: lightcoral;
} */

.ready-button {
  margin-top: 1rem;
}

.vote-bar {
  display: flex;
  justify-content: flex-end;
  margin-left: auto;
}
</style>
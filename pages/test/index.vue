<template>
  <PageHeader />
  <div class="container">
    <div class="vote-section-container">
      <h1 class="title">
        Aqui virá o nome do Projeto/Card
      </h1>
      <div class="center-cards-display">
        <div class="vote-card-grid">
          <VoteCard :shouldShow="shouldShow" :value="cardValue" />
        </div>
      </div>
      <NButton @click="shouldShow = !shouldShow" type="primary" color="#000000" text-color="#FFFFFF">Ready</NButton>
    </div>
    <VoteBar class="vote-bar" @cardValue="setCardValue" />
  </div>


</template>

<script setup lang="ts">
import { NButton } from 'naive-ui'
import { onMounted, ref } from 'vue'
import { SocketEvent } from '~/utils/SocketEvent'

const { $io } = useNuxtApp()
$io.connect()
const shouldShow = ref(false)
const cardValue = ref()
const userToken = ref()

const state = reactive({
  counter: 0
})

$io.on(SocketEvent.new_count, (message: any) => {
  state.counter = message
})

onMounted(() => {
  console.log('Mounted')
  userToken.value = localStorage.getItem('userToken')
})


// Create a ref to store cardValue from VoteBar component
// when user click at voteBar button, then stores
// its id locally. If the votingSection isn't finished, the user can
// change his vote value using this id stored.

function setCardValue(value: string) {
  cardValue.value = value
}

async function createVote() {
  // Create vote
  // Store vote id locally

  const res = await $fetch('/api/v1/vote', {
    method: 'POST',
    body: {
      cardValue: cardValue.value,
      votingSectionId: 1, //Change when we have the votingSectionId
      userToken: userToken.value
    }
  })
}

// should only POST vote when every one at the votingSection has voted
// So we should check every sec if the votingSection is finished

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
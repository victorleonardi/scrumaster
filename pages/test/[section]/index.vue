<template>
  <PageHeader />
  <div class="container">
    <div class="vote-section-container">
      <h1 class="title">
        Aqui virá o nome do Projeto/Card
      </h1>
      <div class="center-cards-display">
        <div class="vote-card-grid">
          <VoteCard :value="cardValue" />
        </div>
      </div>
      <NButton @click="isReady = !isReady" type="primary" color="#000000" text-color="#FFFFFF">{{ readyButton }}
      </NButton>
    </div>
    <VoteBar :disable="isReady" class="vote-bar" @cardValue="setCardValue" />
  </div>
</template>

<script setup lang="ts">
import { NButton } from 'naive-ui'
import { onMounted, ref } from 'vue'
import { nanoid } from "nanoid"

const cardValue = ref()
const userToken = ref()
const isReady = ref(false)

// Use section route param to associate with the votingSectionId and in memory storage to use webhook
const route = useRoute()
const store = useStore()

console.log('storage', store.state)

store.addOrUpdateSection(route.params.section, '5suhbJ2DF0', 10)

console.log('storage', store.state)

onMounted(() => {
  if (!localStorage.getItem('userToken')) {
    // Should I use CORS here? To avoid others exploiting the API
    const firstAccessToken = $fetch('/api/v1/user', {
      method: 'POST',
    })
    localStorage.setItem('userToken', nanoid(10))
    userToken.value = firstAccessToken.userToken
  } else {
    userToken.value = localStorage.getItem('userToken')
  }

  console.log('userToken', userToken.value)
})

const readyButton = computed(() => {
  return !isReady.value ? 'Ready!' : 'Wait a Minute!'
})

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
/* Move to Tailwind */
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
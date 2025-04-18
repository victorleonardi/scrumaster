<template>
  <PageHeader />
  <div class="major-container">
    <div class="vote-section-container">
      <h1 class="title">
        Aqui virá o nome do Projeto/Card
      </h1>
      <div class="center-cards-display">
        <!-- Must improve html and style from here -->
        <!-- Till here -->
        <div
          class="grid [grid-template-columns:repeat(auto-fit,minmax(160px,1fr))] gap-4 place-items-center mx-auto max-w-[640px]">


          <!-- Você -->
          <div class="flex flex-col items-center">
            <VoteCard :value="cardValue" />
            <p>You</p>
          </div>

          <!-- Demais usuários -->
          <div v-for="user in usersInRoom" :key="user" v-show="user != userToken">
            <div class="flex flex-col items-center">
              <VoteCard />
              <p>{{ user }}</p>
            </div>
          </div>
        </div>
      </div>
      <NButton @click="getReady" type="primary" color="#000000" text-color="#FFFFFF">{{ readyButton }}
      </NButton>
    </div>
    <VoteBar :disable="isReady" class="vote-bar" @cardValue="setCardValue" />
  </div>

  <h2>{{ userToken }}</h2>
</template>

<script setup lang="ts">
import { NButton, useNotification } from 'naive-ui'
import { onMounted, ref } from 'vue'
import { nanoid } from "nanoid"
import { SocketEvent } from '~/utils/SocketEvent'

const notification = useNotification()

const { $io } = useNuxtApp()
$io.connect()

const cardValue = ref()
const userToken = ref()
const isReady = ref(false)
// probably move to an object, so we can keep
// track of the userToken, userName and its ready state
const usersInRoom = ref(new Set<string>())

const currentVotingSection = ref()

const showAlert = ref(true)

const route = useRoute()

const projectId = Number(route.params.projectId)

const store = useWebsiteStore()

onMounted(async () => {
  if (!localStorage.getItem('userToken')) {
    // Should I use CORS here? To avoid others exploiting the API
    const firstAccessToken = await $fetch('/api/v1/user', {
      method: 'POST',
    })
    localStorage.setItem('userToken', nanoid(10))
    userToken.value = firstAccessToken.userToken
  } else {
    userToken.value = localStorage.getItem('userToken')
  }

  console.log('userToken', userToken.value)

  $io.emit(SocketEvent.joinProject, {
    projectId,
    userToken: userToken.value,
  })
})

// REFACTOR due to changing newUsersInRoom schema
$io.on(SocketEvent.updateUsersInRoom, async (newUsersInRoom: string[]) => {
  console.log('Users in room', newUsersInRoom)
  console.log(newUsersInRoom)
  usersInRoom.value = new Set(newUsersInRoom)

  if (usersInRoom.value.size === 1 && !store.$state.currentVotingSection) {
    const votingSection = await $fetch('/api/v1/votingSection', {
      method: 'POST',
      body: {
        projectId,
        userToken: userToken.value,
      }
    })
    currentVotingSection.value = votingSection.id
    store.$state.currentVotingSection = votingSection.id
    console.log(currentVotingSection.value)
    console.log(store.$state.currentVotingSection)
  }
})

// REFACTOR due to changing newUser schema
$io.on(SocketEvent.newUser, (newUser) => {
  console.log('New User Connected', newUser)
  usersInRoom.value.add(newUser.userToken)
})

const readyButton = computed(() => {
  return !isReady.value ? 'Ready!' : 'Wait a Minute!'
})

function notify(title: string, content: string) {
  notification.error({
    title: title,
    content: content,
    duration: 3000
  })

}

// Create focus to be passed as prop
function setCardValue(value: string) {
  if (cardValue.value === value) {
    cardValue.value = null
    return
  }
  cardValue.value = value

}

async function getReady() {
  if (!cardValue.value) {
    notify('Missing Value', 'Please select a value before voting')
    return
  }
  isReady.value = !isReady.value
  $io.emit(SocketEvent.isReady, { projectId, userToken: userToken.value, isReady: isReady.value })
}

async function updateUsersReadyState() {

}

if (import.meta.client) {
  window.onbeforeunload = () => {
    $io.emit(SocketEvent.leaveProject, { projectId, userToken: userToken.value })
    $io.disconnect()
  }
}

</script>

<style>
/* Move to Tailwind */
.major-container {
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
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
          <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
            <div class="flex flex-col items-center">
              <VoteCard :value="cardValue" />
              <p>You</p>
            </div>
            <div v-for="user in usersInRoom">
              <div class="flex flex-col items-center" v-show="user != userToken">
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
    <NButton @click="notify">Test Notification</NButton>
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
const showAlert = ref(true)

const route = useRoute()

const projectId = route.params.projectId

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

$io.on(SocketEvent.updateUsersInRoom, (newUsersInRoom: string[]) => {
  console.log('Users in room', newUsersInRoom)
  console.log(newUsersInRoom)
  usersInRoom.value = new Set(newUsersInRoom)
})

$io.on(SocketEvent.newUser, (newUser) => {
  console.log('New User Connected', newUser)
  usersInRoom.value.add(newUser.userToken)
})

const readyButton = computed(() => {
  return !isReady.value ? 'Ready!' : 'Wait a Minute!'
})

function notify() {
  notification.error({
    title: 'Erro',
    content: 'Você precisa selecionar um card antes de continuar.',
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

/*

Now that the most complex case works, we can create a simple one.
 It can be simplified to just keep track of ready state of each user connected.
 Once all users are ready, we can send the vote to the server.

 Now, to keep track of the ready state, there are two ways:
 1. Use a simple array to keep track of the users that are ready.
 2. Use an object with usersTokens as ids and a boolean as value.

 Once everybody is ready, we can register the votes on the backend.
 and put an end to the current votingSection. That means we need to keep track of
 the votingSectionId on pinia, maybe?

 We ALSO need to keep track of the number of users connected and its ids/names, to represent
 each one on their respective card.
*/

async function getReady() {
  console.log("test new socket events")
  isReady.value = !isReady.value
  $io.emit(SocketEvent.isReady, { userToken: userToken.value, isReady: isReady.value })
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
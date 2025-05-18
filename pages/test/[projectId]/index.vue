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
            <VoteCard :isReady="isReady" :value="cardValue" />
            <p>You</p>
          </div>

          <!-- Demais usuários -->
          <div v-for="user in usersInRoom" :key="user[0]" v-show="user[0] != userToken">
            <div class="flex flex-col items-center">
              <VoteCard :isReady="user[1].ready" :value="getVoteValue(user[1])" />
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
/*
  MUST PERSIST info of users in room so when refresh the page
  that data is not lost. It's a current problem, but it doesn't
  impact the core functionality of the app.

  For NOW, keep going with the current implementation and test
  it.
*/

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

/* A Set could not make sure objects were unique,
 therefore I used a Map to store the users in the
 room and assure objects are unique.
*/
const usersInRoom = ref(new Map<string, { ready: boolean, name?: string, voteValue?: number }>())

const currentVotingSection = ref()

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

$io.on(SocketEvent.updateUsersInRoom, async (message: {
  newUsersInRoom: {
    [userToken: string]: {
      ready: boolean;
      name?: string;
      voteValue?: number;
    }
  },
  currentVotingSectionId?: string
}) => {
  const { newUsersInRoom, currentVotingSectionId } = message
  console.log('Users in room', newUsersInRoom)

  /* Checks if there is only one user in the room
  and if there is, no voting section was created yet
  */

  for (const [userToken, userInfo] of Object.entries(newUsersInRoom)) {
    console.log('User Info', userInfo)
    console.log('User Token', userToken)
    // Check if the user is already in the room
    const existingUser = usersInRoom.value.get(userToken);
    if (existingUser) {
      // Update the existing user's info
      usersInRoom.value.set(userToken, { ...existingUser, ...userInfo });
    } else {
      // Add the new user to the room
      usersInRoom.value.set(userToken, userInfo);
    }
  }

  /* Checks if there is a current voting section
  and if not, it creates one.
  */
  if (currentVotingSectionId && !currentVotingSection.value) {
    const votingSection = await $fetch('/api/v1/votingSection', {
      method: 'POST',
      body: {
        projectId,
        userToken: userToken.value,
      }
    })
    currentVotingSection.value = votingSection.id
    $io.emit(SocketEvent.setCurrentVotingSection, {
      projectId,
      votingSectionId: currentVotingSection.value,
    })
    return
  }


})

$io.on(SocketEvent.newUser, (message: { projectId: string, userToken: string, newUserInfo: { ready: boolean, name: string } }) => {
  const { projectId, userToken, newUserInfo } = message
  console.log('New User Connected', newUserInfo)
  usersInRoom.value.set(userToken, newUserInfo)
})

$io.on(SocketEvent.updateUserState, (message: { projectId: string, userToken: string, state: string, value: string | boolean }) => {
  const { projectId, userToken, state, value } = message
  console.log('User State Updated', state, value)
  const existingUser = usersInRoom.value.get(userToken);
  if (!existingUser) return

  if (typeof value === 'boolean') {
    usersInRoom.value.set(userToken, { ...existingUser, [state]: value as boolean })
  }
})

$io.on(SocketEvent.allReady, async (message: { usersInRoomReadyState: { [userToken: string]: { ready: boolean, name?: string, voteValue?: number } } }) => {
  console.log('All users are ready for projcet: ', projectId)

  const { usersInRoomReadyState } = message
  // We will update the values from each user when every user is ready.
  for (const [userToken, userInfo] of Object.entries(usersInRoomReadyState)) {
    usersInRoom.value.set(userToken, userInfo)
  }
})

const readyButton = computed(() => {
  return !isReady.value ? 'Ready!' : 'Wait a Minute!'
})

function getVoteValue(user: { ready: boolean, name?: string, voteValue?: number }) {
  if (user.ready) {
    return user.voteValue
  }

  return
}

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

  // If isReady is true, we need to emit the cardValue.
  // Else, we should just emit isReady and make voteValue undefined.
  if (isReady.value) {
    $io.emit(SocketEvent.isReady, { projectId, userToken: userToken.value, isReady: isReady.value, voteValue: cardValue.value })
  } else {
    $io.emit(SocketEvent.isReady, { projectId, userToken: userToken.value, isReady: isReady.value })
  }
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
import { Server } from "socket.io";
import { SocketEvent } from "~/utils/SocketEvent";

/*
  First, we will work with in-memory, since we won't use loadbalancers
  or deal with so many users that we need to worry about scaling.
  In the future, we can use Redis or other solutions to persist the data,
  connecting with server side socket.

  For now, we can ignore pinia, it won't be necessary. Or, we can use it
  to store the readyness for each user using socket events, but it will
  only make it more complicated.
*/

interface RoomVotingSection {
  [projectId: string]: {
    currentVotingSectionId: number;
    userProjectOwner: string;
  }
}

interface RoomUsers {
  [projectId: string]: {
    [userToken: string]: {
      ready: boolean;
      name?: string;
      voteValue?: number;
      nextVoting?: boolean
    };
  };
}

const roomUsers: RoomUsers = {}
const roomCurrentVotingSectionId: RoomVotingSection = {}

export default defineNitroPlugin((nitroApp) => {
  if (!nitroApp.h3App) {
    console.error('Nitro H3 app is not available')
    return
  }

  console.log('Socket.io server port:', useRuntimeConfig().public.socketPort)
  console.log('socket.io.public url', useRuntimeConfig().public.url)


  const socketServer = new Server(
    useRuntimeConfig().public.socketPort, {
    serveClient: false,
    cors: {
      origin: '*'
    }
  })

  console.log('Socket.io server started')

  socketServer.on('connection', (socket) => {
    console.log('User successfully connected to socket!')

    socket.on(SocketEvent.isReady, async (message: { projectId: string, userToken: string, isReady: boolean, voteValue?: number }) => {
      console.log('📨 Is it Ready?', message)
      const { projectId, userToken, isReady, voteValue } = message
      if (!roomUsers[projectId]) return; //Probably throw an error here

      roomUsers[projectId][userToken].ready = isReady
      roomUsers[projectId][userToken].voteValue = voteValue
      socket.broadcast.to(projectId).emit(SocketEvent.updateUserState, { projectId, userToken, state: 'ready', value: isReady })

      // Checks if all users are ready
      if (Object.values(roomUsers[projectId]).every(user => user.ready)) {
        console.log('📨 All users are ready!')
        // Emit to ALL users in the room
        socketServer.to(projectId).emit(SocketEvent.allReady, { usersInRoomReadyState: roomUsers[projectId] })
      }
    })

    socket.on(SocketEvent.joinProject, async (message: { projectId: string, userToken: string, name: string }) => {
      const { projectId, userToken, name } = message
      console.log(`📨 User ${userToken} Join Project ${projectId} Room`, projectId)

      /*
        Check if there is a room for the projectId, if not, create one
        and create a new voting section for the project, linking it
        to the first user.
      */
      if (!roomUsers[projectId]) {
        roomUsers[projectId] = {}
        const newVotingSection = await $fetch('/api/v1/votingSection', {
          method: 'POST',
          body: {
            projectId,
            userToken: userToken,
          }
        })

        roomCurrentVotingSectionId[projectId] = {
          currentVotingSectionId: newVotingSection.id,
          userProjectOwner: userToken
        }
      };
      // By Default, isReady must be false
      roomUsers[projectId][userToken] = { ready: false, name }
      const usersInRoom = roomUsers[projectId]

      socket.join(projectId)
      socket.emit(SocketEvent.updateUsersInRoom, { newUsersInRoom: usersInRoom, currentVotingSectionId: roomCurrentVotingSectionId[projectId] })

      socket.broadcast.to(projectId).emit(SocketEvent.newUser, { projectId, userToken, newUserInfo: usersInRoom[userToken] })
    })

    socket.on(SocketEvent.nextVotingSection, async (message: { projectId: string, userToken: string }) => {
      const { projectId, userToken } = message
      console.log('📨 Ready for Next Voting Section', message)

      roomUsers[projectId][userToken].nextVoting = true

      if (Object.values(roomUsers[projectId]).every(user => user.nextVoting)) {
        console.log('📨 Move to next voting section.')

        const newVotingSection = await $fetch('/api/v1/votingSection', {
          method: 'POST',
          body: {
            projectId,
            userToken: roomCurrentVotingSectionId[projectId].userProjectOwner,
          }
        })

        roomCurrentVotingSectionId[projectId].currentVotingSectionId = newVotingSection.id

        for (const user in roomUsers[projectId]) {
          roomUsers[projectId][user].ready = false
          roomUsers[projectId][user].nextVoting = false
          roomUsers[projectId][user].voteValue = undefined
        }

        socketServer.to(projectId).emit(SocketEvent.startNewVoting, { usersInRoomNextVotingState: roomUsers[projectId] })
      }

    })

    socket.on(SocketEvent.leaveProject, (message: { projectId: string, userToken: string }) => {
      const { projectId, userToken } = message
      console.log(`📨 User ${userToken} Leave Project ${projectId} Room`, projectId)

      if (!roomUsers[projectId]) return; //Probably throw an error here

      delete roomUsers[projectId][userToken]
      const usersInRoom = roomUsers[projectId]

      socket.broadcast.to(projectId).emit(SocketEvent.updateUsersInRoom, { newUsersInRoom: usersInRoom, currentVotingSectionId: roomCurrentVotingSectionId[projectId] })
      socket.leave(projectId)
    })

    socket.on('disconnect', () => {
      console.log('disconnected')
    })
  })
})

/* Notes:
  socket.emit() will only update the state on client side, updating for the sender only;
  socketServer.emit() will update the state on client side and server side, updating for everyone without needing refresh;
  socket.broadcast.emit() will update the state on client side and server side, updating for everyone except the sender;
*/
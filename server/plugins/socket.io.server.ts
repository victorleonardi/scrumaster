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

const roomsState: Record<string, Record<string, boolean>> = {}

export default defineNitroPlugin((nitroApp) => {
  if (!nitroApp.h3App) {
    console.error('Nitro H3 app is not available')
    return
  }

  console.log('Socket.io server started')
  console.log('Socket.io server port:', useRuntimeConfig().public.socketPort)

  const socketServer = new Server(
    useRuntimeConfig().public.socketPort, {
    serveClient: false,
    cors: {
      origin: '*'
    }
  })

  socketServer.on('connection', (socket) => {
    console.log('User successfully connected to socket!')

    socket.on(SocketEvent.isReady, (message: { projectId: string, userToken: string, isReady: boolean }) => {
      console.log('📨 Is it Ready?', message)
      const { projectId, userToken, isReady } = message
      if (!roomsState[projectId]) return; //Probably throw an error here
      roomsState[projectId][userToken] = isReady

      socketServer.emit(SocketEvent.newVote, message)
    })
    // Try first withou async events.
    socket.on(SocketEvent.joinProject, (projectId: string) => {
      console.log('📨 Join Project Room', projectId)

      socket.join(projectId)
    })

    socket.on(SocketEvent.leaveProject, (projectId: string) => {
      console.log('📨 Leave Project Room', projectId)

      socket.leave(projectId)
    })
  })
})

/* Notes:
  socket.emit() will only update the state on client side, updating for the sender only;
  socketServer.emit() will update the state on client side and server side, updating for everyone without needing refresh;
  socket.broadcast.emit() will update the state on client side and server side, updating for everyone except the sender;
*/
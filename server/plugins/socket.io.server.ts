import { Server } from "socket.io";
import { SocketEvent } from "~/utils/SocketEvent";

// change for database later
// how to use it with database?
// probably should use with pinia, than when values are set, update db

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

  // Maybe, to isolate between sessions, I can use an event called projectId,
  // and connect the socket to the projectId, so it will be unique for each session
  // like socketServer.on(${projectId}, ...)

  socketServer.on('connection', (socket) => {
    socket.on(SocketEvent.isReady, (message: { userToken: string, isReady: boolean }) => {
      console.log('📨 Is it Ready?', message)
      socketServer.emit(SocketEvent.newVote, message)
    })

  })
})

/* Notes:
  socket.emit() will only update the state on client side, updating for the sender only;
  socketServer.emit() will update the state on client side and server side, updating for everyone without needing refresh;
  socket.broadcast.emit() will update the state on client side and server side, updating for everyone except the sender;
*/
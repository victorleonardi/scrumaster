import { Server } from "socket.io";
import { SocketEvent } from "~/utils/SocketEvent";

// change for database later
// how to use it with database?
// probably should use with pinia, than when values are set, update db
// I can build a connection string to the database and use it here. we don't have to know on front
// if everybody is ready

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

    socket.on(SocketEvent.isReady, (message: { userToken: string, isReady: boolean }) => {
      console.log('📨 Is it Ready?', message)
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
import { Server } from "socket.io";
import { SocketEvent } from "~/utils/SocketEvent";

// change for database later
// how to use it with database?
// probably should use with pinia, than when values are set, update db
let count = 0

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
    socket.emit(SocketEvent.new_count, count)

    socket.on(SocketEvent.up, (message: { value: number }) => {
      count += message.value
      socketServer.emit(SocketEvent.new_count, count)
    })

    socket.on(SocketEvent.down, (message: { value: number }) => {
      count -= message.value
      socketServer.emit(SocketEvent.new_count, count)
    })

    socket.on(SocketEvent.new_vote, (data) => {
      console.log('📨 Received new vote:', data)
      socketServer.emit(SocketEvent.new_vote, data) //consider changint SocketEvent name
    })

  })
})

/* Notes:
  socket.emit() will only update the state on client side, updating for the sender only;
  socketServer.emit() will update the state on client side and server side, updating for everyone without needing refresh;
  socket.broadcast.emit() will update the state on client side and server side, updating for everyone except the sender;
*/
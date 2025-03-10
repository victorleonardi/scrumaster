import { Server, type ServerOptions, type Socket } from "socket.io";
import type { H3Event } from 'h3'

// Transform whole file in Class WebSocket
const options: Partial<ServerOptions> = {
  path: '/socket',
  serveClient: false
}

export const io = new Server(options)

// Finish defining it
export function initWebSocket(event: H3Event) {
  // @ts-ignore
  io.attach(event.node.res.socket?.server)

  io.on('connection', (socket: Socket) => {
    socket.on('trigger', (payload) => {
      console.log('Payload recieved')
      console.log(payload)
    })
  })
}
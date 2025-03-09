import { Server, type ServerOptions } from "socket.io";
import type { H3Event } from 'h3'

// Transform whole file in Class WebSocket
const options: Partial<ServerOptions> = {
  path: '/socket',
  serveClient: false
}

export const io = new Server(options)

// Finish defining it
export function initWebSocket(event: H3Event) { }
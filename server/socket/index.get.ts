import { initWebSocket } from "~/utils/initWebSocket"

export default defineWebSocketHandler(async (event) => {
  console.log('Init websocket')
  initWebSocket(event)
})
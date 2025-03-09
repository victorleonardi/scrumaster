export default defineEventHandler(async (event) => {
  console.log('Init websocket')
  initSocket(event)
})
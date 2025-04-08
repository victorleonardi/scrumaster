import io from "socket.io-client";

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig().public

  const socket = io(`${config.url}:${config.socketPort}`, {
    autoConnect: false
  })

  socket.on("connect", () => {
    console.log("✅ Connected to socket.io server!");
  });

  socket.on("connect_error", (err) => {
    console.error("❌ Connection error:", err);
  });

  const websiteStore = useWebsiteStore()
  //consider changint SocketEvent name
  socket.on(SocketEvent.new_vote, (message: { sectionId: string, userToken: string, voteValue: number }) => {
    console.log('new_vote', message)
    const { sectionId, userToken, voteValue } = message
    websiteStore.addOrUpdateSection(sectionId, userToken, voteValue)
  })



  return {
    provide: {
      io: socket
    }
  }
})
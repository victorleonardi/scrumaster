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

  socket.on(SocketEvent.newVote, (message: { userToken: string, isReady: boolean }) => {
    console.log('newVote', message)
    const { userToken, isReady } = message
    if (isReady) websiteStore.newReady(userToken)
    else websiteStore.waitAMinute(userToken)
  })

  socket.on(SocketEvent.updateUsers, (message: { userToken: string }) => {
    console.log('updateUsers', message)
    const { userToken } = message
    if (!websiteStore.users.includes(userToken)) {
      websiteStore.addUser(userToken)
    }
  })

  return {
    provide: {
      io: socket
    }
  }
})
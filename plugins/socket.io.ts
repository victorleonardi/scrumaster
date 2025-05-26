import io from "socket.io-client";

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig().public
  console.log("🔌 Initializing socket.io client...")
  const socket = io('/', {
    autoConnect: false,
    path: '/api/socket.io',
    transports: ['websocket']
  })
  console.log("🔌 Socket.io client initialized with URL:", `${config.url}:${config.socketPort}`)

  socket.on("connect", () => {
    console.log("✅ Connected to socket.io server!");
  });

  socket.on("connect_error", (err) => {
    console.error("❌ Connection error:", err);
  });

  return {
    provide: {
      io: socket
    }
  }
})
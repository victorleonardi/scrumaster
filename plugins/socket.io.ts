import io from "socket.io-client";

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig()

  console.log("Initializing socket.io client...");
  console.log("WebSocket URL:", config.public.websocket.url);

  const socket = io(config.public.websocket.url, {
    autoConnect: false,
    path: '/socket.io',
    transports: ["websocket"],
  })

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
import io from "socket.io-client";

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig().public

  const socket = io(`${config.url}:${config.socketPort}`, {
    autoConnect: false,
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
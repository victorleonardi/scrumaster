import prisma from "~/prisma/prisma"

export default defineEventHandler(async (event) => {

  // Improve postgres connection status check
  const dbUp = await prisma.$queryRaw`SELECT 1`
  return {
    postgres: dbUp ? "Ok" : "Error"
  }
})
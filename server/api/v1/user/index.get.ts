import prisma from "~/prisma/prisma"

export default defineEventHandler(async (event) => {
  const users = await prisma.user.findMany()
  return users
})
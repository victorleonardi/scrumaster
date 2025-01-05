import { H3Event } from "h3"
import { User } from "@prisma/client"
import prisma from "~/prisma/prisma"

export default defineEventHandler(async (event) => {
  const userId = event.context.params?.userId

  if (!userId) {
    setResponseStatus(event, 400)
    return "Bad request"
  }

  const user = await prisma.user.findUnique({ where: { id: Number(userId) } })

  if (!user) {
    setResponseStatus(event, 404)
    return "User not found"
  }

  return user
})
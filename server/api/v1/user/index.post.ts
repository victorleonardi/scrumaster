import prisma from "~/prisma/prisma"
import { nanoid } from "nanoid"

export default defineEventHandler(async (event) => {
  let token
  token = nanoid(10)

  // TODO: Create func to encapsule token matching
  if (await prisma.user.findUnique({ where: { userToken: token } })) {
    token = nanoid(10)
  }

  const user = await prisma.user.create({
    data: {
      userToken: token
    }
  })

  setResponseStatus(event, 201)
  return user
})
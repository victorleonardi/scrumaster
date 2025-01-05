import { H3Event } from "h3"
import { User } from "@prisma/client"
import { nanoid } from "nanoid"
import prisma from "~/prisma/prisma"

export async function postUser(event: H3Event): Promise<User | string> {
  let token
  token = nanoid(10)

  // TODO: Create func to encapsule token matching
  if (await prisma.user.findUnique({ where: { user_token: token } })) {
    token = nanoid(10)
  }

  const user = await prisma.user.create({
    data: {
      user_token: token
    }
  })

  setResponseStatus(event, 201)

  return user
}
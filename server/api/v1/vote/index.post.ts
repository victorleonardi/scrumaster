import prisma from "~/prisma/prisma";

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  if (!body.cardValue || !body.votingSectionId || !body.userToken) {
    setResponseStatus(event, 400)
    return "Bad request"
  }

  const vote = await prisma.vote.create({
    data: {
      cardValue: body.cardValue,
      votingSectionId: body.votingSectionId,
      userToken: body.userToken,
    }
  })

  setResponseStatus(event, 201)
  return vote
})
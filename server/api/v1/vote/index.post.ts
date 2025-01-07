import prisma from "~/prisma/prisma";

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  if (!body.cardValue || !body.sectionId) {
    setResponseStatus(event, 400)
    return "Bad request"
  }

  const vote = await prisma.vote.create({
    data: {
      cardValue: body.cardValue,
      sectionId: body.sectionId
    }
  })

  setResponseStatus(event, 201)
  return vote
})
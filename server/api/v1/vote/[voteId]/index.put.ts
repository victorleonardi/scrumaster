import prisma from "~/prisma/prisma";

export default defineEventHandler(async (event) => {
  const voteId = event.context.params?.voteId
  const body = await readBody(event)

  if (!voteId || !body.cardValue) {
    setResponseStatus(event, 400)
    return "Bad request"
  }

  const vote = await prisma.vote.update({
    where: {
      id: Number(voteId)
    },
    data: {
      cardValue: body.cardValue
    }
  })

  return vote
})
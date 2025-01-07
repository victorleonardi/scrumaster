import prisma from "~/prisma/prisma";

export default defineEventHandler(async (event) => {
  const voteId = event.context.params?.voteId

  if (!voteId) {
    setResponseStatus(event, 400)
    return "Bad request"
  }

  const vote = await prisma.vote.findUnique({ where: { id: Number(voteId) } })

  if (!vote) {
    setResponseStatus(event, 404)
    return "Vote not found"
  }

  return vote
})
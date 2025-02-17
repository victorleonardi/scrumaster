import prisma from "~/prisma/prisma";

// Update votes related to section
export default defineEventHandler(async (event) => {
  const votingSectionId = event.context.params?.votingSectionId
  const body = await readBody(event)

  if (!votingSectionId || !body.userToken || !body.votes) {
    setResponseStatus(event, 400)
    return "Bad request"
  }

  const section = await prisma.votingSection.update({
    where: {
      id: Number(votingSectionId)
    },
    data: {
      votes: body.votes
    }
  })

  setResponseStatus(event, 204)

  return section
})
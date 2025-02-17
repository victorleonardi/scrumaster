import prisma from "~/prisma/prisma";

export default defineEventHandler(async (event) => {
  const votingSectionId = event.context.params?.votingSectionId

  if (!votingSectionId) {
    setResponseStatus(event, 400)
    return "Bad request"
  }

  const section = await prisma.votingSection.findUnique({ where: { id: Number(votingSectionId) } })

  if (!section) {
    setResponseStatus(event, 404)
    return "Section not found"
  }

  return section
})
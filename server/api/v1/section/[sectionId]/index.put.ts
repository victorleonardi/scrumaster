import prisma from "~/prisma/prisma";

// Update votes related to section
export default defineEventHandler(async (event) => {
  const sectionId = event.context.params?.sectionId
  const body = await readBody(event)

  if (!sectionId || !body.userToken || !body.votes) {
    setResponseStatus(event, 400)
    return "Bad request"
  }

  const section = await prisma.section.update({
    where: {
      id: Number(sectionId)
    },
    data: {
      votes: body.votes
    }
  })

  return section
})
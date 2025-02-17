import prisma from "~/prisma/prisma";

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  if (!body.userToken || !body.projectId) {
    setResponseStatus(event, 400)
    return "Bad request"
  }

  const votingSection = await prisma.votingSection.create({
    data: {
      userToken: body.userToken,
      projectId: body.projectId,
    }
  })

  setResponseStatus(event, 201)
  return votingSection
})
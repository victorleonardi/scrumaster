import prisma from "~/prisma/prisma";

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  if (!body.name || !body.userId) {
    setResponseStatus(event, 400)
    return "Bad request"
  }

  const project = await prisma.project.create({
    data: {
      name: body.name,
      userId: body.userId
    }
  })

  setResponseStatus(event, 201)
  return project
})
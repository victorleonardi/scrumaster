import prisma from "~/prisma/prisma";

export default defineEventHandler(async (event) => {
  const projectId = event.context.params?.projectId
  const body = await readBody(event)

  if (!projectId || !body.name) {
    setResponseStatus(event, 400)
    return "Bad request"
  }

  const project = await prisma.project.update({
    where: {
      id: Number(projectId)
    },
    data: {
      name: body.name
    }
  })

  setResponseStatus(event, 204)

  return project
})
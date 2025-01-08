import prisma from "~/prisma/prisma";

export default defineEventHandler(async (event) => {
  const projectId = event.context.params?.projectId

  if (!projectId) {
    setResponseStatus(event, 400)
    return "Bad request"
  }

  const project = await prisma.project.findUnique({ where: { id: Number(projectId) } })

  if (!project) {
    setResponseStatus(event, 404)
    return "Project not found"
  }

  return project
})
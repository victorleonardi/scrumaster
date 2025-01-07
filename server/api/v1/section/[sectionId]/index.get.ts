import prisma from "~/prisma/prisma";

export default defineEventHandler(async (event) => {
  const sectionId = event.context.params?.sectionId

  if (!sectionId) {
    setResponseStatus(event, 400)
    return "Bad request"
  }

  const section = await prisma.section.findUnique({ where: { id: Number(sectionId) } })

  if (!section) {
    setResponseStatus(event, 404)
    return "Section not found"
  }

  return section
})
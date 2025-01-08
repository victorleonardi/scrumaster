import prisma from "~/prisma/prisma";

export default defineEventHandler(async (event) => {
  const projects = await prisma.project.findMany()

  return projects
})
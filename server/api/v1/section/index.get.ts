import prisma from "~/prisma/prisma";

export default defineEventHandler(async (event) => {
  const sections = await prisma.vote.findMany()
  return sections
})
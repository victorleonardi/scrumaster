import prisma from "~/prisma/prisma";

export default defineEventHandler(async (event) => {
  const votingSections = await prisma.vote.findMany()
  return votingSections
})
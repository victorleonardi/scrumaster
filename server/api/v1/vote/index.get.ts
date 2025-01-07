import prisma from "~/prisma/prisma";

export default defineEventHandler(async (event) => {
  const votes = await prisma.vote.findMany()
  return votes
})
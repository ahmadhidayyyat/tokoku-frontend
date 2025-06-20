// server/api/user.ts

import prisma from "~/lib/prisma";

export default defineEventHandler(async (event) => {
  const users = await prisma.user.findMany({
    select: {
      id: true,
      username: true,
      name: true,
      createdAt: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return {
    success: true,
    data: users,
  };
});

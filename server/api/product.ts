// server/api/user.ts

import prisma from "~/lib/prisma";

export default defineEventHandler(async (event) => {
  const data = await prisma.product.findMany();

  return {
    success: true,
    data,
  };
});

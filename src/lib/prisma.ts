import { PrismaClient } from '@prisma/client'

//keep the instance in a global var
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: ['query'],
  })

  //only in development because one request can be in difference environments,
  // so if you share a global state is dangerous in production 
if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
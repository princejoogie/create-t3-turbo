import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/client/client";

const globalForPrisma = global as unknown as { prisma: PrismaClient };

const adapter = new PrismaPg({ connectionString: process.env.POSTGRES_URL });
export const prisma = globalForPrisma.prisma || new PrismaClient({ adapter });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export * from "../generated/client/client";

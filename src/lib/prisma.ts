// File: src/lib/prisma.ts
import { PrismaClient } from "@prisma/client";

// Prevent multiple instances of PrismaClient in development

let prisma: PrismaClient;

if (process.env.NODE_ENV === "production") {
  prisma = new PrismaClient();
} else {
  if (!global.prisma) {
    global.prisma = new PrismaClient();
  }
  prisma = global.prisma;
}

export default prisma;

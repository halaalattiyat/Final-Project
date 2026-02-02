import { PrismaClient } from '@prisma/client';
import "dotenv/config";

export default {
  datasources: {
    db: {
      provider: 'sqlite',
      url: process.env.DATABASE_URL,
    },
  },
};
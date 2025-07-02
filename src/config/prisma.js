const { PrismaClient } = require('../../prisma/libs/generated/client');
const prisma = new PrismaClient();

module.exports = prisma;
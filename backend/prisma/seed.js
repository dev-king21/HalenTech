const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
  // Delete all existing tickets first (optional)
  await prisma.ticket.deleteMany()

  // Create tickets one by one (SQLite doesn't support createMany)
  await prisma.ticket.create({
    data: {
      customerName: 'Jane Doe',
      email: 'jane.doe@example.com',
      status: 'open',
      notes: 'Initial onboarding call needed'
    }
  })

  await prisma.ticket.create({
    data: {
      customerName: 'John Smith',
      email: 'john.smith@example.com',
      status: 'pending',
      notes: 'Waiting for documents'
    }
  })

  await prisma.ticket.create({
    data: {
      customerName: 'Alice Johnson',
      email: 'alice.j@example.com',
      status: 'done',
      notes: 'Completed all steps'
    }
  })

  console.log('Seeded 3 tickets successfully')
}

main()
  .catch(e => {
    console.error('Seed error:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
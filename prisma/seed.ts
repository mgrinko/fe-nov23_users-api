import { Color, PrismaClient, User } from '@prisma/client'
const prisma = new PrismaClient()

const colors: Color[] = [
  { id: 1, name: 'Black' },
  { id: 2, name: 'DeepPink' },
  { id: 3, name: 'Red' },
  { id: 4, name: 'Aquamarine' },
  { id: 5, name: 'Gold' },
  { id: 6, name: 'YellowGreen' },
  { id: 7, name: 'Yellow' },
];

const users: User[] = [
  { id: 1, name: 'Valeriy Zaluzhnyi', carColorId: 5 },
  { id: 2, name: 'Pany Anna', carColorId: 4 },
  { id: 3, name: 'Pan Roman', carColorId: 2 },
];

async function main() {
  for (const color of colors) {
    await prisma.color.create({
      data: {
        name: color.name,
      },
    })
  }

  for (const user of users) {
    await prisma.user.create({
      data: {
        name: user.name,
        carColorId: user.carColorId,
      },
    })
  }
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
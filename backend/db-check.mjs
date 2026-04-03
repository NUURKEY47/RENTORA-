import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  try {
    const cats = await prisma.category.findMany();
    console.log("Categories:", cats.length);
    if (cats.length === 0) {
      await prisma.category.createMany({
        data: [{ name: "Apartment" }, { name: "Villa" }, { name: "Office" }]
      });
      console.log("Seeded 3 categories.");
    }

    const props = await prisma.property.findMany();
    console.log("Properties:", props.length);

    const users = await prisma.user.findMany({ where: { role: "ADMIN" } });
    console.log("Admins:", users.map(u => ({ id: u.id, email: u.email, managedById: u.managedById })));

  } catch (e) {
    console.error(e);
  } finally {
    await prisma.$disconnect();
  }
}

main();

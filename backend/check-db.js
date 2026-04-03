import prisma from "./src/config/db.js";

async function checkCategories() {
  try {
    const categories = await prisma.category.findMany();
    console.log("Categories found:", categories);
    if (categories.length === 0) {
      console.log("NO CATEGORIES FOUND! Seeding one...");
      const newCat = await prisma.category.create({
        data: { name: "Standard" }
      });
      console.log("Created category:", newCat);
    }
  } catch (error) {
    console.error("Error checking categories:", error);
  } finally {
    await prisma.$disconnect();
  }
}

checkCategories();

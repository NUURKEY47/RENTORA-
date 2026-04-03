import { propertyService } from "./src/modules/property/property.service.js";
import prisma from "./src/config/db.js";

async function test() {
  try {
    const adminUser = { id: 1, role: "ADMIN", managedById: null };
    console.log("Calling getProperties for Admin 1...");
    const properties = await propertyService.getProperties({}, adminUser);
    console.log("SUCCESS! Properties fetched:", properties.length);
    
    // Test for sub-admin
    const subAdmin = { id: 4, role: "ADMIN", managedById: 1 };
    console.log("Calling getProperties for Sub-Admin 4...");
    const subProps = await propertyService.getProperties({}, subAdmin);
    console.log("SUCCESS! Sub-Admin properties fetched:", subProps.length);

  } catch (e) {
    console.error("FAILURE:", e);
  } finally {
    await prisma.$disconnect();
  }
}

test();

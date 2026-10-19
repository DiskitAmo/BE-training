import bcrypt from "bcrypt";

const password = "MySecurePassword123!";

async function testBcrypt() {
  // Cost factor 10
  console.time("Hashing with cost 10");
  const hash10 = await bcrypt.hash(password, 10);
  console.timeEnd("Hashing with cost 10");

  console.log("Hash (cost 10):", hash10);

  const isValid10 = await bcrypt.compare(password, hash10);
  console.log("Password matches cost 10 hash:", isValid10);

  console.log("");

  // Cost factor 12
  console.time("Hashing with cost 12");
  const hash12 = await bcrypt.hash(password, 12);
  console.timeEnd("Hashing with cost 12");

  console.log("Hash (cost 12):", hash12);

  const isValid12 = await bcrypt.compare(password, hash12);
  console.log("Password matches cost 12 hash:", isValid12);
}

testBcrypt().catch(console.error);

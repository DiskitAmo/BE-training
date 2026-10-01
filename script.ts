// import { PrismaClient } from "./src/generated/prisma/client"
// const prisma = new PrismaClient();
import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "./src/generated/prisma/client.ts";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});
const prisma = new PrismaClient({ adapter });
async function main() {
  // DELETE OLD DATA
  //await prisma.user.deleteMany();
  // const users = await prisma.user.createMany({
  //   data: [
  //     {
  //       name: "John Doe",
  //       email: "john@example.com",
  //       isAdmin: false,
  //       preferences: {
  //         theme: "dark",
  //         notifications: true,
  //       },
  //     },
  //     {
  //       name: "Jane Smith",
  //       email: "jane@example.com",
  //       isAdmin: true,
  //       preferences: {
  //         theme: "light",
  //         notifications: false,
  //       },
  //     },
  //     {
  //       name: "Alice Brown",
  //       email: "alice@example.com",
  //       isAdmin: false,
  //       preferences: {
  //         theme: "dark",
  //         notifications: true,
  //       },
  //     },
  //   ],
  // });
  // findMany()
  //const users = await prisma.user.findMany();
  //console.log("All users:", users);
  // findFirst()
  // const firstAdmin = await prisma.user.findFirst({ where: { isAdmin: true } });
  // console.log("First admin:", firstAdmin);
  //where clauses
  // const user = await prisma.user.findUnique({
  //   where: { name: "John Doe" },
  // });
  // const johnUsers = await prisma.user.findMany({
  //   where: { name: { contains: "John" } },
  // });
  // console.log("Users named John:", johnUsers);Brown
  // const matchingUsers = await prisma.user.findMany({
  //   where: { AND: [{ isAdmin: false }, { name: { contains: "Brown" } }] },
  // });
  // console.log("Matching users:", matchingUsers);
  // const usersOr = await prisma.user.findMany({
  //   where: { OR: [{ isAdmin: true }, { name: { contains: "Brown" } }] },
  // });
  // console.log("Users matching OR condition:", usersOr);
  // const selectedUsers = await prisma.user.findMany({
  //   select: { id: true, name: true, email: true },
  // });
  // console.log("Selected users:", selectedUsers);
  // const usersWithSelectedPosts = await prisma.user.findMany({
  //   select: {
  //     id: true,
  //     name: true,
  //     writtenPosts: { select: { id: true, rating: true } },
  //   },
  // });
  // console.log("Users with selected posts:", usersWithSelectedPosts);
  // const orderedUsers = await prisma.user.findMany({
  //   orderBy: { name: "asc" },
  //   skip: 1,
  //   take: 2,
  // });
  // console.log("Ordered users:", orderedUsers); d494afad-dd4d-4719-a8ef-da27e33745c8
  // const updatedUser = await prisma.user.update({
  //   where: { id: "d494afad-dd4d-4719-a8ef-da27e33745c8" },
  //   data: { name: "John Updated", isAdmin: true },
  // });
  // console.log("Updated user:", updatedUser);
  // const posts = await prisma.post.createMany({
  //   data: [
  //     {
  //       rating: 4.5,
  //       createdAt: new Date(),
  //       updatedAt: new Date(),
  //       authorId: "d494afad-dd4d-4719-a8ef-da27e33745c8",
  //     },
  //     {
  //       rating: 3.8,
  //       createdAt: new Date(),
  //       updatedAt: new Date(),
  //       authorId: "d494afad-dd4d-4719-a8ef-da27e33745c8",
  //     },
  //     {
  //       rating: 5.0,
  //       createdAt: new Date(),
  //       updatedAt: new Date(),
  //       authorId: "ea51e021-c666-4ede-b253-9511a5f414d0",
  //     },
  //     {
  //       rating: 4.0,
  //       createdAt: new Date(),
  //       updatedAt: new Date(),
  //       authorId: "33461ca7-9f79-4fde-96ef-f6f3f9d397b2",
  //     },
  //   ],
  // });
  // console.log(posts);
  //const posts = await prisma.post.findMany();
  // const upsertedUser = await prisma.user.upsert({
  //   where: { id: "d494afad-dd4d-4719-a8ef-da27e33745c8" },
  //   update: { name: "John Upserted", isAdmin: true },
  //   create: {
  //     name: "John New",
  //     email: "johnup@example.com",
  //     isAdmin: false,
  //     preferences: { theme: "dark", notifications: true },
  //   },
  // });
  // console.log("Upserted user:", upsertedUser);
  const result = await prisma.$transaction(async (tx) => {
    const user = await tx.user.create({
      data: {
        name: "Transaction User",
        email: "transaction@example.com",
        isAdmin: false,
        preferences: { theme: "dark", notifications: true },
      },
    });
    const post = await tx.post.create({
      data: {
        rating: 4.7,
        authorId: user.id,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });
    return { user, post };
  });
  console.log("Transaction result:", result);

  //TASK 4f
  //   const posts = await prisma.post.findMany({
  //   include: {
  //     author: true,
  //     _count: {
  //       select: {
  //         comments: true
  //       }
  //     }
  //   }
  // });

  // console.log(posts);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

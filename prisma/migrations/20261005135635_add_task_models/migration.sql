-- DropIndex
DROP INDEX "User_email_key";

-- CreateTable
CREATE TABLE "User1" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,

    CONSTRAINT "User1_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Post1" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT,
    "authorId" INTEGER NOT NULL,

    CONSTRAINT "Post1_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Comment" (
    "id" SERIAL NOT NULL,
    "content" TEXT NOT NULL,
    "postId" INTEGER NOT NULL,

    CONSTRAINT "Comment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BlogPost" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "authorId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "BlogPost_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User1_email_key" ON "User1"("email");

-- AddForeignKey
ALTER TABLE "Post1" ADD CONSTRAINT "Post1_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User1"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post1"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

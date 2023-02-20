/*
  Warnings:

  - You are about to drop the `Image` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `title` to the `Instruction` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Instruction" ADD COLUMN     "title" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Recipe" ADD COLUMN     "tags" TEXT[];

-- DropTable
DROP TABLE "Image";

-- CreateTable
CREATE TABLE "Tag" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Tag_pkey" PRIMARY KEY ("id")
);

/*
  Warnings:

  - The primary key for the `Airport` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `airport_id` on the `Airport` table. All the data in the column will be lost.
  - You are about to drop the column `position` on the `resume` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."Airport" DROP CONSTRAINT "Airport_pkey",
DROP COLUMN "airport_id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Airport_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "public"."resume" DROP COLUMN "position";

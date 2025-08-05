/*
  Warnings:

  - You are about to drop the `Accomodation` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Airport` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Flight` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Note` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `resume` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."resume" DROP CONSTRAINT "resume_user_id_fkey";

-- DropTable
DROP TABLE "public"."Accomodation";

-- DropTable
DROP TABLE "public"."Airport";

-- DropTable
DROP TABLE "public"."Flight";

-- DropTable
DROP TABLE "public"."Note";

-- DropTable
DROP TABLE "public"."resume";

-- CreateTable
CREATE TABLE "public"."component" (
    "id" SERIAL NOT NULL,
    "travel_id" INTEGER NOT NULL,
    "type" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "component_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."component" ADD CONSTRAINT "component_travel_id_fkey" FOREIGN KEY ("travel_id") REFERENCES "public"."travel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

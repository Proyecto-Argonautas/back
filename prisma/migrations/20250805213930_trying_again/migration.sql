/*
  Warnings:

  - The primary key for the `companions` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `component` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `travel` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "public"."companions" DROP CONSTRAINT "companions_travelId_fkey";

-- DropForeignKey
ALTER TABLE "public"."component" DROP CONSTRAINT "component_travel_id_fkey";

-- AlterTable
ALTER TABLE "public"."companions" DROP CONSTRAINT "companions_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "travelId" SET DATA TYPE TEXT,
ADD CONSTRAINT "companions_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "companions_id_seq";

-- AlterTable
ALTER TABLE "public"."component" DROP CONSTRAINT "component_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "travel_id" SET DATA TYPE TEXT,
ADD CONSTRAINT "component_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "component_id_seq";

-- AlterTable
ALTER TABLE "public"."travel" DROP CONSTRAINT "travel_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "travel_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "travel_id_seq";

-- AddForeignKey
ALTER TABLE "public"."companions" ADD CONSTRAINT "companions_travelId_fkey" FOREIGN KEY ("travelId") REFERENCES "public"."travel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."component" ADD CONSTRAINT "component_travel_id_fkey" FOREIGN KEY ("travel_id") REFERENCES "public"."travel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

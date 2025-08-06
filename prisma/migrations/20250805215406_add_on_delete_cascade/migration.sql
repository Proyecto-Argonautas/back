-- DropForeignKey
ALTER TABLE "public"."companions" DROP CONSTRAINT "companions_travelId_fkey";

-- DropForeignKey
ALTER TABLE "public"."component" DROP CONSTRAINT "component_travel_id_fkey";

-- AddForeignKey
ALTER TABLE "public"."companions" ADD CONSTRAINT "companions_travelId_fkey" FOREIGN KEY ("travelId") REFERENCES "public"."travel"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."component" ADD CONSTRAINT "component_travel_id_fkey" FOREIGN KEY ("travel_id") REFERENCES "public"."travel"("id") ON DELETE CASCADE ON UPDATE CASCADE;
